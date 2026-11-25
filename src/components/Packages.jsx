import React, { useState, useEffect, useRef } from 'react';
import { weddingPackages, smallEventPackages } from '../data/packages.js';
import { buildPhotographyInquiryMessage, generateWhatsAppLink } from '../utils/whatsappHelper.js';
import { Sparkles, CheckCircle2, Gift, Camera, ArrowRight, ShieldCheck, Star, Video, Award, Heart, PartyPopper, Calendar, Cake, Home, Sparkle } from 'lucide-react';

const PackageCard = ({ pkg, onBook, isSmallEvent = false }) => {
  const [inView, setInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  const isHighlighted = inView;

  return (
    <div
      ref={cardRef}
      className={`relative rounded-3xl bg-studio-card border ${pkg.borderColor} p-5 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 shadow-2xl group ${
        pkg.popular ? 'lg:-mt-3 lg:mb-3 bg-gradient-to-b from-[#1c1c26] to-studio-card ring-2 ring-studio-orange' : ''
      }`}
    >
      {/* Popular / Luxury Badge */}
      {pkg.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-white bg-gradient-to-r from-studio-orange to-amber-600 shadow-glow-orange flex items-center gap-1.5 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{pkg.badge}</span>
        </div>
      )}

      <div>
        {/* Header */}
        <div className="text-center pb-5 border-b border-white/10">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-studio-orange transition-colors">
            {pkg.name}
          </h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            {pkg.tagline}
          </p>

          <div className="mt-5">
            <span className="text-[11px] text-gray-400 block font-semibold uppercase tracking-wider">Package Price</span>
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-white text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-studio-orange">
              ₹{pkg.price}
            </div>
            <span className="text-[9px] sm:text-[10px] text-amber-400 font-bold uppercase tracking-widest block mt-1">
              ALL INCLUSIVE • STUDIO QUALITY GUARANTEED
            </span>
          </div>
        </div>

        {/* Features List */}
        <div className="py-5 space-y-2.5">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-2">
            What's Included:
          </span>
          {pkg.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-200">
              <CheckCircle2 className="w-4 h-4 text-studio-orange shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Complimentary Items Box */}
        {pkg.complimentary && (
          <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/25 mb-5">
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
        )}
      </div>

      {/* Package Actions */}
      <div className="mt-4">
        <button
          onClick={() => onBook(pkg)}
          className={`relative w-full py-3.5 rounded-2xl font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-500 active:scale-95 group/btn overflow-hidden bg-gradient-to-r from-studio-orange to-amber-700 text-white border border-amber-600/50 ${
            isHighlighted 
              ? 'shadow-[0_8px_30px_rgba(249,115,22,0.7)] scale-[1.02]' 
              : 'shadow-[0_8px_20px_rgba(249,115,22,0.2)] hover:scale-[1.02] lg:hover:shadow-[0_8px_30px_rgba(249,115,22,0.7)]'
          }`}
        >
          <div 
            className={`absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] transition-all duration-1000 ${
              isHighlighted ? '[transform:skew(-12deg)_translateX(150%)]' : 'group-hover/btn:[transform:skew(-12deg)_translateX(150%)]'
            }`}
          >
            <div className="relative h-full w-12 bg-white/30" />
          </div>
          
          <Camera className={`w-4 h-4 relative z-10 transition-colors duration-500 ${pkg.popular || isHighlighted ? 'text-white' : 'text-studio-orange group-hover/btn:text-white'}`} />
          <span className="relative z-10">BOOK THIS PACKAGE</span>
          <ArrowRight className={`w-4 h-4 relative z-10 transition-all duration-500 ${isHighlighted ? 'translate-x-1' : 'group-hover/btn:translate-x-1'} ${pkg.popular || isHighlighted ? 'text-white' : 'text-studio-orange group-hover/btn:text-white'}`} />
        </button>

        <p className="text-[10px] text-gray-400 text-center mt-3 leading-relaxed">
          {pkg.terms}
        </p>
      </div>
    </div>
  );
};

export default function Packages({ onOpenPhotographyInquiry, overrideWhatsapp = null }) {
  const [activeCategory, setActiveCategory] = useState('small-events'); // 'small-events' | 'wedding'

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
    <section id="packages" className="py-20 sm:py-24 bg-[#08080a] relative border-t border-white/10 overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-studio-orange/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-4 h-4 text-amber-400" />
            <span>CUSTOM EVENT & WEDDING PACKAGES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            SELECT YOUR <span className="text-studio-orange">PHOTOGRAPHY PACKAGE</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-3 font-serif italic">
            "Transparent pricing, premium albums, and unforgettable moments captured for every milestone."
          </p>

          {/* Interactive Category Segmented Control Toggle */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveCategory('small-events')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                activeCategory === 'small-events'
                  ? 'bg-gradient-to-r from-studio-orange to-amber-600 text-white shadow-glow-orange scale-[1.02]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <PartyPopper className="w-4 h-4" />
              <span>Small Events (4 Packages)</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] bg-black/30 text-amber-200 uppercase font-extrabold ml-1">
                ₹10k–₹25k
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('wedding')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                activeCategory === 'wedding'
                  ? 'bg-gradient-to-r from-studio-orange to-amber-600 text-white shadow-glow-orange scale-[1.02]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Grand Wedding (3 Packages)</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] bg-black/30 text-amber-200 uppercase font-extrabold ml-1">
                ₹50k–₹1.2L
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-studio-orange to-amber-600 text-white shadow-glow-orange scale-[1.02]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>All 7 Packages</span>
            </button>
          </div>
        </div>

        {/* Small Event Packages View */}
        {(activeCategory === 'small-events' || activeCategory === 'all') && (
          <div className="space-y-8 animate-fadeIn mb-12">
            {activeCategory === 'all' && (
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <PartyPopper className="w-5 h-5 text-studio-orange" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Small Event Packages (₹10,000 – ₹25,000)</h3>
              </div>
            )}

            {/* Occasion Tags Banner */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 sm:p-5 text-center max-w-4xl mx-auto shadow-lg">
              <span className="text-[11px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2.5">
                Ideal For Special Family Celebrations:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {smallEventOccasions.map((occ, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:border-studio-orange/40 transition-colors"
                  >
                    <span>{occ.icon}</span>
                    <span>{occ.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* 4 Cards Grid for Small Event Packages */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
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

        {/* Grand Wedding Packages View */}
        {(activeCategory === 'wedding' || activeCategory === 'all') && (
          <div className="space-y-8 animate-fadeIn">
            {activeCategory === 'all' && (
              <div className="flex items-center gap-3 border-b border-white/10 pb-3 pt-6">
                <Award className="w-5 h-5 text-studio-orange" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Grand Wedding Packages (₹50,000 – ₹1,20,000)</h3>
              </div>
            )}

            <div className="text-center text-xs text-gray-400 max-w-2xl mx-auto font-medium">
              Complete reception & wedding coverage with dual candid photographers, cinematic highlight videos, 4K drone cinematography, and reception stage LED displays.
            </div>

            {/* 3 Package Cards Grid for Wedding Packages */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
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

      </div>
    </section>
  );
}
