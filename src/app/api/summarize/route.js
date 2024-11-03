// app/api/summarize/route.js

import { YoutubeTranscript } from 'youtube-transcript';
import { writeFile } from 'fs/promises';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

// API istemcisi başlat
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function fetchAndStoreTranscript(videoUrl) {
  try {
    // YouTube transkriptini al
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
    const transcriptData = JSON.stringify(transcript, null, 2);

    // `text` alanlarını birleştirip bir paragraf haline getir
    const paragraph = transcript.map(item => item.text).join(' ');

    // Birleştirilen paragrafı `paragraph.txt` dosyasına kaydet
    await writeFile('paragraph.txt', paragraph);
    console.log('Combined paragraph has been saved to paragraph.txt');

    return paragraph;
  } catch (error) {
    console.error('Error fetching or storing the transcript:', error);
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

    const paragraph = await fetchAndStoreTranscript(videoUrl);
    const summary = await generateSummary(paragraph);

    return new Response(JSON.stringify({ summary }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error generating summary' }), { status: 500 });
  }
}
