import React from 'react';
import { motion } from 'framer-motion'; // Ensuring Framer Motion imports are active for variants
// Packets
import ragiPacket from "../assets/packets/Ragi_chips.png";
import periPacket from "../assets/packets/ragi_chips_peri_peri.png";
import tomatoPacket from "../assets/packets/spanish_tomato.png";

// Product Images
import CreamOnion from "../assets/images/cream onion.png";
import HotandChili from "../assets/images/Hot and chilli.png";
import IndieMasala from "../assets/images/indie masala.png";
import PeriPeri from "../assets/images/Peri peri.png";
import RagiChips from "../assets/images/Ragi chips.png";
import RagiChipsPeriPeri from "../assets/images/ragi chips peri peri.png";
import SpanishTomato from "../assets/images/spanish tomato.png";

//canisters
import BEETROOT from "../assets/canisters/BEETROOT CHIPS.png";
import Creaam from "../assets/canisters/cream and onion.png";
import HIMALYAN from "../assets/canisters/HIMALAYAN SALT.png";
import mint from "../assets/canisters/mint can.png";
import OATS from "../assets/canisters/OATS CHIPS.png";
import peri from "../assets/canisters/peri peri can.png";
import RAGI from "../assets/canisters/RAGI CHIPS can.png";
import TANDOORI from "../assets/canisters/TANDOORI.png";




// Adding hypothetical missing imports based on your category section
import oatsPacket from "../assets/packets/Ragi_chips.png"; 
import quinoaPacket from "../assets/packets/Ragi_chips.png";

interface ChipPacketProps {
  type: string;
  className?: string;
  animate?: boolean;
}

