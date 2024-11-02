// pages/index.js
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from '../components/navbar';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
    const [showCard, setShowCard] = useState(false); // Card durumunu kontrol eden state

    const handleButtonClick = () => {
        setShowCard(true); // Butona tıklandığında Card'ı göster
    };

    return (
        <div className='h-screen'>
            <Navbar />

            <div className="flex flex-col items-center justify-start p-4">
                {/* Ana Başlık */}
                <h1 className="text-4xl mt-10 text-center px-44 font-black text-gray-800">
                    Daha az izleyin, daha fazlasını öğrenin ve uzun ders videolarından daha hızlı yararlanın
                </h1>

                {/* Input ve Button */}
                <div className="flex mt-10 items-center gap-4">
                    <Input
                        placeholder="Buraya YouTube linkini yapıştırınız..."
                        className="w-96 h-12 p-2 border border-gray-300 rounded-md"
                    />
                    <Button variant="primary" className="px-6 py-6 text-l" onClick={handleButtonClick}>
                        Gönder
                    </Button>
                </div>
            </div>

            {/* Card bileşeni butona basılınca gösterilir */}
            {showCard && (
                <div className='px-40 mt-16'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-xl'>YouTube Konusu</CardTitle>
                        </CardHeader>
                        <CardContent>
                            PDF2LEARN, PDF formatındaki kitaplarınızı güçlü bir öğrenme aracına dönüştürmek için tasarlanmış bir özellik. Bu araç sayesinde, kitaplarınızdan hızlıca özet çıkarabilir, metin içeriğinden interaktif quiz soruları oluşturabilir ve konuyla ilgili sorular sorarak daha derinlemesine bilgi edinebilirsiniz. PDF2LEARN, karmaşık içerikleri anlaşılır hale getirip öğrenme sürecinizi kolaylaştıran akıllı bir çözüm sunar.
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
