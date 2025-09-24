<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
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
>>>>>>> c96e4d54fc308872387a64472883a4f2226c0019
