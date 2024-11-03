import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function POST(req) {
    try {
        const { fileUri, prompt } = await req.json();

        if (!fileUri || !prompt) {
            return NextResponse.json({ error: "fileUri and prompt are required." }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: "application/pdf",
                    fileUri,
                },
            },
            { text: prompt },
        ]);

        const answer = await result.response.text();
        return NextResponse.json({ answer });

    } catch (error) {
        console.error("Error generating response:", error);
        return NextResponse.json({ error: "Failed to process question" }, { status: 500 });
    }
}
