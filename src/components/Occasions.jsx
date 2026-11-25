import React from 'react';
import { occasionsData } from '../data/occasions.js';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

export default function Occasions({ onSelectOccasion }) {
  return (
    <section className="py-16 sm:py-20 bg-[#0c0c0f] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-studio-orange/10 border border-studio-orange/20 text-studio-orange text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2.5">
            <Heart className="w-3.5 h-3.5" />
            <span>CUSTOM GIFTING & DECOR</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
            A FRAME FOR <span className="text-studio-orange">EVERY MEMORY</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-lg mt-2">
            Select an occasion below to launch our interactive designer pre-loaded with optimal sizes and finishes.
          </p>
        </div>

        {/* Occasions Grid — 2 IN A ROW ON MOBILE (grid-cols-2) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {occasionsData.map((occ) => (
            <div
              key={occ.id}
              onClick={() => onSelectOccasion && onSelectOccasion(occ)}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-studio-card border border-white/10 hover:border-studio-orange/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-glow-orange hover:-translate-y-1 flex flex-col justify-between min-h-[230px] sm:min-h-[320px]"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-90"
                style={{ backgroundImage: `url('${occ.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent" />

              {/* Badge */}
              <div className="relative z-10 p-3 sm:p-5 flex justify-between items-start">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold text-white bg-studio-orange/90 backdrop-blur-md shadow-md">
                  {occ.badge}
                </span>
              </div>

              {/* Card Footer Content */}
              <div className="relative z-10 mt-auto p-3 sm:p-6">
                <h3 className="font-serif text-sm sm:text-2xl font-bold text-white group-hover:text-studio-orange transition-colors line-clamp-1">
                  {occ.title}
                </h3>
                <p className="text-[10px] sm:text-sm text-gray-300 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                  {occ.subtitle}
                </p>

                <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs font-bold text-studio-orange group-hover:text-white transition-colors">
                  <span className="truncate">DESIGN THIS FRAME</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
