// pages/index.js

import ChatPage from '../components/chatpage';
import Navbar from '../components/navbar';

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      
        <ChatPage />
    </div>
  );
}
