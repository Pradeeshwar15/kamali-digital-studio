import React, { useState, useEffect, useRef } from 'react';
import { weddingPackages, smallEventPackages } from '../data/packages.js';
import { buildPhotographyInquiryMessage, generateWhatsAppLink } from '../utils/whatsappHelper.js';
import { Sparkles, CheckCircle2, Gift, Camera, ArrowRight, Award, PartyPopper, ChevronDown, ChevronUp } from 'lucide-react';

const PackageCard = ({ pkg, onBook, isSmallEvent = false }) => {
  const [inView, setInView] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  const isHighlighted = inView;
  const mobileFeatures = expandedMobile ? pkg.features : pkg.features.slice(0, 3);
  const remainingCount = pkg.features.length - 3;

  return (
    <div
      ref={cardRef}
      className={`relative rounded-3xl bg-studio-card border ${pkg.borderColor} p-4 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 shadow-2xl group h-full ${
        pkg.popular ? 'lg:-mt-2 lg:mb-2 bg-gradient-to-b from-[#1c1c26] to-studio-card ring-2 ring-studio-orange' : ''
      }`}
    >
      {/* Popular / Luxury Badge */}
      {pkg.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-extrabold uppercase tracking-widest text-white bg-gradient-to-r from-studio-orange to-amber-600 shadow-glow-orange flex items-center gap-1.5 whitespace-nowrap z-20">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>{pkg.badge}</span>
        </div>
      )}

      <div>
        {/* Header */}
        <div className="text-center pb-4 sm:pb-5 border-b border-white/10">
          <h3 className="font-serif text-lg sm:text-2xl font-bold text-white group-hover:text-studio-orange transition-colors">
            {pkg.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-1 line-clamp-1 sm:line-clamp-2">
            {pkg.tagline}
          </p>

          <div className="mt-3 sm:mt-5">
            <span className="text-[10px] sm:text-[11px] text-gray-400 block font-semibold uppercase tracking-wider">
              Package Price
            </span>
            <div className="font-serif text-2xl sm:text-4xl font-extrabold text-white text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-studio-orange">
              ₹{pkg.price}
            </div>
            <span className="text-[9px] sm:text-[10px] text-amber-400 font-bold uppercase tracking-widest block mt-0.5">
              ALL INCLUSIVE • STUDIO QUALITY
            </span>
          </div>
        </div>

        {/* Features List (Shortened on Mobile with Interactive Expand) */}
        <div className="py-3.5 sm:py-5">
          <span className="text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider block mb-2">
            What's Included:
          </span>

          {/* MOBILE VIEW: Shortened Top 3 + Accordion */}
          <div className="sm:hidden space-y-2">
            {mobileFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-gray-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-studio-orange shrink-0 mt-0.5" />
                <span className="leading-snug">{feat}</span>
              </div>
            ))}

            {remainingCount > 0 && (
              <button
                type="button"
                onClick={() => setExpandedMobile(!expandedMobile)}
                className="w-full py-1.5 px-2 mt-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-bold text-studio-orange flex items-center justify-center gap-1 transition-colors"
              >
                <span>{expandedMobile ? 'Show Less' : `+ ${remainingCount} More Inclusions`}</span>
                {expandedMobile ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* DESKTOP VIEW: Complete List with Equal Rhythm */}
          <div className="hidden sm:block space-y-2.5">
            {pkg.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-studio-orange shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Complimentary Gifts */}
        {pkg.complimentary && (
          <div className="mt-1 mb-4">
            {/* Mobile View: Compact Gift Chip */}
            <div className="sm:hidden p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/20">
              <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 uppercase tracking-wider mb-0.5">
                <Gift className="w-3 h-3 text-amber-400" />
                <span>Free Gifts:</span>
              </span>
              <span className="text-[11px] text-amber-200/90 font-medium leading-tight block">
                {pkg.complimentary.join(' • ')}
              </span>
            </div>

            {/* Desktop View: Full Gift Box */}
            <div className="hidden sm:block p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/25">
              <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider mb-2">
                <Gift className="w-3.5 h-3.5" />
                <span>Free Complimentary Gifts</span>
              </span>
              <div className="grid grid-cols-1 gap-1">
                {pkg.complimentary.map((gift, gIdx) => (
                  <span key={gIdx} className="text-[11px] text-amber-200/90 font-medium flex items-center gap-1">
                    • {gift}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Package Actions */}
      <div className="mt-2 sm:mt-4 pt-3 border-t border-white/5">
        <button
          onClick={() => onBook(pkg)}
          className={`relative w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-xs tracking-wider sm:tracking-widest uppercase flex items-center justify-center gap-2 sm:gap-2.5 transition-all duration-300 active:scale-95 group/btn overflow-hidden bg-gradient-to-r from-studio-orange to-amber-700 text-white border border-amber-600/50 ${
            isHighlighted 
              ? 'shadow-[0_8px_25px_rgba(249,115,22,0.6)] scale-[1.01]' 
              : 'shadow-[0_8px_15px_rgba(249,115,22,0.2)] hover:scale-[1.02]'
          }`}
        >
          <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 text-white" />
          <span className="relative z-10">BOOK THIS PACKAGE</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 text-white group-hover/btn:translate-x-1 transition-transform" />
        </button>

        <p className="text-[10px] text-gray-400 text-center mt-2 leading-relaxed">
          <span className="sm:hidden">Studio quality guaranteed • Delivery within 30–45 days</span>
          <span className="hidden sm:inline">{pkg.terms}</span>
        </p>
      </div>
    </div>
  );
};

export default function Packages({ onOpenPhotographyInquiry }) {
  // Default to 'wedding' (3 packages) as requested by client for clean, aligned structure
  const [activeCategory, setActiveCategory] = useState('wedding'); // 'wedding' | 'small-events'

  const handlePackageBooking = (pkg, isSmallEvent = false) => {
    const prefix = isSmallEvent ? "Small Event Package" : "Wedding Package";
    if (onOpenPhotographyInquiry) {
      onOpenPhotographyInquiry(`${prefix}: ${pkg.name} (₹${pkg.price})`);
      return;
    }
    const msg = buildPhotographyInquiryMessage({
      serviceName: `${prefix}: ${pkg.name} (₹${pkg.price})`,
      eventType: isSmallEvent ? "Small Event Function" : "Reception + Wedding",
      requirements: `Package inclusions: ${pkg.features.slice(0, 5).join(', ')}`
    });

    const link = generateWhatsAppLink(msg);
    window.open(link, '_blank');
  };

  const smallEventOccasions = [
    { label: "Engagement", icon: "💍" },
    { label: "Birthday", icon: "🎂" },
    { label: "Puberty Function", icon: "🌸" },
    { label: "House Warming", icon: "🏡" },
    { label: "Ear Piercings", icon: "✨" }
  ];

  return (
    <section id="packages" className="py-10 sm:py-16 md:py-20 bg-[#08080a] relative border-t border-white/10 overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-studio-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>PHOTOGRAPHY & CINEMATOGRAPHY PACKAGES</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
            CHOOSE YOUR <span className="text-studio-orange">PERFECT PACKAGE</span>
          </h2>
          <p className="text-gray-300 text-xs sm:text-base mt-2 font-serif italic">
            "Transparent pricing, premium albums, and unforgettable moments captured for every milestone."
          </p>

          {/* Zero-Scrollbar Segmented Category Control */}
          <div className="mt-5 sm:mt-7 max-w-md mx-auto p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setActiveCategory('wedding')}
              className={`py-2.5 sm:py-3 px-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                activeCategory === 'wedding'
                  ? 'bg-gradient-to-r from-studio-orange to-amber-600 text-white shadow-glow-orange scale-[1.01]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
              <span>Grand Wedding</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] bg-black/40 text-amber-200 font-extrabold">
                3
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('small-events')}
              className={`py-2.5 sm:py-3 px-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                activeCategory === 'small-events'
                  ? 'bg-gradient-to-r from-studio-orange to-amber-600 text-white shadow-glow-orange scale-[1.01]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <PartyPopper className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
              <span>Small Events</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] bg-black/40 text-amber-200 font-extrabold">
                4
              </span>
            </button>
          </div>
        </div>

        {/* 1. GRAND WEDDING PACKAGES (3 Perfectly Aligned Packages) */}
        {activeCategory === 'wedding' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center text-xs text-gray-400 max-w-xl mx-auto font-medium">
              Complete reception & wedding coverage with candid photography, cinematic highlight video, drone aerials & stage LED wall displays.
            </div>

            {/* 3 Perfectly Aligned Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 items-stretch max-w-7xl mx-auto">
              {weddingPackages.map((pkg) => (
                <PackageCard 
                  key={pkg.id} 
                  pkg={pkg} 
                  onBook={(p) => handlePackageBooking(p, false)} 
                  isSmallEvent={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* 2. SMALL EVENT PACKAGES (4 Aligned Packages Without Scrollbar) */}
        {activeCategory === 'small-events' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Occasion Tags Banner */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-3.5 sm:p-4 text-center max-w-3xl mx-auto shadow-lg">
              <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
                Ideal For Special Family Celebrations:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
                {smallEventOccasions.map((occ, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 sm:px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1 shadow-sm"
                  >
                    <span>{occ.icon}</span>
                    <span>{occ.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* 4 Cards Aligned Grid: 1 col on mobile, 2 col on tablet, 4 col on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch max-w-7xl mx-auto">
              {smallEventPackages.map((pkg) => (
                <PackageCard 
                  key={pkg.id} 
                  pkg={pkg} 
                  onBook={(p) => handlePackageBooking(p, true)}
                  isSmallEvent={true}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
