import React, { useState, useEffect } from 'react';
import { studioConfig } from '../data/studioConfig.js';
import { Sparkles, ArrowRight, Camera, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    desktop: '/images/hero/desktop/hero-2.webp',
    mobile: '/images/hero/mobile/hero-1.webp',
    alt: 'Kamali Studio Wedding Stage Photography'
  },
  {
    desktop: '/images/hero/desktop/hero-3.webp',
    mobile: '/images/hero/mobile/hero-2.webp',
    alt: 'Kamali Studio Traditional Wedding Coverage'
  },
  {
    desktop: '/images/hero/desktop/hero-4.webp',
    mobile: '/images/hero/mobile/hero-3.webp',
    alt: 'Kamali Studio Candid Couple Photography'
  },
  {
    desktop: '/images/hero/desktop/hero-1.webp',
    mobile: '/images/hero/mobile/hero-4.webp',
    alt: 'Kamali Studio Reception & Portrait Shoot'
  },
  {
    desktop: '/images/hero/desktop/hero-8.webp',
    mobile: '/images/hero/mobile/hero-5.webp',
    alt: 'Kamali Studio Grand Wedding Moments'
  },
  {
    desktop: '/images/hero/desktop/hero-7.webp',
    mobile: '/images/hero/mobile/hero-6.webp',
    alt: 'Kamali Studio Couple Special Portraits'
  },
  {
    desktop: '/images/hero/desktop/hero-6.webp',
    mobile: '/images/hero/mobile/hero-7.webp',
    alt: 'Kamali Studio Bridal Portrait Shoot'
  },
  {
    desktop: '/images/hero/desktop/hero-5.webp',
    mobile: '/images/hero/mobile/hero-8.webp',
    alt: 'Kamali Studio Sacred Rituals'
  }
];

export default function Hero({ onOpenPhotographyInquiry, onOpenDesigner, onExploreWork }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Autoplay functionality
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-center overflow-hidden group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Responsive Slideshow Backgrounds with Art Direction */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
            idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <picture className="w-full h-full block">
            <source media="(max-width: 767px)" srcSet={slide.mobile} type="image/webp" />
            <source media="(min-width: 768px)" srcSet={slide.desktop} type="image/webp" />
            <img
              src={slide.desktop}
              alt={slide.alt}
              className={`w-full h-full object-cover object-center transition-transform duration-[10000ms] ease-linear pointer-events-none select-none ${
                idx === currentSlide ? 'scale-100' : 'scale-105'
              }`}
              loading={idx === 0 ? "eager" : "lazy"}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </picture>
        </div>
      ))}

      {/* Ultra-Light Transparent Overlay to keep background photos clearly visible */}
      <div className="absolute inset-0 bg-black/20 md:bg-black/25 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none z-10" />

      {/* Main Content (Safely positioned below fixed navbar on all screen sizes) */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
        
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/40 border border-studio-orange/40 text-studio-orange mb-2 sm:mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
            {studioConfig.tagline || 'Capture Beyond Imagination'}
          </span>
        </div>

        {/* Official Client Logo Emblem in Hero */}
        <div className="mb-2 flex justify-center">
          <img 
            src="/images/branding/logo-transparent.png" 
            alt="Kamali Studio & Digital Lab" 
            className="h-12 sm:h-16 md:h-20 w-auto object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)] filter brightness-105" 
          />
        </div>

        {/* Main Title Typography (Mobile & Desktop Optimized) */}
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          KAMALI <span className="text-transparent bg-clip-text bg-gradient-to-r from-studio-orange via-amber-400 to-amber-200">STUDIO & DIGITAL LAB</span>
        </h1>

        <p className="text-xs sm:text-base md:text-lg font-light text-gray-200 max-w-xl mx-auto mb-5 sm:mb-7 font-serif italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Capture Beyond Imagination
        </p>

        {/* Hero CTAs (Compact & translucent without heavy blur) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 mb-6 sm:mb-8">
          <button
            onClick={onExploreWork}
            className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-black/40 hover:bg-black/60 border border-white/25 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ImageIcon className="w-4 h-4 text-gray-300" />
            <span>View Our Work</span>
          </button>

          <button
            onClick={onOpenPhotographyInquiry}
            className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-studio-orange to-amber-600 hover:from-studio-orangeHover hover:to-amber-700 shadow-glow-orange transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <Camera className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
            <span>Book a Photography Service</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Studio Highlights Bar (Smaller, compact, and ultra-light opacity so photo is clearly visible) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-4xl mx-auto pt-4 border-t border-white/10">
          {studioConfig.stats.map((stat, idx) => (
            <div key={idx} className="py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl bg-black/35 border border-white/10 hover:border-studio-orange/40 transition-all">
              <div className="font-serif text-lg sm:text-xl md:text-2xl font-extrabold text-white drop-shadow-md">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-[11px] text-studio-orange font-semibold tracking-wider uppercase mt-0.5">
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
        {HERO_SLIDES.map((_, idx) => (
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
