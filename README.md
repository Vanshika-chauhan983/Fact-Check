# Truth Layer - AI-Powered Fact-Checker

Truth Layer is a premium web application that automates claim verification from PDF documents. It uses Gemini to extract specific claims and cross-references them against live web data using the Tavily Search API.

## Features
- **PDF Extraction**: Automatically identifies stats, figures, and dates.
- **Live Verification**: Searches the web in real-time to confirm accuracy.
- **Premium UI**: Built with Next.js, Framer Motion, and a custom Vanilla CSS design system.
- **Fact-Check Reports**: Categorizes claims as Verified, Inaccurate, or False with evidence.

## Getting Started

### Prerequisites
- Node.js 18+
- [Gemini API Key](https://aistudio.google.com/)
- [Tavily API Key](https://tavily.com/)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```env
   GEMINI_API_KEY=your_gemini_key
   TAVILY_API_KEY=your_tavily_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment
This app is ready to be deployed on **Vercel**. 
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Add the `GEMINI_API_KEY` and `TAVILY_API_KEY` to Vercel Environment Variables.
4. Deploy!

## Technology Stack
- **Frontend**: Next.js 15 (App Router), React, Framer Motion
- **Icons**: Lucide React
- **PDF Parsing**: pdf-parse (Server-side)
- **AI**: Google Generative AI (Gemini 1.5 Flash)
- **Search**: Tavily API
- **Styling**: Vanilla CSS (CSS Variables + Glassmorphism)
