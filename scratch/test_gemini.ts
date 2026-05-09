import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function listModels() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("Testing gemini-1.5-flash...");
    const result = await model.generateContent("Hello");
    console.log("Response:", result.response.text());
  } catch (error: any) {
    console.error("Error:", error.message);
    if (error.status === 404) {
      console.log("Model not found. This might be a naming issue or API key restriction.");
    }
  }
}

listModels();
