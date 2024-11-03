// components/Navbar.js
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-white text-gray-900 font-semibold shadow-md z-50">
                <div className="container mx-auto flex justify-between items-center px-6 py-4">
                    <div className="text-3xl">
                        <Link href="/" className="text-[#6C63FF] font-extrabold">
                            InquiroAI
                        </Link>
                    </div>

                    {/* Hamburger Menu Icon - Mobile Only */}
                    <div className="lg:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </div>

                    {/* Navbar Links - Desktop View */}
                    <div className="hidden lg:flex gap-5">
                        <Link href="/" className="hover:text-gray-600">Ana Sayfa</Link>
                        <Link href="/about" className="hover:text-gray-600">PDF2Learn</Link>
                        <Link href="/video" className="hover:text-gray-600">Video2Learn</Link>
                        <Link href="/contact" className="hover:text-gray-600">LearnDeck</Link>
                    </div>

                    {/* Authentication Buttons - Desktop View */}
                    <div className="hidden lg:flex gap-4">
                        <Button variant="primary">Sign In</Button>
                        <Button variant="primary">Register</Button>
                    </div>
                </div>

                {/* Mobile Menu - Slide Out Drawer */}
                {menuOpen && (
                    <div className="lg:hidden flex flex-col items-center bg-white shadow-md mt-4 p-4 space-y-4">
                        <Link href="/" className="hover:text-gray-600" onClick={toggleMenu}>
                            Ana Sayfa
                        </Link>
                        <Link href="/about" className="hover:text-gray-600" onClick={toggleMenu}>
                            PDF2Learn
                        </Link>
                        <Link href="/video" className="hover:text-gray-600" onClick={toggleMenu}>
                            Video2Learn
                        </Link>
                        <Link href="/contact" className="hover:text-gray-600" onClick={toggleMenu}>
                            LearnDeck
                        </Link>
                        <Button variant="primary" onClick={toggleMenu}>
                            Sign In
                        </Button>
                        <Button variant="primary" onClick={toggleMenu}>
                            Register
                        </Button>
                    </div>
                )}
            </nav>
            {/* Navbar'ın kapladığı alan kadar boşluk bırakmak için içerik üstüne padding ekle */}
            <div className="pt-20 lg:pt-24"></div>
        </>
    );
}
