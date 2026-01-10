
import { GoogleGenAI } from "@google/genai";

// Guideline: Always use process.env.API_KEY directly when initializing.
// Guideline: Create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.

export const askAITutor = async (prompt: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("Gemini API Key is missing. Check your .env.local and vite.config.ts configuration.");
    return "The AI Tutor is currently unavailable. Please contact the administrator.";
  }

  try {
    // Initialize right before use
    const ai = new GoogleGenAI({ apiKey });

    // Use the correct model name - gemini-2.0-flash is stable and widely available
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
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
  } catch (error: any) {
    console.error("Gemini API Error:", error?.message || error);
    // Provide more specific error information
    if (error?.message?.includes('API key')) {
      return "Error: The API key appears to be invalid. Please check your configuration.";
    }
    if (error?.message?.includes('model')) {
      return "Error: The requested AI model is not available. Please try again later.";
    }
    return "Error communicating with the AI. Please try again in a moment.";
  }
};

export const suggestPeers = async (userInterests: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key missing for peer suggestions.");
    return "Could not generate suggestions.";
  }

  try {
    // Initialize right before use
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `Based on these interests: "${userInterests}", suggest a few types of study partners (e.g., "A math enthusiast with strong logic skills"). Give me a short summary.` }]
        }
      ],
    });

    // Access .text property directly
    return response.text || "No suggestions available.";
  } catch (error) {
    console.error("Peer suggestion error:", error);
    return "Could not generate suggestions.";
  }
};
