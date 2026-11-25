import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, ArrowLeftRight } from 'lucide-react';

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPos(Number(e.target.value));
  };

  const beforeImg = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop&sat=-100&con=80";
  const afterImg = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop";

  return (
    <section className="py-20 bg-[#0c0c0f] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PHOTO RESTORATION & RETOUCHING</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            BEFORE <span className="text-studio-orange">&</span> AFTER
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            Drag the comparison slider below to see how our digital retouchers restore faded, damaged, or raw photographs into timeless high-definition art.
          </p>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[380px] sm:h-[500px] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl select-none group">
            
            {/* AFTER IMAGE (Bottom Layer) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={afterImg}
                alt="After Studio Retouching"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 px-4 py-1.5 rounded-full bg-studio-orange text-white text-xs font-bold tracking-widest shadow-lg">
                AFTER (KAMALI STUDIO RETOUCH)
              </div>
            </div>

            {/* BEFORE IMAGE (Clipped Overlay Layer) */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={beforeImg}
                alt="Before Restoration"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-gray-300 text-xs font-bold tracking-widest border border-white/10 shadow-lg">
                BEFORE (RAW / ORIGINAL)
              </div>
            </div>

            {/* SLIDER DIVIDER BAR & DRAG HANDLE */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-studio-orange text-white flex items-center justify-center shadow-glow-orange border-2 border-white">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
            </div>

            {/* RANGE INPUT CONTROLLER */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Before and After photo slider"
            />
          </div>

          {/* Hint Footer */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400 mt-4">
            <SlidersHorizontal className="w-4 h-4 text-studio-orange" />
            <span>Slide left/right across the image to compare studio enhancement</span>
          </div>
        </div>

      </div>
    </section>
  );
}
