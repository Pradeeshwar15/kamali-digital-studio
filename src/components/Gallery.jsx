import React, { useState, useEffect, useRef } from 'react';
import { galleryCategories, galleryItems } from '../data/gallery.js';
import Lightbox from './Lightbox.jsx';
import { Camera, Eye, Frame, Sparkles, MapPin, ArrowRight, Loader2, ChevronDown } from 'lucide-react';

// Reusable Image component with Skeleton Loader & Anti-Theft Shield
const ImageWithSkeleton = ({ src, alt, aspectRatio, className }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative w-full ${aspectRatio || 'aspect-[3/4]'} bg-white/5 overflow-hidden select-none`}>
      {!loaded && (
        <div className="absolute inset-0 bg-white/10 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        draggable="false"
        onContextMenu={(e) => e.preventDefault()}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none select-none`}
      />
      {/* Invisible Transparent Anti-Theft Pointer Shield */}
      <div 
        className="absolute inset-0 z-[5] bg-transparent select-none cursor-pointer"
        onContextMenu={(e) => e.preventDefault()}
        aria-hidden="true"
      />
    </div>
  );
};

export default function Gallery({ onFrameThisPhoto, onBookPhotography, isFullPortfolio = false }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  
  // Dashboard Compact vs Full Portfolio Mode
  // If isFullPortfolio is true (e.g. user clicked "Our Work" in menu), open full portfolio directly
  const [showAll, setShowAll] = useState(false);
  const isExpanded = isFullPortfolio || showAll;

  // Pagination State for Full Portfolio View
  const [visibleCount, setVisibleCount] = useState(12);
  const loaderRef = useRef(null);

  const filteredItems = selectedCategory === "ALL"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  // Curated 6-photo spotlight for compact homepage dashboard
  const spotlightItems = [
    galleryItems[0] || galleryItems[1], // Wedding highlight
    galleryItems.find(i => i.category === "Portraits") || galleryItems[2],
    galleryItems.find(i => i.category === "Candid") || galleryItems[3],
    galleryItems.find(i => i.category === "Events") || galleryItems[4],
    galleryItems.find(i => i.category === "Traditional") || galleryItems[5],
    galleryItems.find(i => i.category === "Outdoor" || i.category === "Pre-wedding") || galleryItems[6]
  ].filter(Boolean);

  // Reset pagination when changing categories
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory]);

  // Infinite Scroll Observer for Full Portfolio View
  useEffect(() => {
    if (!isExpanded) return;
    if (visibleCount >= filteredItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 12, filteredItems.length));
          }, 300);
        }
      },
      { rootMargin: "600px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [visibleCount, filteredItems.length, isExpanded]);

  const visibleItems = isExpanded
    ? filteredItems.slice(0, visibleCount)
    : spotlightItems;

  const handlePrevItem = () => {
    if (activeItemIndex !== null) {
      const items = isExpanded ? filteredItems : spotlightItems;
      setActiveItemIndex(activeItemIndex === 0 ? items.length - 1 : activeItemIndex - 1);
    }
  };

  const handleNextItem = () => {
    if (activeItemIndex !== null) {
      const items = isExpanded ? filteredItems : spotlightItems;
      setActiveItemIndex(activeItemIndex === items.length - 1 ? 0 : activeItemIndex + 1);
    }
  };

  return (
    <section id="gallery" className="py-10 sm:py-16 md:py-20 bg-[#0a0a0c] border-t border-white/10 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-studio-orange/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-studio-orange/10 border border-studio-orange/30 text-studio-orange text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2.5">
            <Camera className="w-3.5 h-3.5 text-studio-orange" />
            <span>AUTHENTIC STUDIO PORTFOLIO</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
            OUR FEATURED <span className="text-studio-orange">WORK & ALBUMS</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-lg mt-2 font-serif italic">
            "Every frame tells a story of love, emotion, and timeless memories."
          </p>

          {/* Mode Pill Indicator */}
          {!isExpanded ? (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-amber-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Viewing Curated Studio Highlights (6 Selected Photos)</span>
            </div>
          ) : (
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-xs text-emerald-400 font-semibold">
                ● Full Portfolio Active ({filteredItems.length} photos)
              </span>
              {!isFullPortfolio && (
                <button
                  onClick={() => setShowAll(false)}
                  className="text-xs text-gray-400 hover:text-white underline underline-offset-4"
                >
                  Collapse to Highlights
                </button>
              )}
            </div>
          )}
        </div>

        {/* CATEGORY FILTER BAR (Shown in Full Portfolio Mode) */}
        {isExpanded && (
          <div className="flex items-center justify-start sm:justify-center flex-nowrap sm:flex-wrap gap-2 overflow-x-auto sm:overflow-visible pb-3 sm:pb-2 mb-6 sm:mb-10 no-scrollbar bg-white/5 p-1.5 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-md">
            {galleryCategories.map((cat) => {
              const count = cat === "ALL" ? galleryItems.length : galleryItems.filter(i => i.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-1 sm:gap-2 ${
                    isSelected
                      ? 'bg-studio-orange text-white shadow-glow-orange scale-105'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold ${isSelected ? 'bg-black/30 text-white' : 'bg-white/10 text-gray-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* PHOTO GRID — Compact 6 Spotlight on Dashboard OR Full Masonry on Demand */}
        <div className={`columns-2 ${isExpanded ? 'lg:columns-3' : 'lg:columns-3'} gap-3 space-y-3 sm:gap-5 sm:space-y-5`}>
          {visibleItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setActiveItemIndex(index)}
              className="break-inside-avoid relative rounded-xl sm:rounded-2xl overflow-hidden bg-studio-card border border-white/10 group cursor-pointer shadow-lg hover:shadow-glow-orange transition-all duration-500 hover:-translate-y-1"
            >
              {/* Natural Aspect Image with Skeleton Loader */}
              <ImageWithSkeleton
                src={item.image}
                alt={item.title}
                aspectRatio={item.aspectRatio}
                className="group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Category Pill Tag */}
              <div className="absolute top-2 left-2 z-10">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-extrabold uppercase tracking-widest text-white bg-black/70 border border-white/15 backdrop-blur-md shadow-md">
                  {item.category}
                </span>
              </div>

              {/* Animated Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-5 flex flex-col justify-between z-20">
                
                {/* Top Right Action Icons */}
                <div className="flex justify-end gap-1.5 sm:gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFrameThisPhoto && onFrameThisPhoto(item.image);
                    }}
                    className="p-1.5 sm:p-2.5 rounded-full bg-studio-orange text-white shadow-lg hover:scale-110 transition-transform"
                    title="Frame this photo in 3D customizer"
                  >
                    <Frame className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveItemIndex(index);
                    }}
                    className="p-1.5 sm:p-2.5 rounded-full bg-black/80 text-white border border-white/20 hover:scale-110 transition-transform"
                    title="Expand Lightbox"
                  >
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Bottom Overlay Info */}
                <div>
                  {item.location && (
                    <span className="text-[9px] sm:text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-0.5 flex items-center gap-0.5 sm:gap-1">
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="truncate">{item.location}</span>
                    </span>
                  )}

                  <h3 className="font-serif text-xs sm:text-lg font-bold text-white mb-0.5 sm:mb-1 line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="hidden sm:block text-gray-300 text-xs line-clamp-2 mb-3">
                    {item.caption}
                  </p>

                  <div className="flex items-center justify-between pt-1 sm:pt-2 border-t border-white/15 text-[9px] sm:text-[11px] font-bold text-studio-orange">
                    <span className="flex items-center gap-1 truncate">
                      <Camera className="w-3 h-3" />
                      <span className="truncate">{item.tag}</span>
                    </span>
                    <span className="hidden sm:flex group-hover:translate-x-1 transition-transform items-center gap-1 text-white">
                      <span>VIEW PHOTO</span>
                      <ArrowRight className="w-3.5 h-3.5 text-studio-orange" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COMPACT DASHBOARD CALL TO ACTION BANNER (Shown when viewing highlights) */}
        {!isExpanded && (
          <div className="mt-10 sm:mt-14 text-center bg-gradient-to-r from-white/[0.03] via-studio-orange/[0.08] to-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Authentic Studio Archive • 46+ Real Client Moments
            </span>
            <h3 className="font-serif text-xl sm:text-3xl font-extrabold text-white mb-2">
              Want to see our full wedding, portrait, and event albums?
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              Browse our complete portfolio categorized by Weddings, Candid, Traditional Ceremonies, Pre-wedding, Events, and Baby Milestones.
            </p>
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-studio-orange to-amber-600 hover:from-studio-orangeHover hover:to-amber-700 shadow-glow-orange transform hover:-translate-y-0.5 transition-all"
            >
              <span>EXPLORE FULL PORTFOLIO (46+ PHOTOS)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Infinite Scroll Loader Trigger (Shown in Full Portfolio Mode) */}
        {isExpanded && visibleCount < filteredItems.length && (
          <div ref={loaderRef} className="w-full py-16 flex justify-center items-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-studio-orange animate-spin" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Loading More Photos...</span>
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {activeItemIndex !== null && (isExpanded ? filteredItems : spotlightItems)[activeItemIndex] && (
        <Lightbox
          item={(isExpanded ? filteredItems : spotlightItems)[activeItemIndex]}
          currentIndex={activeItemIndex}
          totalItems={(isExpanded ? filteredItems : spotlightItems).length}
          onClose={() => setActiveItemIndex(null)}
          onPrev={handlePrevItem}
          onNext={handleNextItem}
          onFrameThisPhoto={onFrameThisPhoto}
          onBookPhotography={onBookPhotography}
        />
      )}
    </section>
  );
}
