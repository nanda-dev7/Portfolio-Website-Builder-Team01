import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const geminiService = {
  async generateBio(profession: string, experience: string) {
    const prompt = `Generate a professional, engaging "About Me" bio for a ${profession} with the following experience: ${experience}. Keep it concise and compelling for a portfolio website.`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt
      });
      return response.text;
    } catch (error) {
      console.error('Error generating bio:', error);
      return null;
    }
  },

  async suggestSkills(profession: string) {
    const prompt = `Suggest a list of top 10 relevant technical and soft skills for a ${profession}. Return as a comma-separated list.`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt
      });
      return response.text?.split(',').map(s => s.trim()) || [];
    } catch (error) {
      console.error('Error suggesting skills:', error);
      return [];
    }
  }
};
