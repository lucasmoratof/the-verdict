# The Verdict

**The Verdict** is an AI-powered product analysis tool designed to help consumers make smart shopping decisions. It provides detailed, unbiased analysis by evaluating product quality, value, and real customer feedback.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Supabase Edge Functions (Deno)
- **External APIs:**
  - Google Custom Search API (for product searching)
  - Google Gemini API (for AI analysis)

---

## Getting Started

To run this project locally, you will need Node.js, Git, and the Supabase CLI installed.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/lucasmoratof/the-verdict.git](https://github.com/lucasmoratof/the-verdict.git)
    cd the-verdict
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up your environment variables:**
    * Create a `.env.local` file in the project root.
    * Add your Supabase and API keys:
        ```
        VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
        VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
        ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## Backend Functions

Our backend is built with two core Supabase Edge Functions.

### 1. `dynamic-search`

**What It Does:**
The `dynamic-search` function is the entry point for a user's search query. Its purpose is to take a simple text query (like "ray ban sunglasses") and return a list of relevant products from the web using the Google Custom Search API.

**How It Works:**
1.  Receives a request from the frontend containing a search query.
2.  Securely loads the `GOOGLE_API_KEY` and `Google Search_ENGINE_ID` from Supabase Secrets.
3.  Constructs a valid URL and calls the Google Custom Search API.
4.  Parses the JSON response from Google, extracting the title, link, and image for each search result.
5.  Transforms this data into our app's standard `Product` format and returns it to the frontend.

### 2. `analyze-product`

**What It Does:**
The `analyze-product` function is the core "magic" of the application. It takes the details of a single product selected by the user and uses the Google Gemini AI to generate a comprehensive, structured analysis.

**How It Works:**
1.  Receives a request from the frontend containing the details of a specific product.
2.  Securely loads the `GEMINI_API_KEY` from Supabase Secrets.
3.  Dynamically builds a sophisticated prompt, instructing the Gemini AI to act as an expert reviewer.
4.  Sends a "tool schema" to the AI, forcing it to return its analysis in a perfect JSON format with predefined fields like `qualityScore`, `pros`, `cons`, and `summary`.
5.  Calls the Gemini API with the prompt and schema.
6.  Extracts the structured JSON data from the AI's response and sends it back to the frontend to be displayed on the analysis page.
