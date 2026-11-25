import React, { useEffect } from 'react';
import { X, Frame, MapPin, Sparkles, Tag, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalItems,
  onFrameThisPhoto,
  onBookPhotography
}) {
  if (!item) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-fadeIn">
      
      {/* Top Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
        <span className="px-3.5 py-1.5 rounded-full bg-black/80 border border-white/10 text-white text-xs font-bold pointer-events-auto backdrop-blur-md">
          {item.category} • Photo {currentIndex + 1} of {totalItems}
        </span>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-black/80 text-white hover:bg-studio-orange transition-colors pointer-events-auto border border-white/10 shadow-2xl"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Lightbox Card */}
      <div className="max-w-5xl w-full bg-studio-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] relative">
        
        {/* Previous Button */}
        {onPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/70 text-white hover:bg-studio-orange transition-all border border-white/10 shadow-2xl hover:scale-110"
            title="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {onNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/70 text-white hover:bg-studio-orange transition-all border border-white/10 shadow-2xl hover:scale-110 md:right-84"
            title="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Large Image View with Multi-Layer Anti-Theft Protection */}
        <div className="flex-1 bg-black flex items-center justify-center relative p-3 min-h-[320px] md:min-h-[520px] select-none overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl transition-all duration-300 pointer-events-none select-none"
          />

          {/* Diagonal Semi-Transparent Studio Security Watermark Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-10">
            <div className="transform -rotate-25 text-white/15 font-serif font-black text-xl sm:text-3xl md:text-4xl tracking-[0.25em] uppercase border-y border-white/10 py-3 sm:py-4 px-6 sm:px-12 text-center whitespace-nowrap shadow-sm backdrop-blur-[0.5px]">
              Kamali Studio & Digital Lab
            </div>
          </div>

          {/* Bottom Right Studio Copyright Badge */}
          <div className="absolute bottom-4 right-4 z-10 px-2.5 py-1 rounded-md bg-black/60 border border-white/10 backdrop-blur-md pointer-events-none text-[10px] text-gray-300 font-medium tracking-wide">
            © Protected Portfolio
          </div>

          {/* Transparent Pointer-Shield Overlay */}
          <div
            className="absolute inset-0 z-20 bg-transparent cursor-default select-none"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>

        {/* Details & Action Controls */}
        <div className="w-full md:w-80 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-[#101014]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-studio-orange uppercase tracking-wider mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>{item.tag}</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-3">
              {item.title}
            </h3>

            {item.location && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
                <MapPin className="w-3.5 h-3.5 text-studio-orange" />
                <span>{item.location}</span>
              </div>
            )}

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
              {item.caption}
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                onClose();
                onFrameThisPhoto && onFrameThisPhoto(item.image);
              }}
              className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-studio-orange to-amber-600 hover:from-studio-orangeHover hover:to-amber-700 shadow-glow-orange flex items-center justify-center gap-2"
            >
              <Frame className="w-4 h-4" />
              <span>FRAME THIS PHOTO IN 3D DESIGNER</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onBookPhotography && onBookPhotography(item.category);
              }}
              className="w-full py-3.5 rounded-xl font-bold text-xs text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4 text-studio-orange" />
              <span>BOOK THIS SHOOT STYLE</span>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
