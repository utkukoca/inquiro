// components/ChatPage.js

"use client";

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiUpload } from "react-icons/fi";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); // Dosya input için ref oluşturun

  // Kullanıcı mesajı gönderme işlevi
  const handleSendMessage = () => {
    if (inputValue.trim() || file) {
      const newMessage = {
        text: inputValue.trim(),
        sender: "user",
        file: file ? `Dosya yüklendi: ${file.name}` : null,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Mesaj gönderildikten sonra inputValue ve file durumlarını sıfırla
      setInputValue('');
      setFile(null);

      // Dosya inputunu sıfırlayın
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // API'den yanıt almak için simülasyon
      fetchResponse();
    }
  };

  // API isteğini simüle eden işlev
  const fetchResponse = async () => {
    setTimeout(() => {
      const botMessage = { text: "Merhaba! Size nasıl yardımcı olabilirim?", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  // Dosya seçme işlevi
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setInputValue(''); // Input alanını boş bırakıyoruz
    } else {
      alert("Lütfen yalnızca PDF formatında bir dosya yükleyin.");
    }
  };

  return (
    <div className="flex flex-col p-10 h-full bg-gray-100">
      
      {/* Mesaj Gösterim Alanı */}
      <div className="flex-1 overflow-y-auto bg-white p-8 rounded-xl shadow mb-4">
        {messages.length === 0 && <p className="text-gray-400">Henüz bir mesaj yok.</p>}
        
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`p-2 my-2 rounded-lg max-w-xs ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}>
              <p>{message.text}</p>
              {message.file && <p className="text-sm text-gray-200 mt-1">{message.file}</p>}
            </div>
          </div>
        ))}
      </div>
      
      {/* Mesaj Giriş Alanı */}
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
        
        {/* Dosya Yüklendi Mesajı */}
        {file && (
          <div className="text-gray-500 text-sm mb-2">
            Dosya yüklendi: {file.name}
          </div>
        )}
        
        {/* Input ve Buton Alanı */}
        <div className="flex gap-2 w-full">
          {/* Upload Butonu */}
          <label className="flex items-center cursor-pointer">
            <FiUpload className="text-blue-600 mr-2" size={24} />
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              ref={fileInputRef} // inputa ref ekleyin
              className="hidden"
            />
          </label>
          
          {/* Mesaj Giriş ve Gönderme */}
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} variant="primary">Gönder</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
