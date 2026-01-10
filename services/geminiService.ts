
import { GoogleGenAI } from "@google/genai";

// Guideline: Always use process.env.API_KEY directly when initializing.
// Guideline: Create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.

export const askAITutor = async (prompt: string): Promise<string> => {
  // Initialize right before use
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      // Complex academic tutoring tasks should use gemini-3-pro-preview
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are PeerPath AI, a friendly and expert academic tutor. 
        Your goal is to help students understand complex concepts, solve problems step-by-step, 
        and suggest study strategies. Keep your tone encouraging and academic yet accessible. 
        Use Markdown formatting for clarity.`,
        temperature: 0.7,
      },
    });

    // Access .text property directly (not as a method)
    return response.text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with the AI. Please ensure your API key is valid.";
  }
};

export const suggestPeers = async (userInterests: string): Promise<string> => {
  // Initialize right before use
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      // Basic text suggestion tasks can use gemini-3-flash-preview
      model: 'gemini-3-flash-preview',
      contents: `Based on these interests: "${userInterests}", suggest a few types of study partners (e.g., "A math enthusiast with strong logic skills"). Give me a short summary.`,
    });
    // Access .text property directly
    return response.text || "No suggestions available.";
  } catch (error) {
    return "Could not generate suggestions.";
  }
};
