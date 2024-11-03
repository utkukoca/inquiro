// youtube-transcript ve fs/promises modüllerini import edin
import { YoutubeTranscript } from 'youtube-transcript';
import { writeFile, readFile } from 'fs/promises';
import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import cors from 'cors';

// .env dosyasındaki verileri al
dotenv.config();

// express uygulaması oluştur ve CORS'u yapılandır
const app = express();
app.use(cors()); // CORS'u tüm isteklere izin verecek şekilde yapılandır
app.use(express.json());

// API istemcisi başlat
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Transkript alma ve kaydetme fonksiyonu
async function fetchAndStoreTranscript(videoUrl) {
  try {
    // Video transkriptini al
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
    const transcriptData = JSON.stringify(transcript, null, 2);

    // Transkripti JSON formatında dosyaya kaydet
    await writeFile('transcript.json', transcriptData);
    console.log('Transcript data has been saved to transcript.json');

    // `text` alanlarını birleştirip paragraf dosyasına kaydetme
    const paragraph = transcript.map(item => item.text).join(' ');
    await writeFile('paragraph.txt', paragraph);
    console.log('Combined paragraph has been saved to paragraph.txt');

    return paragraph;
  } catch (error) {
    console.error('Error fetching or storing the transcript:', error);
    throw error;
  }
}

// Özetleme fonksiyonu
async function generateSummary(paragraph) {
  try {
    // Prompt metni oluştur
    const prompt = `Summary:\n${paragraph}`;

    // Özetleme isteği gönder
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
}

// POST endpoint oluşturma
app.post('/summarize', async (req, res) => {
  const { videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ error: 'YouTube video URL is required' });
  }

  try {
    const paragraph = await fetchAndStoreTranscript(videoUrl);
    const summary = await generateSummary(paragraph);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: 'Error generating summary' });
  }
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
