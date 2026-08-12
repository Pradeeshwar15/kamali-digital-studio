import React from 'react';
import { frameStyles } from '../data/frames.js';
import { Frame, Check, ArrowRight, Sparkles } from 'lucide-react';

export default function FrameShowcase({ onCustomizeFrame }) {
  return (
    <section className="py-20 bg-[#0a0a0c] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CRAFTSMANSHIP & MATERIALS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            SIGNATURE <span className="text-studio-orange">FRAME COLLECTIONS</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            Handcrafted with archival durability, anti-reflective glass, and museum matting.
          </p>
        </div>

        {/* Frame Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {frameStyles.map((frame) => (
            <div
              key={frame.id}
              className="bg-studio-card rounded-2xl border border-white/10 p-6 flex flex-col hover:border-studio-orange/40 transition-all duration-300 group hover:-translate-y-1 shadow-xl"
            >
              {/* Frame Texture Visual Box */}
              <div className="relative h-60 w-full bg-[#16161d] rounded-xl flex items-center justify-center p-6 overflow-hidden mb-6">
                
                {/* 3D Frame Visualizer Demo */}
                <div 
                  className={`w-4/5 h-4/5 rounded bg-cover bg-center transition-transform duration-500 group-hover:scale-105 ${frame.borderClass}`}
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop')`
                  }}
                />

                {/* Popular Badge */}
                {frame.badge && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white bg-studio-orange shadow-md">
                    {frame.badge}
                  </span>
                )}
              </div>

              {/* Title & Category */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-studio-orange transition-colors">
                  {frame.name}
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white/5 text-gray-400 border border-white/10">
                  {frame.category}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                {frame.description}
              </p>

              {/* Price & CTA */}
              <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Starting from</span>
                  <span className="font-serif text-2xl font-bold text-white">₹{frame.basePrice}</span>
                </div>

                <button
                  onClick={() => onCustomizeFrame && onCustomizeFrame(frame.id)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-studio-orange hover:bg-studio-orangeHover shadow-glow-orange flex items-center gap-2 transform group-hover:scale-105 transition-all"
                >
                  <Frame className="w-4 h-4" />
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
