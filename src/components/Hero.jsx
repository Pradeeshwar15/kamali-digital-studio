import React from 'react';
import { studioConfig } from '../data/studioConfig.js';
import { Sparkles, ArrowRight, Frame, Camera, Image as ImageIcon } from 'lucide-react';

export default function Hero({ onOpenPhotographyInquiry, onOpenDesigner, onExploreWork }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 bg-[#0a0a0c]">
        {/* Dark Photography Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center filter grayscale contrast-125"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop')`
          }}
        />
        {/* Radial Vignette & Lens Glow */}
        <div className="absolute inset-0 bg-radial-vignette from-transparent via-[#0a0a0c]/80 to-[#0a0a0c]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-studio-orange/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-studio-orange/30 text-studio-orange backdrop-blur-md mb-8 animate-float">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase">
            {studioConfig.tagline}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          KAMALI <span className="text-transparent bg-clip-text bg-gradient-to-r from-studio-orange via-amber-400 to-amber-200">DIGITAL STUDIO</span>
        </h1>

        <p className="text-xl sm:text-2xl font-light text-gray-300 max-w-3xl mx-auto mb-4 font-serif italic">
          "Your memories deserve more than a photograph."
        </p>

        {/* Subhead Badges */}
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          Professional Photography • Custom Photo Frames • Printing • Creative Products
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenPhotographyInquiry}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-studio-orange to-amber-600 hover:from-studio-orangeHover hover:to-amber-700 shadow-glow-orange transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>ENQUIRE NOW</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenDesigner}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold text-gray-200 bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md hover:border-white/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Frame className="w-5 h-5 text-studio-orange" />
            <span>DESIGN YOUR FRAME</span>
          </button>

          <button
            onClick={onExploreWork}
            className="w-full sm:w-auto px-6 py-4 rounded-full text-sm font-semibold text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ImageIcon className="w-4 h-4 text-studio-orange" />
            <span>VIEW OUR WORK</span>
          </button>
        </div>

        {/* Studio Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8 border-t border-white/10">
          {studioConfig.stats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:border-studio-orange/30 transition-all">
              <div className="font-serif text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {stat.value}
              </div>
              <div className="text-xs text-studio-orange font-semibold tracking-wider uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
