// src/utils/geminiConfig.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // You can also use environment variable for better security

export const genAI = new GoogleGenerativeAI(apiKey);

export const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
};
