"use client";

import React, { useState } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  const [file, setFile] = useState(null);
  const [fileUri, setFileUri] = useState(null); // Dosya URI'sini saklamak için
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileUri(null); // Yeni dosya yüklendiğinde URI'yi sıfırla
    } else {
      alert("Lütfen yalnızca PDF formatında bir dosya yükleyin.");
    }
  };

  const uploadPDF = async () => {
    if (!file) {
      console.error("Yüklenecek dosya bulunamadı.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/uploadPDF", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.fileUri; // URI'yi döndür
    } catch (error) {
      console.error("PDF yükleme başarısız oldu:", error);
      alert("PDF yüklenirken bir hata oluştu.");
      return null;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !file) {
      alert("Lütfen bir mesaj yazın veya PDF dosyası yükleyin.");
      return;
    }

    // Eğer dosya var ve URI henüz alınmamışsa, dosyayı yükle ve URI'yi al
    if (file && !fileUri) {
      const uri = await uploadPDF();
      if (!uri) {
        console.error("PDF URI alınamadı.");
        return; // Hata varsa işlemi sonlandır
      }
      setFileUri(uri); // Başarılı ise URI'yi sakla
    }

    const prompt = inputValue.trim();
    setMessages((prevMessages) => [...prevMessages, { text: prompt, sender: "user" }]);

    try {
      setLoading(true);
      
      // API çağrısı yapmadan önce `fileUri` ve `prompt` değerlerini doğrula
      const currentFileUri = fileUri || await uploadPDF(); // Eğer URI yoksa tekrar yükle
      if (!currentFileUri || !prompt) {
        console.error("fileUri veya prompt eksik.");
        alert("Mesaj veya dosya bilgisi eksik. Lütfen kontrol edin.");
        return;
      }

      const response = await axios.post("/api/askQuestion", {
        fileUri: currentFileUri,
        prompt,
      });

      const botMessage = { text: response.data.answer, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Yanıt alma başarısız oldu:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
      setInputValue(""); // Prompt alanını temizle
    }
  };

  return (
    <div className="flex flex-col p-10 h-full bg-gray-100">
      {/* Message Display Area */}
      <div className="flex-1 overflow-y-auto bg-white p-8 rounded-xl shadow mb-4">
        {messages.length === 0 && <p className="text-gray-400">Henüz bir mesaj yok.</p>}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 my-2 rounded-lg max-w-xs ${
                message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
              }`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {loading && <div className="text-gray-400 text-center mt-2">Yanıt bekleniyor...</div>}
      </div>

      {/* Message Input Area */}
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
        {file && (
          <div className="text-gray-500 text-sm mb-2">
            Dosya yüklendi: {file.name}
          </div>
        )}

        {/* Input and Button Area */}
        <div className="flex gap-2 w-full">
          {/* Upload Button */}
          <label className="flex items-center cursor-pointer">
            <FiUpload className="text-blue-600 mr-2" size={24} />
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Message Input */}
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Mesajınızı veya özet isteğinizi yazın..."
            className="flex-1"
          />

          {/* Send Button */}
          <Button onClick={handleSendMessage} variant="primary" disabled={loading || (!fileUri && !file)}>
            {loading ? "Gönderiliyor..." : "Gönder"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