export default function ChipPacket({ type, className = "h-64 w-full", animate = true }: ChipPacketProps) {
  const containerVariants = {
    hover: { 
      y: -10,
      scale: 1.03,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const floatingChips = {
    animate: {
      y: [0, -6, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const renderContent = () => {
    // Detects URL, Base64, or asset paths dynamically
    if (type && (type.startsWith('http') || type.startsWith('data:') || type.includes('/') || type.includes('.'))) {
      return (
        <div className="w-full h-full flex items-center justify-center p-2 overflow-hidden">
          <img 
            src={type} 
            alt="Snack Packet" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" // Changed from object-cover to object-contain for a fix & fit layout
          />
        </div>
      );
    }

    switch (type) {
case 'red-tomato':
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <img
        src={SpanishTomato}
        alt="Spanish Tomato"
        className="w-full h-full object-cover"
      />
    </div>
  );
case 'ragi-bag':
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <img
        src={RagiChips}
        alt="Ragi Chips"
        className="w-full h-full object-cover"
      />
    </div>
  );
case 'ragi-peri-jar':
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <img
        src={RagiChipsPeriPeri}
        alt="Ragi Chips Peri Peri"
        className="w-full h-full object-contain"
      />
    </div>
  );
case 'green-onion':
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <img
        src={CreamOnion}
        alt="Cream Onion"
        className="w-full h-full object-contain"
      />
    </div>
  );
      case 'quinoa-jar':
        return (
          <svg className="w-full h-full" viewBox="0 0 240 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="quinoa-body" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#115E59" />
                <stop offset="50%" stopColor="#14B8A6" />
                <stop offset="100%" stopColor="#115E59" />
              </linearGradient>
            </defs>
            <rect x="50" y="20" width="140" height="25" rx="4" fill="#0F766E" stroke="#115E59" />
            <rect x="40" y="45" width="160" height="225" rx="10" fill="url(#quinoa-body)" />
            <rect x="55" y="100" width="130" height="90" fill="white" opacity="0.92" rx="4" />
            <text x="120" y="130" fontFamily="var(--font-display)" fontWeight="bold" fontSize="18" fill="#0F766E" textAnchor="middle">twirtles</text>
            <text x="120" y="145" fontFamily="sans-serif" fontSize="8" fill="#134E4A" textAnchor="middle">PREMIUM SOUR CREAM</text>
            <text x="120" y="165" fontFamily="var(--font-display)" fontWeight="800" fontSize="13" fill="#115E59" textAnchor="middle">QUINOA CHIPS</text>
            <line x1="65" y1="175" x2="175" y2="175" stroke="#14B8A6" strokeWidth="2" />
            <circle cx="120" cy="225" r="24" fill="#14B8A6" opacity="0.2" />
            <polygon points="120,210 124,220 134,220 126,226 129,236 120,230 111,236 114,226 106,220 116,220" fill="#F59E0B" />
          </svg>
        );

      case 'oats-bag':
        return (
          <svg className="w-full h-full" viewBox="0 0 240 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="oats-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>
            </defs>
            <path d="M25 35 L 215 35 L 205 270 L 35 270 Z" fill="url(#oats-grad)" stroke="#1F0E05" strokeWidth="3" />
            <rect x="20" y="28" width="200" height="10" fill="#1F0E05" rx="1" />
            <g transform="translate(120, 75)">
              <text x="0" y="0" fontFamily="var(--font-display)" fontWeight="800" fontSize="23" fill="#FBBF24" textAnchor="middle">twirtles</text>
              <text x="0" y="16" fontFamily="sans-serif" fontSize="10" fill="#FEF3C7" textAnchor="middle" letterSpacing="0.05em">ROASTED OATS CHIPS</text>
            </g>
            <ellipse cx="120" cy="170" rx="45" ry="32" fill="#311303" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="100" cy="165" r="3" fill="#FCD34D" />
            <circle cx="135" cy="175" r="4" fill="#F59E0B" />
            <circle cx="115" cy="180" r="3.5" fill="#FCD34D" />
            <text x="120" y="228" fontFamily="sans-serif" fontWeight="bold" fontSize="10" fill="#FEF3C7" textAnchor="middle">PERI PERI SPICED</text>
          </svg>
        );

case 'makhana-can-cream':
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <img
        src={CreamOnion}
        alt="Cream Onion"
        className="w-full h-full object-contain"
      />
    </div>
  );
      case 'makhana-can-salt':
        return (
          <svg className="w-full h-full filter drop-shadow-md" viewBox="0 0 240 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="salt-grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0B3C4B" />
                <stop offset="45%" stopColor="#125F75" />
                <stop offset="55%" stopColor="#125F75" />
                <stop offset="100%" stopColor="#042129" />
              </linearGradient>
            </defs>
            <rect x="64" y="20" width="112" height="260" rx="14" fill="url(#salt-grad2)" stroke="#03151A" strokeWidth="2.5" />
            
            <rect x="61" y="42" width="118" height="6" fill="#E5E7EB" rx="1.5" stroke="#9CA3AF" strokeWidth="0.5" />
            <rect x="61" y="254" width="118" height="6" fill="#E5E7EB" rx="1.5" stroke="#9CA3AF" strokeWidth="0.5" />
            <rect x="74" y="22" width="12" height="256" fill="white" fillOpacity="0.12" />

            <g transform="translate(120, 68)">
              <text x="0" y="0" fontFamily="var(--font-display)" fontWeight="900" fontSize="11" fill="#FEF3C7" textAnchor="middle" letterSpacing="0.1em">TWIRTLES</text>
            </g>

            <rect x="69" y="84" width="102" height="118" fill="white" rx="4" stroke="#125F75" strokeWidth="1" />
            <text x="120" y="105" fontFamily="var(--font-display)" fontWeight="900" fontSize="13" fill="#125F75" textAnchor="middle" letterSpacing="0.05em">twirtles</text>
            <rect x="85" y="112" width="70" height="1" fill="#125F75" />
            
            <text x="120" y="128" fontFamily="sans-serif" fontWeight="900" fontSize="7.2" fill="#125F75" textAnchor="middle" letterSpacing="0.02em">HIMALAYAN SALT</text>
            <text x="120" y="137" fontFamily="sans-serif" fontWeight="800" fontSize="6.5" fill="#0891B2" textAnchor="middle">MAKHANA</text>
            
            <g transform="translate(120, 164)">
              <polygon points="-20,12 -5,-3 10,12" fill="#0F4C5C" opacity="0.3" />
              <polygon points="-8,12 8,-7 22,12" fill="#125F75" opacity="0.4" />
              <polygon points="-8,12 0,2 8,12" fill="#E0F2FE" />
              <polygon points="-14,14 -4,8 4,14 -6,18" fill="#FCA5A5" stroke="#EF4444" strokeWidth="0.5" />
              <circle cx="12" cy="11" r="7" fill="#FAF9F6" stroke="#D1D5DB" strokeWidth="0.5" />
              <circle cx="12" cy="11" r="1.5" fill="#AF8A56" />
            </g>

            <rect x="84" y="210" width="72" height="13" fill="#ECFDF5" rx="2" stroke="#125F75" strokeWidth="0.8" />
            <text x="120" y="219" fontFamily="sans-serif" fontWeight="bold" fontSize="6" fill="#125F75" textAnchor="middle">NO PALM OIL ROASTED</text>

            <text x="120" y="242" fontFamily="sans-serif" fontSize="6.5" fill="white" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">9 MINERALS • TRANS FAT FREE</text>
          </svg>
        );

case 'makhana-can-mint':
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <img
        src={IndieMasala}
        alt="Mint"
        className="w-full h-full object-contain"
      />
    </div>
  );
case 'makhana-can-peri':
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <img
        src={PeriPeri}
        alt="Peri Peri"
        className="w-full h-full object-contain"
      />
    </div>
  );
      case 'makhana-can-tandoori':
        return (
          <svg className="w-full h-full filter drop-shadow-md" viewBox="0 0 240 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="tandoor-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1C0E07" />
                <stop offset="45%" stopColor="#C2410C" />
                <stop offset="55%" stopColor="#C2410C" />
                <stop offset="100%" stopColor="#0B0502" />
              </linearGradient>
            </defs>
            <rect x="64" y="20" width="112" height="260" rx="14" fill="url(#tandoor-grad)" stroke="#110702" strokeWidth="2.5" />
            
            <rect x="61" y="42" width="118" height="6" fill="#E5E7EB" rx="1.5" stroke="#9CA3AF" strokeWidth="0.5" />
            <rect x="61" y="254" width="118" height="6" fill="#E5E7EB" rx="1.5" stroke="#9CA3AF" strokeWidth="0.5" />
            <rect x="74" y="22" width="12" height="256" fill="white" fillOpacity="0.12" />

            <g transform="translate(120, 68)">
              <text x="0" y="0" fontFamily="var(--font-display)" fontWeight="900" fontSize="11" fill="#FEF3C7" textAnchor="middle" letterSpacing="0.1em">TWIRTLES</text>
            </g>

            <rect x="69" y="84" width="102" height="118" fill="white" rx="4" stroke="#C2410C" strokeWidth="1" />
            <text x="120" y="105" fontFamily="var(--font-display)" fontWeight="900" fontSize="13" fill="#C2410C" textAnchor="middle" letterSpacing="0.05em">twirtles</text>
            <rect x="85" y="112" width="70" height="1" fill="#C2410C" />
            
            <text x="120" y="128" fontFamily="sans-serif" fontWeight="900" fontSize="8.5" fill="#451A03" textAnchor="middle" letterSpacing="0.02em">TANDOORI HEAT</text>
            <text x="120" y="137" fontFamily="sans-serif" fontWeight="800" fontSize="6.5" fill="#C2410C" textAnchor="middle">MAKHANA</text>
            
            <g transform="translate(120, 164)">
              <path d="M-8,14 C-10,4, -4,0, 0,8 C4,0, 10,4, 8,14 Z" fill="#EA580C" stroke="#ea580c" strokeWidth="0.5" />
              <path d="M-4,14 C-6,7, -2,3, 0,9 C2,3, 6,7, 4,14 Z" fill="#FBBF24" />
              <circle cx="-11" cy="11" r="5" fill="#FAF9F6" stroke="#D1D5DB" strokeWidth="0.5" />
              <circle cx="11" cy="11" r="5" fill="#FAF9F6" stroke="#D1D5DB" strokeWidth="0.5" />
            </g>

            <rect x="84" y="210" width="72" height="13" fill="#FFF2E8" rx="2" stroke="#C2410C" strokeWidth="0.8" />
            <text x="120" y="219" fontFamily="sans-serif" fontWeight="bold" fontSize="6" fill="#C2410C" textAnchor="middle">NO PALM OIL ROASTED</text>

            <text x="120" y="242" fontFamily="sans-serif" fontSize="6.5" fill="white" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">SMOKY & CRUNCHY • baked</text>
          </svg>
        );

case 'makhana-can-combo':
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <img
        src={RagiChips}
        alt="Makhana Combo Pack"
        className="w-full h-full object-contain"
      />
    </div>
  );

