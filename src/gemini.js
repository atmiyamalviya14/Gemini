// src/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const MODEL_NAME = "gemini-1.5-flash-latest";

export async function generateGeminiResponse(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    if (error.message.includes("429")) {
      console.warn("Rate limit hit. Retrying in 60s...");
      await new Promise((resolve) => setTimeout(resolve, 60000));
      return generateGeminiResponse(prompt); // Retry once
    }
    console.error("Error generating Gemini response:", error);
    throw error;
  }
}
