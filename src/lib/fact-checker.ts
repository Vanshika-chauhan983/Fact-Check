import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface Claim {
  id: string;
  claim: string;
  context: string;
  category: string;
  figures: string[];
  status: 'Verified' | 'Inaccurate' | 'False' | 'Processing';
  evidence?: string;
  sourceUrl?: string;
}

export async function extractClaims(text: string): Promise<Claim[]> {
  if (text === "FALLBACK_TEXT_FOR_MOCK_DATA") {
    console.warn("Using explicit mock data fallback due to PDF extraction failure");
    return getMockClaims();
  }

  const modelNames = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.5-pro"];
  let lastError: any = null;

  for (const modelName of modelNames) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const prompt = `
        Extract the most important specific claims from the following text, especially those involving statistics, dates, financial figures, or technical specifications.
        Return the result as a JSON array of objects with the following structure:
        {
          "claim": "The exact claim from the text",
          "context": "Brief context for this claim",
          "category": "e.g., Financial, Technical, Statistical",
          "figures": ["list of specific numbers/dates involved"]
        }
        
        Text: ${text.substring(0, 10000)}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const jsonStr = response.text().replace(/```json|```/g, "").trim();
      const claims = JSON.parse(jsonStr);
      
      return claims.map((c: any, index: number) => ({
        ...c,
        id: `claim-${index}`,
        status: 'Processing'
      }));
    } catch (error: any) {
      lastError = error;
      if (error.status === 404) {
        console.warn(`Model ${modelName} not found, trying next...`);
        continue;
      }
      break;
    }
  }

  console.error("All models failed. Returning mock data as fallback. Error:", lastError);
  return getMockClaims(true);
}

function getMockClaims(isErrorFallback = false): Claim[] {
  return [
    {
      id: 'mock-1',
      claim: "Global e-commerce sales reached $6.3 trillion in 2023.",
      context: isErrorFallback ? "Market growth summary (Mock Data - Service Error)" : "Market growth summary",
      category: "Financial",
      figures: ["$6.3 trillion", "2023"],
      status: 'Verified',
      evidence: isErrorFallback 
        ? "Verification fallback: The AI service was unavailable. This is mock data for demonstration." 
        : "According to eMarketer and Statista, global retail e-commerce sales were approximately $5.8-$6.3 trillion in 2023.",
      sourceUrl: "https://www.statista.com/statistics/379046/worldwide-retail-e-commerce-sales/"
    },
    {
      id: 'mock-2',
      claim: "The average attention span of a human is now 8 seconds, less than a goldfish.",
      context: isErrorFallback ? "User engagement section (Mock Data - Service Error)" : "User engagement section",
      category: "Statistical",
      figures: ["8 seconds"],
      status: 'False',
      evidence: "This is a widely cited but debunked myth. There is no scientific evidence that human attention spans are shrinking to 8 seconds or are less than a goldfish's.",
      sourceUrl: "https://www.bbc.com/news/health-38896790"
    }
  ];
}

export async function verifyClaim(claim: Claim): Promise<Partial<Claim>> {
  // 1. Search the web
  const searchQuery = `${claim.claim} ${claim.figures.join(" ")}`;
  const searchResults = await searchWeb(searchQuery);

  // 2. Verify with Gemini
  const modelNames = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.5-pro"];
  let lastError: any = null;

  for (const modelName of modelNames) {
    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error('API_KEY_MISSING');
      }

      const model = genAI.getGenerativeModel({ model: modelName });
      const prompt = `
        You are a professional fact-checker. 
        Claim: "${claim.claim}"
        Search Results: "${searchResults}"
        
        Evaluate the claim based on the search results. 
        Assign a status: "Verified" (matches exactly or very closely), "Inaccurate" (partially true but outdated or slightly off), or "False" (contradicted by evidence or no evidence found).
        Provide a brief evidence summary and a source URL if available.
        
        Return as JSON:
        {
          "status": "Verified | Inaccurate | False",
          "evidence": "Brief explanation of your finding",
          "sourceUrl": "URL to the primary source"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const jsonStr = response.text().replace(/```json|```/g, "").trim();
      const verification = JSON.parse(jsonStr);
      
      return verification;
    } catch (error: any) {
      lastError = error;
      if (error.status === 404) {
        console.warn(`Model ${modelName} not found in verifyClaim, trying next...`);
        continue;
      }
      break;
    }
  }

  console.error("All verification models failed. Error:", lastError);
  
  let errorMessage = 'Verification failed due to an unexpected error.';
  if (lastError?.message?.includes('API_KEY_MISSING')) {
    errorMessage = 'Verification skipped: GEMINI_API_KEY is missing.';
  } else if (lastError?.message?.includes('API_KEY_INVALID')) {
    errorMessage = 'Verification failed: The provided GEMINI_API_KEY is invalid.';
  } else if (lastError?.message?.includes('quota')) {
    errorMessage = 'Verification failed: Gemini API quota exceeded.';
  } else if (searchResults.includes('TAVILY_API_KEY')) {
    errorMessage = 'Verification failed: TAVILY_API_KEY is missing.';
  } else if (lastError?.status === 404) {
    errorMessage = 'Verification failed: No compatible Gemini models found for this API key.';
  }

  return { 
    status: 'False', 
    evidence: errorMessage 
  };
}

async function searchWeb(query: string): Promise<string> {
  const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
  
  if (!TAVILY_API_KEY) {
    return "Search results unavailable. Please provide TAVILY_API_KEY.";
  }

  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: query,
        search_depth: "basic",
        max_results: 3
      })
    });
    
    const data = await response.json();
    return JSON.stringify(data.results.map((r: any) => r.content).join("\n"));
  } catch (error) {
    console.error("Search error:", error);
    return "Search failed.";
  }
}
