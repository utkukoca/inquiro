// components/CardsGrid.js

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const CardsGrid = () => {
    return (
        <div className="grid grid-cols-3 px-24 gap-6 p-4">
            <Card>
                <CardHeader>
                    <CardTitle className='text-xl'>PDF2LEARN: PDF’den Bilgiye Akıllı Dönüşüm</CardTitle>
                </CardHeader>
                <CardContent>


                    PDF2LEARN, PDF formatındaki kitaplarınızı güçlü bir öğrenme aracına dönüştürmek için tasarlanmış bir özellik. Bu araç sayesinde, kitaplarınızdan hızlıca özet çıkarabilir, metin içeriğinden interaktif quiz soruları oluşturabilir ve konuyla ilgili sorular sorarak daha derinlemesine bilgi edinebilirsiniz. PDF2LEARN, karmaşık içerikleri anlaşılır hale getirip öğrenme sürecinizi kolaylaştıran akıllı bir çözüm sunar.


                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className='text-xl' > Video2Learn: Görsel İçerikten Öğrenme Gücü</CardTitle>
                </CardHeader>
                <CardContent>


                    Video2Learn, izlediğiniz videoları birer bilgi kaynağına dönüştürür. Bu özellik sayesinde, videolardan özetler elde edebilir, ilgi çekici sorular ve quizler oluşturabilir, hatta içerikle ilgili derinlemesine sorular sorabilirsiniz. Video2Learn, videoları yalnızca izlemenizi değil, onlardan gerçek anlamda öğrenmenizi sağlamak için tasarlandı.
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className='text-xl'>  LearnDeck: Bilgiyi Hafızaya Kazı!</CardTitle>
                </CardHeader>
                <CardContent>


                    LearnDeck, bilgiyi kalıcı hale getirmek için interaktif ve akıllı bir öğrenme aracı sunar. Bu özellik sayesinde, tanımlar, önemli kavramlar ve temel bilgiler flashcard formatında sunulur. Kartlarda anahtar kelimelerle desteklenen bilgiler, öğrenmeyi hızlandırırken aynı zamanda eğlenceli bir deneyim sağlar. LearnDeck ile konuları hızlıca gözden geçirip hafızanızı tazeleyebilir, öğrendiklerinizi pekiştirebilirsiniz.
                </CardContent>
            </Card>
        </div>
    );
};

export default CardsGrid;
