
import { GoogleGenAI, Type } from "@google/genai";
import type { PhraseData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const phraseSchema = {
    type: Type.OBJECT,
    properties: {
        phrase: { 
            type: Type.STRING,
            description: "The English phrasal verb or idiom." 
        },
        meaning: { 
            type: Type.STRING,
            description: "A clear and concise definition of the phrase."
        },
        examples: {
            type: Type.ARRAY,
            description: "Two distinct example sentences showing how the phrase is used.",
            items: { 
                type: Type.STRING 
            }
        },
    },
    required: ["phrase", "meaning", "examples"],
};

export const fetchPhrase = async (): Promise<PhraseData> => {
    try {
        const seed = Math.floor(Math.random() * 10000);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a completely different and common English phrasal verb or idiom **each time** this prompt is called. 
                Never repeat the same phrase, and avoid using "break a leg" or any phrase you've used recently. 
                Provide the following JSON structure:
                {
                "phrase": "...",
                "meaning": "...",
                "examples": ["...", "..."]
                }
                Seed: ${seed}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: phraseSchema,
                temperature: 1,
            }
        });

        const jsonText = response.text.trim();
        console.log("Gemini raw response:", jsonText);

        const parsedData = JSON.parse(jsonText) as PhraseData;

        // Basic validation
        if (!parsedData.phrase || !parsedData.meaning || !parsedData.examples || parsedData.examples.length < 1) {
             throw new Error("Invalid data structure received from API.");
        }

        return parsedData;

    } catch (error) {
        console.error("Error fetching phrase from Gemini API:", error);
        if (error instanceof Error && error.message.includes("429")) {
            throw new Error("API rate limit exceeded. Please try again later.");
        }
        throw new Error("Failed to fetch a new phrase. Please check your connection or API key.");
    }
};
