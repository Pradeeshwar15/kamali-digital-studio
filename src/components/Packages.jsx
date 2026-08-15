import React, { useState, useEffect, useRef } from 'react';
import { weddingPackages } from '../data/packages.js';
import { buildPhotographyInquiryMessage, generateWhatsAppLink } from '../utils/whatsappHelper.js';
import { Sparkles, CheckCircle2, Gift, Camera, ArrowRight, ShieldCheck, Star, Video, Award, Heart } from 'lucide-react';

const PackageCard = ({ pkg, onBook }) => {
  const [inView, setInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.6 } // Triggers when 60% of the card is visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  // On mobile (and desktop), auto-trigger hover-like state when scrolled securely into view
  const isHighlighted = inView;

  return (
    <div
      ref={cardRef}
      className={`relative rounded-3xl bg-studio-card border ${pkg.borderColor} p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 shadow-2xl group ${
        pkg.popular ? 'lg:-mt-4 lg:mb-4 bg-gradient-to-b from-[#1c1c26] to-studio-card ring-2 ring-studio-orange' : ''
      }`}
    >
      {/* Popular / Luxury Badge */}
      {pkg.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-white bg-gradient-to-r from-studio-orange to-amber-600 shadow-glow-orange flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{pkg.badge}</span>
        </div>
      )}

      <div>
        {/* Header */}
        <div className="text-center pb-6 border-b border-white/10">
          <h3 className="font-serif text-2xl font-bold text-white group-hover:text-studio-orange transition-colors">
            {pkg.name}
          </h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            {pkg.tagline}
          </p>

          <div className="mt-6">
            <span className="text-xs text-gray-400 block font-semibold uppercase tracking-wider">Package Price</span>
            <div className="font-serif text-4xl sm:text-5xl font-extrabold text-white text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-studio-orange">
              ₹{pkg.price}
            </div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block mt-1">
              ALL INCLUSIVE • NO HIDDEN FEES
            </span>
          </div>
        </div>

        {/* Features List */}
        <div className="py-6 space-y-3">
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
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/25 mb-6">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider mb-2">
              <Gift className="w-4 h-4" />
              <span>Free Complimentary Gifts</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
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
          className={`relative w-full py-4 rounded-2xl font-black text-[14px] sm:text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-500 active:scale-95 group/btn overflow-hidden bg-gradient-to-r from-studio-orange to-amber-700 text-white border border-amber-600/50 ${
            isHighlighted 
              ? 'shadow-[0_8px_30px_rgba(249,115,22,0.7)] scale-105' 
              : 'shadow-[0_8px_20px_rgba(249,115,22,0.2)] hover:scale-105 lg:hover:shadow-[0_8px_30px_rgba(249,115,22,0.7)]'
          }`}
        >
          {/* Hover Sweep/Shine Effect triggered by scroll inView or manual hover */}
          <div 
            className={`absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] transition-all duration-1000 ${
              isHighlighted ? '[transform:skew(-12deg)_translateX(150%)]' : 'group-hover/btn:[transform:skew(-12deg)_translateX(150%)]'
            }`}
          >
            <div className="relative h-full w-12 bg-white/30" />
          </div>
          
          <Camera className={`w-5 h-5 relative z-10 transition-colors duration-500 ${pkg.popular || isHighlighted ? 'text-white' : 'text-studio-orange group-hover/btn:text-white'}`} />
          <span className="relative z-10">BOOK THIS PACKAGE</span>
          <ArrowRight className={`w-5 h-5 relative z-10 transition-all duration-500 ${isHighlighted ? 'translate-x-1.5' : 'group-hover/btn:translate-x-1.5'} ${pkg.popular || isHighlighted ? 'text-white' : 'text-studio-orange group-hover/btn:text-white'}`} />
        </button>

        <p className="text-[10px] text-gray-400 text-center mt-4 leading-relaxed">
          {pkg.terms}
        </p>
      </div>
    </div>
  );
};

export default function Packages({ onOpenPhotographyInquiry, overrideWhatsapp = null }) {

  const handlePackageWhatsApp = (pkg) => {
    const msg = buildPhotographyInquiryMessage({
      serviceName: `Wedding Package: ${pkg.name} (₹${pkg.price})`,
      eventType: "Reception + Wedding",
      requirements: `Package inclusions: ${pkg.features.slice(0, 5).join(', ')}`
    });

    const link = generateWhatsAppLink(msg, overrideWhatsapp);
    window.open(link, '_blank');
  };

  return (
    <section id="packages" className="py-24 bg-[#08080a] relative border-t border-white/10 overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-studio-orange/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-4 h-4 text-amber-400" />
            <span>RECEPTION & WEDDING PACKAGES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            SELECT YOUR <span className="text-studio-orange">WEDDING PACKAGE</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg mt-3 font-serif italic">
            "Complete photo & video solutions tailored for your sacred wedding ceremonies."
          </p>
        </div>

        {/* 3 Package Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {weddingPackages.map((pkg) => (
            <PackageCard 
              key={pkg.id} 
              pkg={pkg} 
              onBook={handlePackageWhatsApp} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
