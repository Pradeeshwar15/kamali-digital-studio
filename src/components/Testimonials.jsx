import React from 'react';
import { testimonialsData } from '../data/testimonials.js';
import { Star, Quote, Heart } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#0c0c0f] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-orange/10 border border-studio-orange/20 text-studio-orange text-xs font-bold uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>CLIENT TESTIMONIALS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            WHAT OUR CUSTOMERS <span className="text-studio-orange">SAY</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            Real stories from families, couples, and photography lovers across the region.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((t) => (
            <div
              key={t.id}
              className="bg-studio-card p-8 rounded-2xl border border-white/10 relative flex flex-col justify-between hover:border-studio-orange/40 transition-all duration-300 shadow-xl group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 group-hover:text-studio-orange/20 transition-colors" />

              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-studio-orange"
                />
                <div>
                  <h4 className="font-serif text-base font-bold text-white">
                    {t.name}
                  </h4>
                  <span className="text-xs text-studio-orange font-medium block">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
