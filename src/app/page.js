import Navbar from "./components/navbar.js";
import Header from "./components/header.js";
import CardsGrid from "./components/card.js";

export default function Home() {
  return (
    <div className="grid bg-[#F5F4FF] grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen     py-5 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <Header/>
      
        <CardsGrid/>

     
    
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* Footer içeriği buraya gelecek */}
      </footer>
    </div>
  );
}
