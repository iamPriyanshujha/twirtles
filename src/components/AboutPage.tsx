import React, { useState } from 'react';
import arjun from "../assets/images/arjun.png";
import pawan from "../assets/images/pawan.png";
import { motion } from 'motion/react';

import { 
  Heart, 
  Sparkle, 
  Leaf, 
  ShieldCheck, 
  Smile, 
  Flame,
  Award, 
  Milestone, 
  Instagram, 
  ArrowRight,
  TrendingUp,
  Zap,
  Droplet,
  Bolt,
  Sun,
  Activity,
  Check,
  Play,
  Camera
} from 'lucide-react';
import TwirtlesLogo from './TwirtlesLogo';
import FAQ from './FAQ';
import FeaturedIn from './FeaturedIn';
interface AboutPageProps {
  setView: (view: 'home' | 'cart' | 'checkout' | 'account' | 'wishlist' | 'about' | 'admin') => void;
}

export default function AboutPage({ setView }: AboutPageProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);


  

  const founders = [
    {
      name: "Arjun Veer Singh",
      image: "/src/assets/images/arjun.png",
      desc: "Pioneering honest, clean-label snacking across our modern baked superfood range."
    },
    {
      name: "Pawanjot Singh Kohli",
      image: "/src/assets/images/pawan.png",
      desc: "Perfecting high-tech convection baking methods to puff snacks without a single-drop of frying."
    }
  ];

  const values = [
    {
      icon: <Flame className="w-6 h-6 text-orange-500 fill-orange-100 animate-pulse" />,
      title: "100% Baked, Never Fried",
      description: "We use sophisticated dry-air convection baking tech to puff our snacks. Zero high-temp boiling oils means zero carcinogens and pure, light crispiness."
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-650 fill-emerald-50" />,
      title: "No Inﬂammatory Seed Oils",
      description: "No palm oil, palm olein, canola oil, cotton-seed oil, or sunflower oil. We use clean cold-pressed oils or dry puffing to keep your gut healthy and arteries happy!"
    },
    {
      icon: <Award className="w-6 h-6 text-[#8d5438]" />,
      title: "Premium Indian Supergrains",
      description: "We replaced cheap cornstarch and refined wheat (maida) with rich ancient supergrains: premium Makhana (foxnuts), Ragi (finger millet), Quinoa, Oats, and high-protein Beetroot mash."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600 fill-blue-50" />,
      title: "Clean Labels Only",
      description: "No artificial MSG, no chemical preservatives, no cheap colors or lab-brewed artificial flavoring. Real herbs and spices sourced directly from native spice fields."
    }
  ];

  const storyTimeline = [
    {
      year: "2024",
      title: "The Seed Oil Realization",
      desc: "Our founders realized that 99% of snacking options in Indian supermarkets are packed with refined palm oil or deep-fried in inflammatory fats under 'healthy' labels. We pledged to build a snacks brand that is honest down to the final ingredient."
    },
    {
      year: "2025",
      title: "Perfecting the Puffing Tech",
      desc: "We engineered proprietary convection heat-puffs that lock in absolute crispiness without using single-drop frying methods. Our test batches of Makhana & Millet packs became home favorites."
    },
    {
      year: "2026",
      title: "Serving Looks & Snacks",
      desc: "Twirtles went live nationwide, distributing cleanly-sourced, gourmet millet canisters & packs to conscious snackers. Today, over 4,500 active retail shelves stock our products."
    }
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-black select-none font-food">
      
      {/* 1. HERO STORY BRAND HEADER */}
      <section className="relative overflow-hidden py-24 md:py-32 border-b-4 border-black bg-[#ffcad0]/10">
        {/* Abstract decorative floating graphics for retro touch */}
        <div className="absolute top-10 left-[8%] bg-[#8d5438] text-white font-food-space text-[10px] sm:text-xs font-black px-4 py-2 uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3 hidden sm:block">
          100% CLEAN LABEL 🌿
        </div>
        <div className="absolute bottom-12 right-[6%] bg-chomps-yellow text-black font-food-space text-[10px] sm:text-xs font-black px-4 py-2 uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-6 hidden sm:block">
          BAKED WITH LOVE 🐢
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="text-[#8d5438] font-food-space text-xs sm:text-sm font-black tracking-widest uppercase mb-4 bg-white px-4 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              ABOUT OUR CO-OP
            </span>
            
            <h1 className="font-food-heavy font-normal text-6xl sm:text-8xl md:text-9xl lg:text-[7rem] text-black leading-[0.95] uppercase tracking-wide mb-8 drop-shadow-[3px_3px_0px_rgba(255,242,0,1)]">
              MEET <span className="text-[#8d5438]">TWIRTLES</span>
            </h1>

            <div className="w-full max-w-sm bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] my-6 transform hover:rotate-2 transition-transform duration-300">
              <TwirtlesLogo className="h-16 w-auto mx-auto" />
            </div>

            <p className="font-food font-medium text-gray-800 text-lg sm:text-2xl leading-relaxed max-w-4xl mt-6 px-4">
              Twirtles was born out of a simple yet powerful idea: to transform the way we snack. In a world where convenience often comes at the cost of nutrition, we set out to create snacks that are both ridiculously tasty, clean, and honestly healthy.
            </p>
          </motion.div>
        </div>
      </section>

    
      {/* 4.5 THE SUPERPUFFS HEALTH & NUTRITION STORY SECTION */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-[#F5EBE0]">
        <div className="max-w-4xl mx-auto bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden p-6 sm:p-10 md:p-14">
          
          <div className="flex items-center gap-1.5 text-xs text-[#8d5438] font-food-space font-black uppercase tracking-widest mb-6">
            <span>About</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8d5438]/40"></span>
            <span className="bg-orange-100 text-[#8d5438] px-2 py-0.5 border border-[#8d5438]/20 rounded text-[10px]">The Superpuffs Story</span>
          </div>

          <h2 className="font-food-heavy text-4xl sm:text-6xl md:text-7xl leading-[1.05] uppercase tracking-normal text-black mb-6 max-w-2xl">
            When snacking finally grew up
          </h2>
          
          <p className="text-lg sm:text-2.5xl text-gray-755 font-food font-semibold leading-relaxed mb-12 max-w-2xl">
            India's first protein chips, fortified for the deficiencies most of us are quietly living with.
          </p>

          {/* Three pillars grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14 text-left">
            <div className="bg-[#FAF7F2] border-2 border-black p-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center border-2 border-black mb-4 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                <Bolt className="w-5 h-5 text-orange-600 fill-orange-200" />
              </div>
              <h4 className="font-food-heavy font-normal text-lg uppercase tracking-wide text-black mb-2">Protein first</h4>
              <p className="text-xs sm:text-sm text-gray-600 font-food font-medium leading-relaxed">
                Built on a protein-dense grain base, rather than sprinkled onto a processed potato chip.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border-2 border-black p-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center border-2 border-black mb-4 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                <Droplet className="w-5 h-5 text-blue-600 fill-blue-200" />
              </div>
              <h4 className="font-food-heavy font-normal text-lg uppercase tracking-wide text-black mb-2">Fortified for India</h4>
              <p className="text-xs sm:text-sm text-gray-600 font-food font-medium leading-relaxed">
                Iron, Vitamin D3, and Vitamin B12, precisely mapped against national clinical deficiency data.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border-2 border-black p-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center border-2 border-black mb-4 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                <Sparkle className="w-5 h-5 text-emerald-600 fill-emerald-200" />
              </div>
              <h4 className="font-food-heavy font-normal text-lg uppercase tracking-wide text-black mb-2">Still a chip</h4>
              <p className="text-xs sm:text-sm text-gray-600 font-food font-medium leading-relaxed">
                Functional daily nutrition delivered in the crispy, crunchy format people already love reaching for.
              </p>
            </div>
          </div>

          {/* Deficiency gap headers */}
          <div className="border-t-2 border-black/10 pt-10 mb-8 text-left">
            <h3 className="font-food-heavy text-2.5xl sm:text-3xl uppercase tracking-wide text-black mb-2">
              The deficiency gap
            </h3>
            <p className="text-sm text-gray-500 font-food font-semibold">
              What the data shows India is missing, and what's fortified into every pack
            </p>
          </div>

          {/* Table / rows */}
          <div className="space-y-4 border-b-2 border-black/10 pb-10 mb-10 text-left">
            {/* Row 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-gray-100 hover:bg-gray-50/50 px-2 transition-all rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center border-2 border-black text-[#993C1D] shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-food-heavy text-base text-black uppercase tracking-wide">Iron deficiency anaemia</h4>
                  <p className="text-xs text-gray-400 font-semibold font-food-space">NFHS-5, women aged 15 to 49</p>
                </div>
              </div>
              <div className="flex items-center gap-6 justify-between sm:justify-end">
                <span className="font-food-heavy text-2xl md:text-3xl text-[#993C1D]">57%</span>
                <span className="inline-flex items-center gap-1.5 bg-[#E1F5EE] text-[#085041] px-3 py-1 border-2 border-black text-xs font-food-space font-black uppercase tracking-wider rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none">
                  <Check className="w-3.5 h-3.5 stroke-[4]" /> Iron
                </span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-gray-100 hover:bg-gray-50/50 px-2 transition-all rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-yellow-50 flex items-center justify-center border-2 border-black text-yellow-600 shrink-0">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-food-heavy text-base text-black uppercase tracking-wide">Vitamin D deficiency</h4>
                  <p className="text-xs text-gray-400 font-semibold font-food-space">Metropolis Healthcare, 2023 to 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-6 justify-between sm:justify-end">
                <span className="font-food-heavy text-2xl md:text-3xl text-[#993C1D]">46%</span>
                <span className="inline-flex items-center gap-1.5 bg-[#E1F5EE] text-[#085041] px-3 py-1 border-2 border-black text-xs font-food-space font-black uppercase tracking-wider rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none">
                  <Check className="w-3.5 h-3.5 stroke-[4]" /> Vitamin D
                </span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 hover:bg-gray-50/50 px-2 transition-all rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center border-2 border-black text-indigo-600 shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-food-heavy text-base text-black uppercase tracking-wide">Vitamin B12 deficiency</h4>
                  <p className="text-xs text-gray-400 font-semibold font-food-space">Pooled Indian studies, 2025 meta-analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-6 justify-between sm:justify-end">
                <span className="font-food-heavy text-2xl md:text-3xl text-[#993C1D]">51%</span>
                <span className="inline-flex items-center gap-1.5 bg-[#E1F5EE] text-[#085041] px-3 py-1 border-2 border-black text-xs font-food-space font-black uppercase tracking-wider rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none">
                  <Check className="w-3.5 h-3.5 stroke-[4]" /> B12
                </span>
              </div>
            </div>
          </div>

          {/* Media / Seen On strip */}
          <div className="text-left">
            <div className="flex items-center gap-3.5 flex-wrap mb-5">
              <span className="text-xs text-gray-500 font-food-space uppercase tracking-widest font-black">As seen on</span>
              <span className="bg-[#8d5438] text-white text-[11px] font-food-space font-black uppercase tracking-wide px-3.5 py-1.5 border-2 border-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] rounded">
                CNBC-TV18
              </span>
            </div>

            <p className="font-food text-gray-700 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl font-medium">
              Launched alongside Padma Shri Dr Arvind Lal, built around a simple question: why should snacking and nutrition sit on opposite sides of the aisle.
            </p>

            {/* Display / video mockup frames with thin dashed borders */}
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="aspect-[4/3] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all shadow-sm">
                <Camera className="w-6 h-6 stroke-1.5" />
              </div>
              <div className="aspect-[4/3] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all shadow-sm">
                <Camera className="w-6 h-6 stroke-1.5" />
              </div>
              <div className="aspect-[4/3] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all shadow-sm transform relative group overflow-hidden">
                <Play className="w-7 h-7 text-[#8d5438] fill-[#8d5438]/20 group-hover:scale-110 transition-transform duration-200 z-10" />
                <div className="absolute inset-0 bg-[#8d5438]/5 group-hover:bg-[#8d5438]/10 transition-colors" />
              </div>
            </div>
            <p className="text-xs text-gray-400 font-food-space font-bold uppercase tracking-wider">
              Launch event, New Delhi · CNBC feature clip
            </p>
          </div>

        </div>
      </section>

      {/* 5. CO-FOUNDERS SECTION */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-[#351D14] text-white">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Header Row */}
          <div className="text-center mb-16 w-full max-w-5xl">
            <span className="block font-food-space text-sm sm:text-base font-black tracking-widest uppercase mb-3 text-[#ffcad0]">
              MEET THE
            </span>
            <h2 className="font-food-heavy text-5xl sm:text-7xl lg:text-[5rem] leading-[0.95] uppercase tracking-normal text-white">
              CO-FOUNDERS
            </h2>
          </div>

          {/* Co-founders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
            {founders.map((f, i) => (
              <div 
                key={i}
                className="bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden transform hover:-translate-y-1 hover:shadow-[14px_14px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
              >
                {/* Image Area */}
                <div className="w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden relative border-b-4 border-black">
                  <img 
                    src={f.image} 
                    alt={f.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info Area */}
                <div className="bg-white py-6 px-5 text-center flex flex-col items-center">
                  <h3 className="font-food-heavy font-normal text-2xl sm:text-3xl text-black uppercase tracking-wide mb-3">
                    {f.name}
                  </h3>
                  
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    
          
        



      {/* 4. OUR MILESTONES TIMELINE */}
      <section >
        <div >
          
          
                
  
    

{/* 4.5 FEATURED IN CAROUSEL SECTION */}
      <FeaturedIn/>
             
        </div>
      </section>

      {/* 5.5 FAQ SECTION (Same highly polished FAQs on About Page) */}
      <FAQ />

      {/* 6. CALL TO ACTION FOR SHOPPING */}
     
    </div>
  );
}
