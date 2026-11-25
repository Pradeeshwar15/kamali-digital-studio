import React from 'react';
import { frameStyles } from '../data/frames.js';
import { Frame, Check, ArrowRight, Sparkles } from 'lucide-react';

export default function FrameShowcase({ onCustomizeFrame, isVisibleMobile = true }) {
  return (
    <section className={`py-16 sm:py-20 bg-[#0a0a0c] relative border-t border-white/5 ${!isVisibleMobile ? 'hidden sm:block' : ''}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CRAFTSMANSHIP & MATERIALS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
            SIGNATURE <span className="text-studio-orange">FRAME COLLECTIONS</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-lg mt-2">
            Handcrafted with archival durability, anti-reflective glass, and museum matting.
          </p>
        </div>

        {/* Frame Cards Grid — 2 IN A ROW ON MOBILE (grid-cols-2) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {frameStyles.map((frame) => (
            <div
              key={frame.id}
              className="bg-studio-card rounded-xl sm:rounded-2xl border border-white/10 p-3 sm:p-6 flex flex-col justify-between hover:border-studio-orange/40 transition-all duration-300 group hover:-translate-y-1 shadow-xl"
            >
              {/* Frame Texture Visual Box */}
              <div className="relative h-36 sm:h-60 w-full bg-[#16161d] rounded-lg sm:rounded-xl flex items-center justify-center p-3 sm:p-6 overflow-hidden mb-3 sm:mb-6">
                
                {/* 3D Frame Visualizer Demo */}
                <div 
                  className={`w-4/5 h-4/5 rounded bg-cover bg-center transition-transform duration-500 group-hover:scale-105 ${frame.borderClass}`}
                  style={{
                    backgroundImage: `url('/images/gallery/wedding/wedding1.webp')`
                  }}
                />

                {/* Popular Badge */}
                {frame.badge && (
                  <span className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold tracking-wider uppercase text-white bg-studio-orange shadow-md">
                    {frame.badge}
                  </span>
                )}
              </div>

              {/* Title & Category */}
              <div>
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <h3 className="font-serif text-sm sm:text-2xl font-bold text-white group-hover:text-studio-orange transition-colors truncate">
                    {frame.name}
                  </h3>
                  <span className="hidden sm:inline text-xs font-semibold px-2.5 py-1 rounded bg-white/5 text-gray-400 border border-white/10">
                    {frame.category}
                  </span>
                </div>

                <p className="text-gray-400 text-[10px] sm:text-sm mb-3 sm:mb-6 line-clamp-2">
                  {frame.description}
                </p>
              </div>

              {/* Price & CTA */}
              <div className="mt-auto pt-2 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[9px] sm:text-xs text-gray-400 block">Starting from</span>
                  <span className="font-serif text-base sm:text-2xl font-bold text-white">₹{frame.basePrice}</span>
                </div>

                <button
                  onClick={() => onCustomizeFrame && onCustomizeFrame(frame.id)}
                  className="w-full sm:w-auto px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-full text-[10px] sm:text-xs font-bold text-white bg-studio-orange hover:bg-studio-orangeHover shadow-glow-orange flex items-center justify-center gap-1.5 transform group-hover:scale-105 transition-all"
                >
                  <Frame className="w-3.5 h-3.5" />
                  <span>CUSTOMIZE</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
