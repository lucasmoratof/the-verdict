import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface Product {
  id: string;
  name: string;
  brand: string | null;
  price: number | null;
  currency: string;
  imageUrl: string | null;
  sourceUrl: string | null;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    if (!query) {
      throw new Error("A search query is required.");
    }

    const apiKey = Deno.env.get('GOOGLE_API_KEY');
    const searchEngineId = Deno.env.get('GOOGLE_SEARCH_ENGINE_ID');

    if (!apiKey || !searchEngineId) {
      throw new Error("Google API Key or Search Engine ID not found in Supabase secrets.");
    }

    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;

    console.log(`Searching Google for: ${query}`);
    const response = await fetch(searchUrl);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Google Search API request failed: ${response.statusText} - ${errorBody}`);
    }

    const data = await response.json();

    // Transform Google Search results into our Product format
    const products: Product[] = (data.items || []).map((item: any, index: number) => ({
      id: item.cacheId || `product-${index}`,
      name: item.title,
      brand: item.pagemap?.product?.[0]?.brand || 'Unknown Brand',
      price: parseFloat(item.pagemap?.product?.[0]?.price?.replace(/[^0-9.-]+/g,"")) || null,
      currency: 'USD', // Google Shopping results vary, defaulting to USD
      imageUrl: item.pagemap?.cse_image?.[0]?.src || null,
      sourceUrl: item.link,
    }));

    return new Response(
      JSON.stringify(products),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 },
    );

  } catch (error) {
    console.error('Dynamic search error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});