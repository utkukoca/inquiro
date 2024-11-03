import ChatPage from '../components/chatpage';
import Navbar from '../components/navbar';

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 lg:pt-24 flex-1">
        <ChatPage />
      </div>
    </div>
  );
}
