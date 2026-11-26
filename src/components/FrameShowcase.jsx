import React from 'react';
import { frameStyles } from '../data/frames.js';
import { Frame, Sparkles, ArrowRight } from 'lucide-react';

const showcasePreviewImages = {
  "classic-wood": "/images/gallery/portraits/portrait-01.webp",
  "royal-gold": "/images/gallery/wedding/wedding-01.webp",
  "premium-textured": "/images/gallery/events/event-01.webp",
  "modern-matte": "/images/gallery/portraits/baby-01.webp"
};

export default function FrameShowcase({ onCustomizeFrame }) {
  return (
    // STRICTLY HIDDEN ON MOBILE AS REQUESTED BY CLIENT (hidden md:block)
    <section className="hidden md:block py-10 sm:py-16 bg-[#0a0a0c] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CRAFTSMANSHIP & MATERIALS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            SIGNATURE <span className="text-studio-orange">FRAME COLLECTIONS</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-lg mt-2 font-serif italic">
            "A frame preserves not just a photo, but a memory forever..."
          </p>
        </div>

        {/* 4 Official Poster Collections Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {frameStyles.map((frame) => (
            <div
              key={frame.id}
              className="bg-studio-card rounded-2xl border border-white/10 p-5 flex flex-col justify-between hover:border-studio-orange/40 transition-all duration-300 group hover:-translate-y-1.5 shadow-xl"
            >
              {/* Frame Texture Visual Box */}
              <div className="relative h-52 w-full bg-[#16161d] rounded-xl flex items-center justify-center p-4 overflow-hidden mb-5">
                
                {/* 3D Frame Visualizer Demo */}
                <div 
                  className={`w-4/5 h-4/5 rounded bg-cover bg-center transition-transform duration-500 group-hover:scale-105 ${frame.borderClass}`}
                  style={{
                    backgroundImage: `url('${showcasePreviewImages[frame.id] || "/images/gallery/portraits/baby-01.webp"}')`
                  }}
                />

                {/* Badge */}
                {frame.badge && (
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase text-white bg-studio-orange shadow-md">
                    {frame.badge}
                  </span>
                )}
              </div>

              {/* Title & Category */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-studio-orange transition-colors truncate">
                    {frame.name}
                  </h3>
                </div>

                <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 text-amber-400 border border-white/10 mb-2">
                  {frame.category}
                </span>

                <p className="text-gray-400 text-xs mb-5 line-clamp-2 leading-relaxed">
                  {frame.description}
                </p>
              </div>

              {/* Price & CTA */}
              <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-medium">Starting from</span>
                  <span className="font-serif text-xl font-extrabold text-white">₹{frame.basePrice}</span>
                </div>

                <button
                  onClick={() => onCustomizeFrame && onCustomizeFrame(frame.id)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-white bg-studio-orange hover:bg-studio-orangeHover shadow-glow-orange flex items-center justify-center gap-1.5 transform group-hover:scale-105 transition-all"
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
