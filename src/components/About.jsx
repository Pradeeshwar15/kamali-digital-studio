import React from 'react';
import { studioConfig } from '../data/studioConfig.js';
import { Award, ShieldCheck, Sparkles, Clock, HeartHandshake, Layers } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0a0a0c] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Image Collage */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
              <img
                src="/images/gallery/candid/candit13.webp"
                alt="Kamali Studio Craftsmanship"
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-6 z-20 bg-studio-card border border-studio-orange/40 rounded-2xl p-5 shadow-glow-orange hidden sm:flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-studio-orange text-white flex items-center justify-center font-bold">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xl font-serif font-extrabold text-white block">100% Archival</span>
                <span className="text-xs text-studio-orange font-semibold">Museum Quality Prints</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-orange/10 border border-studio-orange/20 text-studio-orange text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT KAMALI DIGITAL STUDIO</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              PRECISION CRAFTSMANSHIP. <br />
              <span className="text-studio-orange">UNFORGETTABLE MEMORIES.</span>
            </h2>

            <p className="text-gray-300 text-base leading-relaxed mb-6">
              Founded with a passion for preserving life's most sacred milestones, <strong className="text-white">Kamali Digital Studio</strong> bridges traditional photographic artistry with state-of-the-art digital frame customizer technology.
            </p>

            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              We believe a photograph is more than pixels on a screen — it is a physical heirloom. That's why every frame moulding is hand-assembled, fitted with anti-glare glassing, and backed by archival non-fade color technology designed to last for generations.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-studio-orange shrink-0" />
                <span className="text-xs font-bold text-gray-200">Anti-Glare UV Glassing</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <Layers className="w-5 h-5 text-studio-orange shrink-0" />
                <span className="text-xs font-bold text-gray-200">Solid Teak & Alloy Mouldings</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-5 h-5 text-studio-orange shrink-0" />
                <span className="text-xs font-bold text-gray-200">Express 24-48h Delivery</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <HeartHandshake className="w-5 h-5 text-studio-orange shrink-0" />
                <span className="text-xs font-bold text-gray-200">Personalized Customer Support</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
