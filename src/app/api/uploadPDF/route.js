import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from 'fs';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const fileManager = new GoogleAIFileManager(process.env.API_KEY);

export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get('file');

        if (!file) {
            return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
        }

        // Geçici dosyaya kaydet
        const tempFilePath = `/tmp/${file.name}`;
        fs.writeFileSync(tempFilePath, Buffer.from(await file.arrayBuffer()));

        const uploadResponse = await fileManager.uploadFile(tempFilePath, {
            mimeType: "application/pdf",
            displayName: file.name,
        });

        const fileUri = uploadResponse.file.uri;
        console.log(`Uploaded file as: ${fileUri}`);

        // Geçici dosyayı sil
        fs.unlinkSync(tempFilePath);

        return NextResponse.json({ fileUri });

    } catch (error) {
        console.error("Error uploading PDF:", error);
        return NextResponse.json({ error: "Failed to upload PDF" }, { status: 500 });
    }
}
