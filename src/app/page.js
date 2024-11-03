import Navbar from "./components/navbar.js";
import Header from "./components/header.js";
import CardsGrid from "./components/card.js";

export default function Home() {
  return (
    <div className="bg-[#F5F4FF] min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Navbar'ı en üstte sabitle */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Navbar />
      </div>
      
      {/* Navbar yüksekliğine göre içerik boşluğu ekle */}
      <div className="pt-20 lg:pt-24 flex flex-col items-center justify-center">
        <Header />
        <CardsGrid />
      </div>
      
      {/* Footer en alta sabitlenmiş değil, sayfanın sonunda yer alacak */}
      <footer className="flex gap-6 flex-wrap items-center justify-center py-5">
        {/* Footer içeriği buraya gelecek */}
      </footer>
    </div>
  );
}
