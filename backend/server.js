import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const fileManager = new GoogleAIFileManager(process.env.API_KEY);


const upload = multer({ dest: 'uploads/' });

app.post('/uploadPDF', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const uploadResponse = await fileManager.uploadFile(filePath, {
            mimeType: "application/pdf",
            displayName: req.file.originalname,
        });

        const fileUri = uploadResponse.file.uri; 
        console.log(`Uploaded file as: ${fileUri}`);
        
     
        fs.unlinkSync(filePath);

        res.json({ fileUri }); 

    } catch (error) {
        console.error("Error uploading PDF:", error);
        res.status(500).json({ error: "Failed to upload PDF" });
    }
});

app.post('/askQuestion', async (req, res) => {
    try {
        const { fileUri, prompt } = req.body;

        if (!fileUri || !prompt) {
            return res.status(400).json({ error: "fileUri and prompt are required." });
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
        console.log(answer);
        res.json({ answer });

    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Failed to process question" });
    }
});

app.listen(8080, () => {
    console.log('Server started at port 8080');
});
