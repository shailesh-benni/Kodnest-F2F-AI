import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCGZYD-kc9BNy94EyKRzAkifTmD1FXbJC4";
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
};

async function generateQuestions() {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
    generationConfig,
  });

  const chat = model.startChat({ history: [] });

  const paragraph = `I am Shailesh Benni and I have completed my BCA graduation from Gogte College of commerce. And I know Java, Javascript, MERN Stack and with these technologies i have developed some projects like College Website with chatbot , Chat application , Grocery Shop  and my own portfolio`;

  const prompt = `Based on the following paragraph, generate 5 questions:\n${paragraph}`;

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const text = response.text();

  console.log("Generated Questions:\n", text);
}

generateQuestions().catch(console.error);
