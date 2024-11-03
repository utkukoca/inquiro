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
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 items-center justify-start lg:px-0">

              
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

                    <p className=" text-sm mt-5 text-gray-600 ">
                    InquiroAI, derslerinizi daha verimli ve etkili hale getiren bir dijital eğitim platformudur. Amacımız, öğrenme sürecini kişiselleştirilmiş ve etkileşimli araçlarla destekleyerek bilgiye erişimi kolaylaştırmaktır. PDF, video ve quiz formatlarındaki içeriği anlamlandırarak size uygun hale getirir; öğrenmenizi hızlandırır ve hafızanızda kalıcı olmasını sağlar.
                    </p>
                </div>

               
                <div className=" items-start justify-start">
                    <Image src={SImage} alt="Sample" width={600} height={600} />
                </div>

            </div>
        </section>
    );
};


