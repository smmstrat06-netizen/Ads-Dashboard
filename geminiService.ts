
import { GoogleGenAI } from "@google/genai";
import { CampaignMetric, ChatMessage } from "./types";

/**
 * Analyzes campaign data using Gemini AI.
 * Uses gemini-3-pro-preview for complex reasoning tasks (media strategy analysis).
 */
export const analyzeAdsData = async (data: CampaignMetric[]) => {
  // Always use a new instance with the direct process.env.API_KEY as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const dataSummary = data.map(c => 
    `${c.platform} Campaign: ${c.name}, Spend: $${c.spend}, Revenue: $${c.revenue}, ROAS: ${(c.revenue/c.spend).toFixed(2)}, Conversions: ${c.conversions}`
  ).join('\n');

  const prompt = `
    You are a Senior Paid Media Strategist with 7+ years of experience in Facebook and Google Ads.
    Analyze the following campaign data and provide:
    1. Performance Diagnosis (General overview)
    2. Issues Detected (Specifically high CPA, low ROAS, or underperforming platforms)
    3. Scaling Opportunities (Which campaigns have high potential)
    4. Recommended Actions (Numbered priority list)

    Campaign Data:
    ${dataSummary}

    Be concise, professional, and focus on growth and profitability.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    // Use .text property directly as per latest SDK guidelines
    return response.text;
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return "Failed to generate AI analysis. Please try again.";
  }
};

/**
 * Handles multi-turn chat interaction with the AI media expert.
 */
export const chatWithAIExpert = async (history: ChatMessage[], currentData: CampaignMetric[]) => {
  // Always use a new instance with the direct process.env.API_KEY as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const dataSummary = currentData.map(c => 
    `${c.platform} Campaign: ${c.name}, Spend: $${c.spend}, Revenue: $${c.revenue}, ROAS: ${(c.revenue/c.spend).toFixed(2)}`
  ).join('\n');

  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `You are a Senior Paid Media Strategist. You have access to the following ad account data:\n${dataSummary}\n\nAnswer user questions strictly based on this data and industry best practices. Focus on ROAS, CPA, and scalability.`,
    },
  });

  const lastMessage = history[history.length - 1].text;
  
  try {
    const response = await chat.sendMessage({ message: lastMessage });
    // Use .text property directly as per latest SDK guidelines
    return response.text;
  } catch (error) {
    console.error("Gemini chat error:", error);
    return "I'm having trouble processing that right now. Could you rephrase?";
  }
};
