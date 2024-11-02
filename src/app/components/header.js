// components/Header.js
"use client";

import Image from 'next/image';
import React from 'react';
import { ReactTyped } from "react-typed";

import SampleImage from '../assets/1.png';
import SImage from '../assets/web-development.png';

export default function Header() {
    return (
        <section className="flex items-center px-10 h-screen mt-10  bg-gray-100">
            <div className="container mx-auto grid sm:grid-cols-1 mb-10 md:grid-cols-1 grid-cols-2 items-center justify-start lg:px-0">

              
                <div className="grid px-20 text-start">
                    <div className='flex'>
                        <h1 className="text-6xl font-bold text-gray-800 mb-4 -tracking-wider">
                            Derslerinizde başarılı olmak{" "}
                            <span className="text-[#6C63FF]">InquiroAI</span> ile{" "}
                            <ReactTyped
                                className="text-blue-600"
                                strings={['kolay', 'hızlı', 'verimli']}
                                typeSpeed={100}
                                backSpeed={50}
                                loop
                            />
                            .
                        </h1>



                    </div>

                    <p className="text-base mt-5 text-gray-600 ">
                        Gemini API ile derslerinizde rahat bir şekilde hazırlanın.  Gemini API ile derslerinizde rahat bir şekilde hazırlanın.  Gemini API ile derslerinizde rahat bir şekilde hazırlanın.
                    </p>
                </div>

               
                <div className=" items-start justify-start">
                    <Image src={SImage} alt="Sample" width={600} height={600} />
                </div>

            </div>
        </section>
    );
};


