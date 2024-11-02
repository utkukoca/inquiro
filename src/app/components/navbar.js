// components/Navbar.js
import { Button } from "@/components/ui/button"


import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="  w-full h-30 mt-1 px-10 bg-white p-10 text-gray-900   text-base font-semibold shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
                <div className="text-3xl ">
                    <Link href="/" className="text-[#6C63FF] font-extrabold">InquiroAI</Link>
                </div>

                <div className="flex gap-5">
                    <Link href="/" className="hover:text-gray-600">Ana Sayfa</Link>
                    <Link href="/about" className="hover:text-gray-600">PDF2Learn</Link>
                    <Link href="/video" className="hover:text-gray-600">Video2Learn</Link>
                    <Link href="/contact" className="hover:text-gray-600">LearnDeck</Link>
                </div>
                <div className=" gap-4 flex">
                    <Button variant="primary">Sign In</Button>
                    <Button variant="primary">Register</Button>

                </div>



            </div>
        </nav>
    );
}
