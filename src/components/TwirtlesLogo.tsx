import React from 'react';
import Logo from '../assets/images/logo.png';

interface TwirtlesLogoProps {
  className?: string;
}

export default function TwirtlesLogo({ 
  className = "h-16 w-auto" 
}: TwirtlesLogoProps) {
  return (
    <div className="bg-transparent inline-flex items-center justify-center overflow-hidden mix-blend-multiply">
      <img 
        src={Logo} 
        alt="Twirtles Logo" 
        className={`${className} bg-transparent object-contain mix-blend-multiply select-none clear-both`} 
        draggable={false} 
      />
    </div>
  );
}