case 'beetroot-bag':
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <img
        src={HotandChili}
        alt="Beetroot Chips"
        className="w-full h-full object-contain"
      />
    </div>
  );
  
  // CATEGORY ICONS
      case 'superpuffs-cat':
        return (
          <div className="w-full h-40 flex items-center justify-center relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-red-800/20 blur-xl" />
            <div className="h-28 w-24 relative scale-90">
              <ChipPacket type={tomatoPacket} animate={false} />
            </div>
            <div className="absolute top-4 left-6 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center opacity-80 border border-red-700 animate-bounce">
              <div className="w-3 h-3 rounded-full bg-red-400" />
            </div>
          </div>
        );
      case 'ragi-cat':
        return (
          <div className="w-full h-40 flex items-center justify-center relative overflow-hidden">
            <div className="h-28 w-24 scale-90">
              <ChipPacket type={ragiPacket} animate={false} />
            </div>
          </div>
        );
      case 'quinoa-cat':
        return (
          <div className="w-full h-40 flex items-center justify-center relative overflow-hidden">
            <div className="h-28 w-20 scale-90">
              <ChipPacket type={quinoaPacket} animate={false} />
            </div>
          </div>
        );
      case 'oats-cat':
        return (
          <div className="w-full h-40 flex items-center justify-center relative overflow-hidden">
            <div className="h-28 w-24 scale-90">
              <ChipPacket type={oatsPacket} animate={false} />
            </div>
          </div>
        );
