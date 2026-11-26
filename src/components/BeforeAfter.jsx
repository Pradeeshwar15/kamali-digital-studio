import React, { useState, useRef } from 'react';
import { Sparkles, SlidersHorizontal, ArrowLeftRight } from 'lucide-react';

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleSliderChange = (e) => {
    setSliderPos(Number(e.target.value));
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    if (!touch) return;
    const x = touch.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(Math.round(percent));
  };

  // Drop your restoration comparison photos into:
  // public/images/restoration/before.webp
  // public/images/restoration/after.webp
  const beforeImg = "/images/restoration/before.webp";
  const afterImg = "/images/restoration/after.webp";
  const fallbackBefore = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop&sat=-100&con=80";
  const fallbackAfter = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop";

  return (
    <section className="py-10 sm:py-16 bg-[#0c0c0f] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
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
          <div 
            ref={containerRef}
            onTouchMove={handleTouchMove}
            className="relative h-[320px] sm:h-[500px] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl select-none group touch-pan-y"
          >
            
            {/* AFTER IMAGE (Bottom Layer) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={afterImg}
                alt="After Studio Retouching"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onError={(e) => {
                  if (e.target.src !== fallbackAfter) {
                    e.target.src = fallbackAfter;
                  }
                }}
                className="w-full h-full object-cover pointer-events-none select-none"
              />
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-studio-orange text-white text-[10px] sm:text-xs font-bold tracking-widest shadow-lg">
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
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onError={(e) => {
                  if (e.target.src !== fallbackBefore) {
                    e.target.src = fallbackBefore;
                  }
                }}
                className="w-full h-full object-cover pointer-events-none select-none"
              />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/80 backdrop-blur-md text-gray-300 text-[10px] sm:text-xs font-bold tracking-widest border border-white/10 shadow-lg">
                BEFORE (RAW / ORIGINAL)
              </div>
            </div>

            {/* SLIDER DIVIDER BAR & DRAG HANDLE */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-studio-orange text-white flex items-center justify-center shadow-glow-orange border-2 border-white">
                <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
