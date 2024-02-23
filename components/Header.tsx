"use client"
import Image from "next/image";
import Link from "next/link";
import gitHubIcon from "../public/img/25231.png";

import logoDay from "../public/img/logo.webp";
import logoNight from "../public/img/logo.webp";
import { useState } from "react";
import PreHeader from './PreHeader'
import { useSnapshot } from 'valtio';
import state from '../store';


function Header() {
  const snap = useSnapshot(state);

  // Get the current hour
 const currentHour = new Date().getHours();
 // Determine if it's day or night based on the current hour
 const isDayTime = currentHour >= 6 && currentHour < 18; // Daytime is between 6 AM and 6 PM

  return (
 
        <div className="">
   {/* {snap.intro &&  <PreHeader/> } */}
          <header className="top-0 z-50 flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 p-4 shadow-lg text-white w-full">
            <div className="flex items-center space-x-4">
              <Image
                src={isDayTime ? logoDay : logoNight}
                alt="Company Logo"
                width={100}
                height={20}
                className="object-contain"
              />
              <div className="flex flex-col">
                <h1 className="font-sans font-bold text-xl sm:text-2xl">
                  Welcome to{" "}
                  <a href={`${process.env.WEBSITE_URL}`} target="_blank" rel="noopener noreferrer" className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:underline">
                    REAL AI
                  </a>
                </h1>
                <h2 className="text-sm sm:text-base">Making your AI Dreams a reality</h2>
              </div>
            </div>
            {/* Add navigation links or buttons here if needed */}
          </header>
        </div>
  
    
  

  );
}

export default Header;
