import React, { useState } from 'react';
import { galleryCategories, galleryItems } from '../data/gallery.js';
import Lightbox from './Lightbox.jsx';
import { Camera, Eye, Frame, Sparkles, MapPin, ArrowRight, Layers, Heart } from 'lucide-react';

export default function Gallery({ onFrameThisPhoto, onBookPhotography }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activeItemIndex, setActiveItemIndex] = useState(null);

  const filteredItems = selectedCategory === "ALL"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const heroFeaturedItem = galleryItems[0];

  const handlePrevItem = () => {
    if (activeItemIndex !== null) {
      setActiveItemIndex(activeItemIndex === 0 ? filteredItems.length - 1 : activeItemIndex - 1);
    }
  };

  const handleNextItem = () => {
    if (activeItemIndex !== null) {
      setActiveItemIndex(activeItemIndex === filteredItems.length - 1 ? 0 : activeItemIndex + 1);
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#0a0a0c] border-t border-white/10 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-studio-orange/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
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
        </div>

        {/* HERO FEATURED PORTFOLIO SPOTLIGHT BANNER */}
        {heroFeaturedItem && (
          <div className="mb-8 sm:mb-14 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl group cursor-pointer"
               onClick={() => {
                 const idx = filteredItems.findIndex(i => i.id === heroFeaturedItem.id);
                 setActiveItemIndex(idx !== -1 ? idx : 0);
               }}>
            
            <div className="relative h-[260px] sm:h-[420px] w-full overflow-hidden bg-black">
              <img
                src={heroFeaturedItem.image}
                alt={heroFeaturedItem.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Top Spotlight Badge */}
              <div className="absolute top-3 left-3 sm:top-6 sm:left-6 flex items-center gap-2">
                <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-extrabold uppercase tracking-widest text-white bg-studio-orange shadow-glow-orange flex items-center gap-1">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>FEATURED PORTFOLIO STORY</span>
                </span>
              </div>

              {/* Bottom Spotlight Content */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-studio-orange uppercase tracking-wider block mb-0.5 sm:mb-1">
                    {heroFeaturedItem.category} • {heroFeaturedItem.location}
                  </span>
                  <h3 className="font-serif text-lg sm:text-4xl font-extrabold text-white leading-tight">
                    {heroFeaturedItem.title}
                  </h3>
                  <p className="hidden sm:block text-xs sm:text-sm text-gray-300 max-w-xl mt-1 line-clamp-2">
                    {heroFeaturedItem.caption}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFrameThisPhoto && onFrameThisPhoto(heroFeaturedItem.image);
                    }}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs text-white bg-white/10 hover:bg-studio-orange border border-white/15 backdrop-blur-md transition-all flex items-center gap-1.5"
                  >
                    <Frame className="w-3.5 h-3.5 text-studio-orange group-hover:text-white" />
                    <span>FRAME THIS</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookPhotography && onBookPhotography(heroFeaturedItem.category);
                    }}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs text-white bg-studio-orange hover:bg-studio-orangeHover shadow-glow-orange transition-all flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>BOOK SHOOT</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* CATEGORY FILTER BAR (Mobile Scrollable) */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-3 mb-6 sm:mb-12 no-scrollbar bg-white/5 p-1.5 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-md">
          {galleryCategories.map((cat) => {
            const count = cat === "ALL" ? galleryItems.length : galleryItems.filter(i => i.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 whitespace-nowrap flex items-center gap-1 sm:gap-2 ${
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

        {/* DYNAMIC MASONRY WALL GRID — 2 COLUMNS ON MOBILE (columns-2 lg:columns-3) */}
        <div className="columns-2 lg:columns-3 gap-3 space-y-3 sm:gap-5 sm:space-y-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveItemIndex(index)}
              className="break-inside-avoid relative rounded-xl sm:rounded-2xl overflow-hidden bg-studio-card border border-white/10 group cursor-pointer shadow-lg hover:shadow-glow-orange transition-all duration-500 hover:-translate-y-1"
            >
              {/* Natural Aspect Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
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
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3.5 h-3.5 text-studio-orange" />
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItemIndex !== null && filteredItems[activeItemIndex] && (
        <Lightbox
          item={filteredItems[activeItemIndex]}
          currentIndex={activeItemIndex}
          totalItems={filteredItems.length}
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
