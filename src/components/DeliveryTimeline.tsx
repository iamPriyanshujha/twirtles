import React, { useMemo, useState, useEffect } from 'react';
import { Bike, MapPin, Navigation, Clock, AlertTriangle } from 'lucide-react';

interface DeliveryTimelineProps {
  orderStatus: string;
  pinCode: string;
  city?: string;
}

export default function DeliveryTimeline({ orderStatus, pinCode, city = 'Noida' }: DeliveryTimelineProps) {
  // Convert shipping destination pincode into Noida central coordinates matching simulated distance
  const { distanceKm, estHours, routeString } = useMemo(() => {
    const defaultPin = 201301; // Noida Hub
    const userPin = parseInt(pinCode.replace(/\D/g, '')) || defaultPin;
    const diff = Math.abs(userPin - defaultPin);
    
    // Simulate distance programmatically between 5 km and 1200 km
    let km = 15;
    if (diff > 0) {
      km = Math.min(1200, Math.max(8, Math.round(diff * 0.4)));
    } else {
      km = 5.2; // Noida Sector 62 local
    }
    
    // Assume delivery bike speed is 35 km/h for local Delhi/NCR, or 60 km/h express logistics for outside
    const speed = km < 50 ? 35 : 60;
    const hours = parseFloat((km / speed).toFixed(1));
    
    // Route log
    const fromLocation = "Noida central hub";
    const toLocation = city || `PIN ${pinCode}`;
    const route = `${fromLocation} ➔ ${toLocation}`;

    return {
      distanceKm: km,
      estHours: hours,
      routeString: route
    };
  }, [pinCode, city]);

  // Real-time delivery arrival countdown state linked directly to distance
  const initialSeconds = useMemo(() => {
    return Math.max(25, Math.min(120, Math.round(distanceKm * 0.8)));
  }, [distanceKm]);

  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [orderStatus, initialSeconds]);

  useEffect(() => {
    const statusLower = orderStatus?.toLowerCase();
    const isShipped = statusLower === 'shipped' || statusLower === 'in transit' || statusLower === 'in-transit';
    if (!isShipped) return;
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [orderStatus, secondsLeft]);

  // Decode checkout phases: Placed ➔ Deciding Courier ➔ En-Route ➔ Near You ➔ Delivered
  const { phase, progressPercent, statusLabel, colorClass, stepIndex } = useMemo(() => {
    const status = orderStatus?.toLowerCase() || 'placed';
    
    if (status === 'declined' || status === 'cancelled' || status.includes('failed') || status.includes('declined')) {
      return {
        phase: 'Cancelled',
        progressPercent: 0,
        statusLabel: 'Order Cancelled / Refund Synced',
        colorClass: 'bg-red-500',
        stepIndex: -1
      };
    }
    
    if (status === 'completed') {
      return {
        phase: 'Delivered',
        progressPercent: 100,
        statusLabel: 'Your snacks are successfully delivered & cash settled! ✓',
        colorClass: 'bg-[#10B981]',
        stepIndex: 4
      };
    }
    
    if (status === 'shipped' || status === 'in transit' || status === 'in-transit') {
      if (secondsLeft > 0) {
        const fractionElapsed = (initialSeconds - secondsLeft) / initialSeconds;
        // Bike transit covers 30% mapped up to 90%
        const dynamicPercent = Math.round(30 + (fractionElapsed * 60));
        const currentStep = dynamicPercent < 60 ? 2 : 3;

        return {
          phase: dynamicPercent < 60 ? 'En-Route' : 'Near You',
          progressPercent: dynamicPercent,
          statusLabel: `🚴 Delhivery Express on the way! ETA: ${secondsLeft}s (Simulated Speed)`,
          colorClass: 'bg-blue-500',
          stepIndex: currentStep
        };
      } else {
        return {
          phase: 'At Doorstep',
          progressPercent: 92,
          statusLabel: '📍 Delhivery Courier has arrived! Please deliver cash & acknowledge receipt on your order checklist.',
          colorClass: 'bg-amber-500 animate-pulse',
          stepIndex: 3
        };
      }
    }

    // Default to 'Placed' / 'processing' / 'pending'
    return {
      phase: 'Deciding Courier',
      progressPercent: 20,
      statusLabel: 'Confirming fresh batch & scheduling courier pickup',
      colorClass: 'bg-[#FFF200] text-black border-black',
      stepIndex: 1
    };
  }, [orderStatus, secondsLeft, initialSeconds]);

  const steps = [
    { label: 'Placed', icon: '📝' },
    { label: 'Courier Scheduled', icon: '📦' },
    { label: 'En-Route', icon: '🚴' },
    { label: 'Near You', icon: '📍' },
    { label: 'Delivered', icon: '🐢' }
  ];

  if (phase === 'Cancelled') {
    return (
      <div className="bg-red-50 border-2 border-[#EF4444] p-4 text-left font-sans text-[#EF4444] flex items-center gap-3">
        <AlertTriangle className="w-6 h-6 shrink-0 text-[#EF4444]" />
        <div>
          <strong className="block text-xs uppercase tracking-wider font-sans font-black">Delivery Aborted</strong>
          <span className="text-[11px] font-bold text-gray-600 font-sans uppercase">This order was declined or cancelled. Refunds are synced automatically.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-black p-5 text-left font-sans text-chomps-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4 mb-4 text-xs font-bold uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-chomps-red" />
          <div>
            <span className="text-gray-400 block text-[8px] font-black">Estimated transit</span>
            <span>{phase === 'Delivered' ? 'Completed' : `${estHours} hrs`}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-chomps-red" />
          <div>
            <span className="text-gray-400 block text-[8px] font-black">simulated Distance</span>
            <span>{distanceKm} km</span>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-chomps-red" />
          <div>
            <span className="text-gray-400 block text-[8px] font-black">Central Dispatch</span>
            <span className="truncate block max-w-[150px]" title={routeString}>{routeString}</span>
          </div>
        </div>
      </div>

      {/* Static Delivery Bike Header Status */}
      <div className="mb-4 flex justify-between items-center bg-zinc-50 border border-black/10 px-3 py-1.5 text-xs font-bold leading-normal">
        <span className="text-gray-500 uppercase tracking-widest text-[9px] font-bold">Phase Status:</span>
        <span className={`px-2 py-0.5 border text-[9px] uppercase font-bold text-white tracking-wider ${colorClass}`}>
          {phase}
        </span>
      </div>

      {/* Real-time Timeline Canvas */}
      <div className="relative my-8 px-2 select-none">
        
        {/* Underlay Track */}
        <div className="h-3.5 bg-zinc-100 border-2 border-black w-full relative">
          {/* Filled active track segment */}
          <div 
            className="h-full bg-[#FFF200] transition-all duration-1000 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Moving Bike Vector Overlay */}
        <div 
          className="absolute -top-3.5 transition-all duration-1000 ease-out flex flex-col items-center"
          style={{ 
            left: `${Math.max(0, Math.min(94, progressPercent - 3))}%` 
          }}
        >
          <div className="bg-[#E12B2E] border-2 border-black p-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none animate-bounce flex items-center justify-center">
            <Bike className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-[9px] font-black uppercase text-chomps-red bg-white border border-black px-1.5 mt-1 block">
            {phase === 'Delivered' ? 'ARRIVED ✓' : phase === 'At Doorstep' ? 'HERE 📍' : 'ON-ROAD 🚴'}
          </span>
        </div>
      </div>

      {/* Discrete Milestone Grid */}
      <div className="grid grid-cols-5 gap-1.5 text-center text-chomps-black font-sans font-black uppercase select-none text-[8px] sm:text-[9.5px]">
        {steps.map((step, idx) => {
          const isDone = idx <= stepIndex;
          const isCurrent = idx === stepIndex;

          return (
            <div key={idx} className="flex flex-col items-center gap-1">
              <span className={`text-base block ${isCurrent ? 'scale-125 animate-pulse' : ''}`}>
                {step.icon}
              </span>
              <span className={`tracking-wider block truncate max-w-full ${
                isCurrent ? 'text-chomps-red underline decoration-wavy decoration-chomps-red' : 
                isDone ? 'text-black' : 'text-gray-300'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[10px] sm:text-[11px] font-extrabold text-center uppercase tracking-wide text-gray-500 leading-normal">
        🚀 Let's go! {statusLabel}
      </p>

    </div>
  );
}
