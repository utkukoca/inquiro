import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Google Generative AI istemcisini başlat
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// YouTube transkriptini al ve bir paragraf olarak birleştir
async function fetchTranscriptParagraph(videoUrl) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
    if (!transcript || !transcript.length) {
      throw new Error('Transcript not found or empty');
    }
    const paragraph = transcript.map(item => item.text).join(' ');
    console.log('Transcript combined into paragraph.');
    return paragraph;
  } catch (error) {
    console.error('Error fetching the transcript:', error);
    throw new Error('Transcript fetch failed');
  }
}

// Paragrafı özetle
async function generateSummary(paragraph) {
  try {
    const prompt = `Summary:\n${paragraph}`;
    const result = await model.generateContent(prompt);

    if (!result.response || !result.response.text) {
      throw new Error('Invalid response from generative model');
    }

    return result.response.text();
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error('Summary generation failed');
  }
}

// Next.js API Route olarak POST endpoint tanımla
export async function POST(req) {
  try {
    const { videoUrl } = await req.json();

    if (!videoUrl) {
      return new Response(JSON.stringify({ error: 'YouTube video URL is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Transcript paragrafını al ve özetle
    const paragraph = await fetchTranscriptParagraph(videoUrl);
    const summary = await generateSummary(paragraph);

    return new Response(JSON.stringify({ summary }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing request:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
