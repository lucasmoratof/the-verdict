import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// This is the schema that tells the Gemini AI exactly what JSON structure to return.
const productAnalysisTool = {
  name: "product_analyzer",
  description: "Analyzes a product and provides structured scores and feedback.",
  parameters: {
    type: "OBJECT",
    properties: {
      qualityScore: { type: "NUMBER", description: "Score 0-100 for materials/build quality." },
      valueScore: { type: "NUMBER", description: "Score 0-100 for price-to-quality ratio." },
      sustainabilityScore: { type: "NUMBER", description: "Score 0-100 for environmental/ethical factors." },
      trendinessScore: { type: "NUMBER", description: "Score 0-100 for style relevance." },
      summary: { type: "STRING", description: "A concise, insightful paragraph. Start with a bold 'Verdict:'." },
      pros: { type: "ARRAY", items: { type: "STRING" }, description: "Array of 3-4 specific, tangible advantages." },
      cons: { type: "ARRAY", items: { type: "STRING" }, description: "Array of 2-3 specific, honest disadvantages." },
      targetAudience: { type: "STRING", description: "A specific description of the ideal customer." },
    },
    required: ["qualityScore", "valueScore", "sustainabilityScore", "trendinessScore", "summary", "pros", "cons", "targetAudience"],
  },
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { product } = await req.json();
    if (!product) {
      throw new Error("Product data is required.");
    }

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error("Gemini API key not found in Supabase secrets.");
    }

    const systemPrompt = `You are "The Verdict," a world-class product analyst and expert reviewer. Your tone is sharp, insightful, and honest. You do not use fluffy marketing language. You base your analysis on aggregated data from real user reviews, technical specifications, and expert opinions. Your goal is to provide a clear, actionable verdict.`;

    const userPrompt = `Perform an expert analysis of the following product:
- Product Name: "${product.name}"
- Brand: "${product.brand}"
- Price: ${product.price} ${product.currency}
- Description: "${product.description}"

Structure your response using the 'product_analyzer' tool. Follow the guidelines strictly. For Pros, be specific like "Constructed with full-grain leather." For Cons, be specific like "Numerous reviews mention inconsistent sizing."`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        tools: [{ functionDeclarations: [productAnalysisTool] }],
        tool_config: { function_calling_config: { mode: "ANY" } },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Gemini API request failed: ${response.statusText} - ${errorBody}`);
    }

    const data = await response.json();
    const functionCall = data.candidates?.[0]?.content?.parts?.[0]?.functionCall;

    if (!functionCall || functionCall.name !== 'product_analyzer') {
      throw new Error("Gemini did not return the expected analysis format.");
    }
    
    // The structured JSON data from the AI
    const analysisResult = functionCall.args;

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 },
    );

  } catch (error) {
    console.error('Analyze product error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});