// app/api/summarize/route.js

import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

// API istemcisi başlat
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function fetchTranscriptParagraph(videoUrl) {
  try {
    // YouTube transkriptini al ve tüm `text` alanlarını bir paragraf olarak birleştir
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
    const paragraph = transcript.map(item => item.text).join(' ');

    console.log('Transcript combined into paragraph.');
    return paragraph;
  } catch (error) {
    console.error('Error fetching the transcript:', error);
    throw error;
  }
}

async function generateSummary(paragraph) {
  try {
    const prompt = `Summary:\n${paragraph}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
}

// Next.js API Route olarak POST endpoint tanımla
export async function POST(req) {
  try {
    const { videoUrl } = await req.json();

    if (!videoUrl) {
      return new Response(JSON.stringify({ error: 'YouTube video URL is required' }), { status: 400 });
    }

    const paragraph = await fetchTranscriptParagraph(videoUrl); // Hafızada paragrafı al
    const summary = await generateSummary(paragraph); // Hafızada paragrafı özetle

    return new Response(JSON.stringify({ summary }), { status: 200 });
  } catch (error) {
    console.error('Error generating summary:', error);
    return new Response(JSON.stringify({ error: 'Error generating summary' }), { status: 500 });
  }
}
