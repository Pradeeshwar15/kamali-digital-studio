import React, { useState, useEffect } from 'react';
import { studioConfig } from '../data/studioConfig.js';
import { Sparkles, ArrowRight, Camera, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_IMAGES = [
  '/images/hero/hero-1.webp',
  '/images/hero/hero-2.webp',
  '/images/hero/hero-3.webp',
  '/images/hero/hero-4.webp',
  '/images/hero/hero-5.webp'
];

export default function Hero({ onOpenPhotographyInquiry, onOpenDesigner, onExploreWork }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Autoplay functionality
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === HERO_IMAGES.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Slideshow Backgrounds */}
      {HERO_IMAGES.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          {/* Subtle cinematic zoom effect for active slide */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear ${
              idx === currentSlide ? 'scale-100' : 'scale-110'
            }`}
            style={{ backgroundImage: `url('${img}')` }}
            loading="lazy"
          />
        </div>
      ))}

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      {/* Radial Vignette & Lens Glow */}
      <div className="absolute inset-0 bg-radial-vignette from-transparent via-[#0a0a0c]/50 to-[#0a0a0c]/90 z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-studio-orange/15 rounded-full blur-[140px] pointer-events-none z-10" />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20 pt-20">
        
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-studio-orange/30 text-studio-orange backdrop-blur-md mb-8 animate-float">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase">
            {studioConfig.tagline || 'Capture Beyond Imagination'}
          </span>
        </div>

        {/* Official Client Logo Emblem in Hero */}
        <div className="mb-4 flex justify-center">
          <img 
            src="/images/branding/logo-transparent.png" 
            alt="Kamali Studio & Digital Lab" 
            className="h-20 sm:h-28 md:h-36 w-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] filter brightness-105" 
          />
        </div>

        {/* Main Title Typography (Mobile Optimized) */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight mb-3 drop-shadow-2xl">
          KAMALI <span className="text-transparent bg-clip-text bg-gradient-to-r from-studio-orange via-amber-400 to-amber-200">STUDIO & DIGITAL LAB</span>
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-200 max-w-3xl mx-auto mb-10 font-serif italic drop-shadow-md">
          Capture Beyond Imagination
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onExploreWork}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <ImageIcon className="w-5 h-5 text-gray-300" />
            <span>View Our Work</span>
          </button>

          <button
            onClick={onOpenPhotographyInquiry}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-studio-orange to-amber-600 hover:from-studio-orangeHover hover:to-amber-700 shadow-glow-orange transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group/btn"
          >
            <Camera className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
            <span>Book a Photography Service</span>
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
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

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-studio-orange/80 border border-white/10 text-white backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hidden sm:flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-studio-orange/80 border border-white/10 text-white backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hidden sm:flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide 
                ? 'w-8 h-2.5 bg-studio-orange shadow-[0_0_10px_rgba(249,115,22,0.8)]' 
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