case 'makhana-cat':
  return (
    <div className="w-full h-40 flex items-center justify-center">
      <img
        src={CreamOnion}
        alt="Makhana"
        className="h-full object-contain"
      />
    </div>
  );
  case 'beetroot-cat':
  return (
    <div className="w-full h-40 flex items-center justify-center">
      <img
        src={HotandChili}
        alt="Beetroot"
        className="h-full object-contain"
      />
    </div>
  );
      default:
        return (
          <div className="h-full w-full bg-amber-100 flex items-center justify-center text-amber-900 rounded font-bold text-lg">
            TWIRTLES
          </div>
        );
    }
  };

  if (!animate) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        {renderContent()}
      </div>
    );
  }

  return (
    <motion.div
      className={`${className} cursor-pointer flex items-center justify-center relative`}
      variants={containerVariants}
      whileHover="hover"
    >
      {renderContent()}
      
      <motion.div 
        className="absolute w-4 h-4 bg-amber-400 rounded-sm pointer-events-none"
        style={{ top: '65%', left: '15%' }}
        variants={floatingChips}
        animate="animate"
      />
      <motion.div 
        className="absolute w-3 h-3 bg-amber-500 rounded-xs pointer-events-none"
        style={{ top: '40%', right: '12%' }}
        variants={floatingChips}
        animate="animate"
      />
    </motion.div>
  );
}