"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from '../components/navbar';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VideoPage() {
    const [showCard, setShowCard] = useState(false);
    const [youtubeLink, setYoutubeLink] = useState('');
    const [summary, setSummary] = useState('');

    const handleButtonClick = async () => {
        if (!youtubeLink.trim()) {
            alert("Lütfen bir YouTube linki yapıştırınız.");
            return;
        }

        try {
            const response = await axios.post('/api/summarize', { videoUrl: youtubeLink.trim() });
            setSummary(response.data.summary);
            setShowCard(true);
        } catch (error) {
            console.error("Özetleme başarısız oldu:", error);
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className='h-screen'>
            <Navbar />

            <div className="flex flex-col items-center justify-start p-4">
                <h1 className="text-4xl mt-10 text-center px-44 font-black text-gray-800">
                    Daha az izleyin, daha fazlasını öğrenin ve uzun ders videolarından daha hızlı yararlanın
                </h1>

                <div className="flex mt-10 items-center gap-4">
                    <Input
                        placeholder="Buraya YouTube linkini yapıştırınız..."
                        className="w-96 h-12 p-2 border border-gray-300 rounded-md"
                        value={youtubeLink}
                        onChange={(e) => setYoutubeLink(e.target.value)}
                    />
                    <Button variant="primary" className="px-6 py-6 text-l" onClick={handleButtonClick}>
                        Gönder
                    </Button>
                </div>
            </div>

            {showCard && (
                <div className='px-40 mt-16'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-xl'>YouTube Konusu</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {summary}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
