import React from 'react';
import { X, Frame, MapPin, Sparkles, Tag, Camera } from 'lucide-react';

export default function Lightbox({ item, onClose, onFrameThisPhoto, onBookPhotography }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl animate-fadeIn">
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 border border-white/10"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-5xl w-full bg-studio-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Large Image Preview */}
        <div className="flex-1 bg-black flex items-center justify-center relative p-2 min-h-[300px] md:min-h-[500px]">
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
          />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-studio-orange shadow-md">
            {item.category}
          </span>
        </div>

        {/* Details & Actions Side Panel */}
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

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {item.caption}
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                onClose();
                onBookPhotography && onBookPhotography(item.category);
              }}
              className="w-full py-3 rounded-xl font-bold text-xs text-white bg-studio-orange hover:bg-studio-orangeHover shadow-glow-orange flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>BOOK THIS PHOTOGRAPHY STYLE</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onFrameThisPhoto && onFrameThisPhoto(item.image);
              }}
              className="w-full py-3 rounded-xl font-bold text-xs text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2"
            >
              <Frame className="w-4 h-4 text-studio-orange" />
              <span>TURN THIS PHOTO INTO A FRAME</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 rounded-xl font-semibold text-[11px] text-gray-500 hover:text-gray-300 text-center"
            >
              Close View
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
