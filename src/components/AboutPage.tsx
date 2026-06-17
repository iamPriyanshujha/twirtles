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
  Zap
} from 'lucide-react';
import TwirtlesLogo from './TwirtlesLogo';
import FAQ from './FAQ';

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
                  <p className="text-sm sm:text-base text-gray-700 font-food font-medium leading-relaxed max-w-sm">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE WELCOME TO TWIRTLES STORY SECTION */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Block: Twirtles Brand Mascot/Graphics representation */}
          <div className="bg-[#FAF7F2] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col items-center text-center relative rounded-xl h-full justify-center">
            <div className="absolute top-4 left-4 bg-[#8d5438] text-white text-[10px] font-food-space tracking-widest uppercase py-1 px-3 border border-black">
              ORIGIN STORY
            </div>

            {/* Giant Graphic Circle */}
            <div className="w-48 h-48 rounded-full border-4 border-black bg-[#ffcad0] flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] my-8 relative overflow-hidden group">
              <span className="text-7xl animate-bounce">🐢</span>
              <div className="absolute inset-0 bg-[#8d5438]/10 group-hover:bg-transparent transition-colors duration-200" />
            </div>

            <h3 className="font-food-heavy font-normal text-3xl uppercase tracking-wide text-black mb-2">
              Yum & Vitality Wrapped in One
            </h3>
            <p className="font-food-space font-bold text-xs uppercase tracking-wider text-gray-400">
              CRAFTED BY CONSCIOUS SNACKISTS DEEP IN INDIA
            </p>
          </div>

          {/* Right Block: Pure Content verbatim style */}
          <div className="flex flex-col items-start text-left">
            <span className="text-[#8d5438] font-food-space text-sm font-black tracking-widest uppercase mb-2">
              ABOUT US
            </span>
            <h2 className="font-food-heavy font-normal text-5xl sm:text-7xl lg:text-[5.5rem] text-black leading-[0.95] uppercase tracking-normal mb-8 relative">
              Welcome to Twirtles
              <span className="absolute left-0 bottom-1.5 h-3 w-48 bg-[#ffcad0]" />
            </h2>

            <p className="font-food font-medium text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
              We are proud to present a diverse range of healthy and delicious snacks designed to satisfy your cravings while nourishing your body. Our products are made from high-quality ingredients and come in a variety of exciting flavors to cater to every taste preference. Here's a look at what we offer:
            </p>

            <h3 className="font-food-heavy font-normal text-4xl text-black uppercase tracking-normal mb-6">
              What We Offer
            </h3>

            <div className="space-y-4.5 w-full">
              <div className="flex items-start gap-4 p-5 bg-[#FAF7F2] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-3xl mt-0.5">🍿</span>
                <div>
                  <h4 className="font-food-heavy font-normal text-xl uppercase text-[#8d5438] tracking-wide mb-1">Gourmet Roasted Makhanas</h4>
                  <p className="text-sm text-gray-600 font-food font-medium leading-relaxed">
                    Premium foxnuts slow-puffed and covered in real herbs, with zero artificial ingredients.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-[#FAF7F2] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-3xl mt-0.5">📦</span>
                <div>
                  <h4 className="font-food-heavy font-normal text-xl uppercase text-[#8d5438] tracking-wide mb-1">Crispy Superfood Millet Packs</h4>
                  <p className="text-sm text-gray-600 font-food font-medium leading-relaxed">
                    Pure ragi, oats, quinoa, and beetroot dry-baked loops with massive fibers.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. INGREDIENT & PHILOSOPHY VALUES */}
      <section className="bg-chomps-cream/40 py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <span className="text-[#8d5438] font-food-space text-sm font-black tracking-widest uppercase mb-2">
            HOW WE COOK
          </span>
          <h2 className="font-food-heavy font-normal text-5xl sm:text-7xl lg:text-[5rem] text-black uppercase tracking-normal mb-14 text-center leading-[0.95]">
            Twirtles Golden Core Pillars
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
            {values.map((v, i) => (
              <div 
                key={i} 
                className="bg-white border-2 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 bg-gray-50 border-2 border-black inline-block mb-4">
                    {v.icon}
                  </div>
                  <h4 className="font-food-heavy font-normal text-2xl uppercase tracking-wide text-black mb-3">
                    {v.title}
                  </h4>
                  <p className="text-sm text-gray-650 font-food font-medium leading-relaxed">
                    {v.description}
                  </p>
                </div>
                <div className="mt-6 border-t border-black/10 pt-4 flex items-center justify-between text-[10px] font-food-space font-bold uppercase text-gray-450">
                  <span>PILLAR {i + 1}</span>
                  <span className="text-emerald-600 font-black">ACTIVE • Certified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR MILESTONES TIMELINE */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b-4 border-black">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-[#8d5438] font-food-space text-sm font-black tracking-widest uppercase mb-2">
            THE TIMELINE
          </span>
          <h2 className="font-food-heavy font-normal text-5xl sm:text-7xl lg:text-[5rem] text-black uppercase tracking-normal mb-16 text-center leading-[0.95]">
            How The Shell Rolled High
          </h2>

          <div className="relative border-l-4 border-black pl-8 md:pl-12 space-y-12 text-left">
            {storyTimeline.map((item, index) => (
              <div key={index} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[48px] md:-left-[64px] top-1.5 w-9 h-9 rounded-full border-4 border-black bg-chomps-yellow flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-xs font-food-heavy font-normal text-black">{index + 1}</span>
                </div>

                <div className="bg-[#FAF7F2] border-2 border-black p-6 shadow-[5px_5px_0px_0px_rgba(141,84,56,0.25)] hover:shadow-[8px_8px_0px_0px_rgba(141,84,56,0.45)] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 border-b pb-2.5 border-dashed border-gray-300">
                    <h3 className="font-food-heavy font-normal text-2xl text-[#8d5438] uppercase tracking-wide select-none">
                      {item.title}
                    </h3>
                    <span className="bg-[#ffcad0] text-[10px] font-food-space font-black text-black px-4 py-1.5 uppercase tracking-widest select-none border-2 border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] rounded-sm">
                      YEAR {item.year}
                    </span>
                  </div>
                  <p className="text-sm text-gray-650 font-food font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 FAQ SECTION (Same highly polished FAQs on About Page) */}
      <FAQ />

      {/* 6. CALL TO ACTION FOR SHOPPING */}
      <section className="bg-chomps-yellow py-20 px-4 text-center border-b-4 border-black">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-[#351D14] font-food-space text-sm sm:text-base font-black tracking-widest uppercase mb-2">
            STOMACH IS GROWLING?
          </span>
          <h2 className="font-food-heavy font-normal text-5xl sm:text-7xl text-black leading-none uppercase tracking-normal mb-8">
            Get 10% Off Your First Bag!
          </h2>
          <p className="font-food font-medium text-gray-700 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
            Treat your tastebuds and gut to premium roasted Makhana canisters and baked supergrain crunch packs.
          </p>

          <div className="flex flex-col items-center gap-4.5 w-full">
            <div className="flex flex-wrap gap-4.5 justify-center">
              <button
                onClick={() => setView('home')}
                className="bg-[#8d5438] hover:bg-[#723F27] text-white border-2 border-black font-food-heavy font-normal text-base uppercase px-8 py-4 px-10 hover:translate-y-0.5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer rounded-full tracking-wider inline-flex items-center gap-2"
              >
                SHOP NEW DROPS
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => setIsSubscribed(true)}
                disabled={isSubscribed}
                className={`border-2 border-black font-food-heavy font-normal text-base uppercase px-8 py-4 px-10 hover:translate-y-0.5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer rounded-full tracking-wider inline-flex items-center gap-2 ${
                  isSubscribed 
                    ? 'bg-emerald-600 text-white cursor-not-allowed border-emerald-700 shadow-none hover:translate-y-0' 
                    : 'bg-white hover:bg-gray-100 text-black'
                }`}
              >
                {isSubscribed ? 'SUBSCRIBED!' : 'SUBSCRIBE TO NEWSLETTER'}
                <Zap className={`w-5 h-5 ${isSubscribed ? 'text-white' : 'animate-bounce'}`} />
              </button>
            </div>
            
            {isSubscribed && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-[#FAF7F2] border-2 border-dashed border-[#8d5438] p-4 text-[#351D14] uppercase font-food font-bold text-sm tracking-wider max-w-md shadow-sm"
              >
                🎉 Twirtles Newsletter: Succeeded with "{localStorage.getItem('twirtles_user_email') || 'your account email'}"! Use Coupon <span className="bg-[#FFF200] px-1 font-bold text-black border border-black">FREE10</span> for 10% Off.
              </motion.div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
