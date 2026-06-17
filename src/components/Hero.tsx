import React from 'react';
import { motion } from 'motion/react';
import heroBannerImg from '../assets/twirtles_hero_banner.mp4';
import Marquee from './Marquee';

interface HeroProps {
  onShopClick?: () => void;
}

export default function Hero({ onShopClick }: HeroProps) {
  const nutritionClaims = [
    {
      title: "10-12G PROTEIN",
      description: "Fuel for your daily hustle",
      icon: (
        <svg className="w-8 h-8 text-[#8d5438]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 4a4 4 0 0 1 4 4c0 1.5-.5 3-1.5 4.5l-2.5 3a2 2 0 0 1-3 0l-2.5-3A5.5 5.5 0 0 1 5 8a4 4 0 0 1 4-4" />
          <path d="M9 13.5h6" />
          <path d="M12 17v4" />
        </svg>
      )
    },
    {
      title: "0G SUGAR",
      description: "No sugar crash, pure energy",
      icon: (
        <svg className="w-8 h-8 text-[#8d5438]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M12 4v6" />
          <path d="M8 6h8" />
          <line x1="2" y1="2" x2="22" y2="22" stroke="#8d5438" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: "KETO FRIENDLY",
      description: "Perfect for low-carb schedules",
      icon: (
        <svg className="w-8 h-8 text-[#8d5438]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      title: "LOW-CARB",
      description: "Clean macro profile",
      icon: (
        <svg className="w-8 h-8 text-[#8d5438]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 11l2 2 4-4" />
        </svg>
      )
    },
    {
      title: "ALLERGY FRIENDLY",
      description: "Free of main food allergens",
      icon: (
        <svg className="w-8 h-8 text-[#8d5438]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      )
    },
    {
      title: "NO FILLERS",
      description: "Only pure premium inputs",
      icon: (
        <svg className="w-8 h-8 text-[#8d5438]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 5.5h20c0-2-1-4-2.5-5.5L14 11V3h-4v8L4.5 16.5z" />
          <line x1="6" y1="18" x2="18" y2="18" stroke="#8d5438" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-[#FAF7F2]">
      {/* HERO VIDEO SECTION */}
      <section className="relative overflow-hidden min-h-screen border-b-4 border-chomps-black">

        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={heroBannerImg} type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

      </section>

      {/* Sliding loop ticker positioned just below the banner and above the nutrition section */}
      <Marquee />

      {/* 2. NUTRITION YOUR TASTE BUDS WILL UNDERSTAND (Circle claims layer) */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-chomps-black">
        <div className="max-w-7xl mx-auto text-center">
          
          <h2 className="font-display font-black text-4xl sm:text-5.5xl text-chomps-black uppercase tracking-widest leading-none mb-10">
            NUTRITION YOUR TASTE BUDS WILL UNDERSTAND.
          </h2>

          {/* Key claims circular layout */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 sm:gap-8 justify-center select-none">
            {nutritionClaims.map((claim, idx) => (
              <div 
                id={`claim-card-${idx}`}
                key={idx} 
                className="flex flex-col items-center text-center group hover:scale-105 transition-transform"
              >
                {/* Circular ring wrapper */}
                <div className="w-16 h-16 rounded-full border-2 border-[#8d5438] flex items-center justify-center bg-[#FAF7F2] gap-2 mb-3.5 group-hover:border-solid group-hover:bg-[#FFF200]/25 transition-all">
                  {claim.icon}
                </div>
                
                <h4 className="font-display font-black text-sm sm:text-base text-chomps-black uppercase tracking-wider leading-tight">
                  {claim.title}
                </h4>
                <p className="text-[10px] text-gray-400 font-sans font-bold uppercase mt-1 leading-tight">
                  {claim.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. INFINITE RED MARQUEE SCROLL (Verbatim Image 2 bottom strip) */}
      <div className="bg-[#8d5438] py-2 text-center overflow-hidden border-y-2 border-black select-none">
        <div className="whitespace-nowrap flex animate-marquee text-[#FAF7F2] font-sans text-[10px] sm:text-[11px] tracking-widest uppercase font-black items-center gap-12">
          <span>🎯 FIND US IN OVER 51,000 STORES NATIONWIDE! WHERE TO BUY</span>
          <span className="text-[#FFF200] font-black select-none">●</span>
          <span>🔥 SUBSCRIBE & SAVE 10% ON ALL ORDER DELIVERIES NOW!</span>
          <span className="text-[#FFF200] font-black select-none">●</span>
          <span>🌿 GLUTEN FREE & WHEY Fortified</span>
          <span className="text-[#FFF200] font-black select-none">●</span>
          <span> popcorn and premium Superpuffs multigrain chips </span>
          <span className="text-[#FFF200] font-black select-none">●</span>
          <span>🍿 NO SEED OILS OR TOXIC MONOCULTURE INPUTS</span>
          <span className="text-[#FFF200] font-black select-none">●</span>
          <span>🎯 FIND US IN OVER 51,000 STORES NATIONWIDE! WHERE TO BUY</span>
          <span className="text-[#FFF200] font-black select-none">●</span>
          <span>🔥 SUBSCRIBE & SAVE 10% ON ALL ORDER DELIVERIES NOW!</span>
          <span className="text-[#FFF200] font-black select-none">●</span>
        </div>
      </div>
    </div>
  );
}
