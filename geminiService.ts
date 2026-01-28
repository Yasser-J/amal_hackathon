
import { GoogleGenAI } from "@google/genai";
import { Submission } from "./types";

export const getRegulatoryResponse = async (userPrompt: string, submissions: Submission[], activeContext: Submission | null = null) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const generalDataContext = JSON.stringify(submissions.map(s => ({
      ref: s.reference,
      sector: s.sector,
      product: s.productNameEn,
      applicant: s.applicant,
      status: s.status,
      confidence: s.confidenceScore
    })));

    let contextPrompt = `You are a Regulatory Expert AI Assistant. You have access to these submissions: ${generalDataContext}.`;

    if (activeContext) {
      contextPrompt += `\n\nCRITICAL CONTEXT: The user is currently viewing the details of Product Reference: ${activeContext.reference}. 
      Product Name: ${activeContext.productNameEn} (${activeContext.productNameAr}).
      Applicant: ${activeContext.applicant}.
      Current AI-Assessment: ${activeContext.status}.
      Confidence Score: ${activeContext.confidenceScore}%.
      AI Justification: ${activeContext.details?.justification}.
      Manufacturer: ${activeContext.details?.manufacturer}.
      Origin: ${activeContext.details?.origin}.
      Description: ${activeContext.details?.description}.
      
      When the user asks questions like "why did you reject this?" or "clarify the assessment", they are referring specifically to this product.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `${contextPrompt}\n\nProvide professional, concise regulatory advice. Be specific to the active product if the query implies it.`,
      }
    });

    return response.text || "I apologize, but I couldn't process that request at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my regulatory database right now. Please try again shortly.";
  }
};
