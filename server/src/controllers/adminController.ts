import { Request, Response, NextFunction } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../db/index.js";
import { desc } from "drizzle-orm";
import { responses } from "../db/schema.js";

const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}
const genAI = new GoogleGenerativeAI(geminiApiKey);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const getAllResponses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allResponses = await db
      .select()
      .from(responses)
      .orderBy(desc(responses.createdAt));
    res.json(allResponses);
  } catch (error) {
    next(error);
  }
};

export const analyzeSentiment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res
        .status(400)
        .json({ message: 'A non-empty "text" field is required.' });
    }

    const prompt = `Analyze the sentiment of the following feedback text.

    Provide the overall sentiment category (Positive, Negative, or Neutral).

    If the sentiment is Positive, provide a concise observation (1-2 sentences) about *why* it's positive based on the user's language or tone, or specific aspects mentioned. This observation should be descriptive and interpretative.

    If the sentiment is Negative, provide a concise observation (1-2 sentences) about *why* it's negative, focusing on the user's language, tone, or specific complaints. For example, if the user types "bad app!!", the observation could be "The feedback uses strong negative language and exclamation marks, indicating frustration."

    If the sentiment is Neutral, leave the positiveObservation and negativeObservation strings empty.

    Format your response as a JSON object with the following structure:
    {
      "category": "SentimentCategory", // e.g., "Positive", "Negative", "Neutral"
      "positiveObservation": "Concise observation if positive", // string, empty if not positive
      "negativeObservation": "Concise observation if negative" // string, empty if not negative
    }

    Text: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const jsonText = response.text().trim();

    let geminiResult: {
      category: string;
      positiveObservation?: string;
      negativeObservation?: string;
    };

    try {
      geminiResult = JSON.parse(
        jsonText
          .replace(/^\s*```json\s*/i, "")   // Remove starting ```json (case-insensitive)
          .replace(/^\s*```\s*/i, "")       // Remove starting ``` if present
          .replace(/\s*```\s*$/i, "")       // Remove ending ```
          .trim()
      );
    } catch (parseError) {
      console.error(
        "Failed to parse Gemini response as JSON:",
        jsonText,
        parseError
      );
      return res.status(500).json({
        message:
          "Failed to parse sentiment analysis from AI. Raw response: " +
          jsonText,
        originalText: text,
      });
    }

    let totalScore: number;
    const sentimentCategory = geminiResult.category;

    if (sentimentCategory === "Positive") {
      totalScore = 1;
    } else if (sentimentCategory === "Negative") {
      totalScore = -1;
    } else {
      totalScore = 0;
    }

    const positiveWords = geminiResult.positiveObservation ?? "";
    const negativeWords = geminiResult.negativeObservation ?? "";

    res.json({
      score: totalScore,
      category: sentimentCategory,
      positiveWords: positiveWords ? [positiveWords] : [],
      negativeWords: negativeWords ? [negativeWords] : [],
    });
  } catch (error) {
    console.error("Error analyzing sentiment with Gemini:", error);
    next(error);
  }
};
