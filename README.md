# Truth Layer — AI-Powered Fact-Checker

**Truth Layer** is a premium, full-stack web application that automates fact-checking for PDF documents. It extracts specific claims (statistics, dates, financial figures) using Google's Gemini AI and cross-references them against live web data via the Tavily Search API, delivering a structured Verification Report.

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-blue?logo=react) ![Gemini](https://img.shields.io/badge/Google-Gemini_2.5-orange?logo=google) ![License](https://img.shields.io/badge/License-MIT-green)

---

## Features

- **📄 PDF Upload & Parsing** — Drag and drop any PDF; the app extracts all text server-side using `pdfreader`.
- **🤖 AI Claim Extraction** — Gemini 2.5 Flash identifies the most important verifiable claims (stats, dates, figures) from the document.
- **🌐 Live Web Verification** — Each claim is searched against the web in real-time via the Tavily Search API.
- **✅ Structured Verdict** — Every claim is labelled as **Verified**, **Inaccurate**, or **False** with supporting evidence and a source URL.
- **🗺️ How It Works Page** — A dedicated `/how-it-works` page explains the 4-step verification pipeline with animations.
- **📱 Responsive Design** — Fully responsive layout with a mobile hamburger menu.
- **✨ Premium UI** — Glassmorphism design system, Framer Motion animations, and a custom Vanilla CSS variable architecture.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page — PDF upload and Verification Report dashboard |
| `/how-it-works` | Informational page explaining the fact-checking pipeline |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| UI | React 19, Framer Motion, Lucide React |
| Styling | Vanilla CSS (CSS Variables, Glassmorphism) |
| AI | Google Generative AI SDK (`@google/generative-ai`) — Gemini 2.5 Flash |
| Web Search | Tavily Search API |
| PDF Parsing | `pdfreader` (server-side) |
| Fonts | Google Fonts — Outfit, Inter |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [Google AI Studio API Key](https://aistudio.google.com/app/apikey) (Gemini 2.5 Flash)
- A [Tavily API Key](https://app.tavily.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Assessment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the project root:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   TAVILY_API_KEY=your_tavily_api_key_here
   ```

   > ⚠️ **Important:** Make sure the Gemini API key is from [Google AI Studio](https://aistudio.google.com/app/apikey). Keys must have access to Gemini 2.x models (2.5 Flash, 2.0 Flash, or 2.5 Pro).

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── fact-check/
│   │       └── route.ts       # POST handler — PDF → claims → verification
│   ├── how-it-works/
│   │   └── page.tsx           # "How It Works" informational page
│   ├── globals.css            # Design system (CSS variables, utilities)
│   ├── layout.tsx             # Root layout with mesh gradient background
│   └── page.tsx              # Home page — upload + verification dashboard
├── components/
│   ├── ClaimCard.tsx          # Renders individual verified claim card
│   ├── Navbar.tsx             # Shared responsive navigation bar
│   └── UploadZone.tsx         # Drag-and-drop PDF upload component
└── lib/
    ├── fact-checker.ts        # Core AI logic — claim extraction & verification
    └── pdf.ts                 # PDF text extraction using pdfreader
```

---

## How It Works

1. **Upload** — User drops a PDF into the upload zone.
2. **Extract** — Server parses the PDF and uses Gemini AI to identify verifiable claims.
3. **Search** — Each claim is searched against the web using Tavily for real-time evidence.
4. **Verify** — Gemini evaluates the search results and assigns a verdict: `Verified`, `Inaccurate`, or `False`.
5. **Report** — A Verification Report is displayed with evidence and source links for every claim.

---

## Deployment (Vercel)

1. Push the code to a GitHub repository.
2. Import the repository on [Vercel](https://vercel.com).
3. Add the following **Environment Variables** in the Vercel project settings:
   - `GEMINI_API_KEY`
   - `TAVILY_API_KEY`
4. Deploy — Vercel will auto-build and host the app.

---

## Known Limitations

- The Gemini API key must support **Gemini 2.x models** (2.5 Flash, 2.0 Flash, 2.5 Pro). Legacy 1.x model names (e.g. `gemini-pro`, `gemini-1.5-flash`) will return a `404 Not Found` error from the API.
- The Tavily free tier has a request limit. If searches fail, the AI will still attempt to verify claims based on its training data.
- Very large PDFs (>50 pages) may be truncated to the first 10,000 characters for efficiency.
