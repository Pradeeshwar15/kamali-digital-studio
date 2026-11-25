import React, { useState } from 'react';
import { frameStyles } from '../../data/frames.js';
import { mattingOptions, frameSizes } from '../../data/pricing.js';
import { photoFilters } from './StepPhotoUpload.jsx';
import { Eye, Sun, Layers, Sparkles, Palette, Users } from 'lucide-react';

const wallPaintColors = [
  { id: "default", label: "Default Dark", hex: "transparent" },
  { id: "cream", label: "Warm Cream", hex: "#f3eed9" },
  { id: "navy", label: "Midnight Navy", hex: "#1a2536" },
  { id: "charcoal", label: "Deep Charcoal", hex: "#25272c" },
  { id: "emerald", label: "Royal Emerald", hex: "#162e24" },
  { id: "terracotta", label: "Warm Terracotta", hex: "#3e241d" }
];

export default function LiveFramePreview({
  frameId,
  photoUrl,
  sizeId,
  finishId,
  mattingId,
  customText,
  textFont,
  textColor,
  activeFilter = "none"
}) {
  const [roomBg, setRoomBg] = useState("living");
  const [wallColorHex, setWallColorHex] = useState("transparent");
  const [showGlare, setShowGlare] = useState(true);
  const [showScaleRef, setShowScaleRef] = useState(false);

  const selectedFrame = frameStyles.find(f => f.id === frameId) || frameStyles[0];
  const selectedMatting = mattingOptions.find(m => m.id === mattingId) || mattingOptions[0];
  const selectedSize = frameSizes.find(s => s.id === sizeId) || frameSizes[1];
  const filterCss = photoFilters.find(f => f.id === activeFilter)?.cssFilter || "none";

  const defaultPhoto = "/images/gallery/wedding/wedding1.webp";
  const displayPhoto = photoUrl || defaultPhoto;

  const bgClasses = {
    living: "bg-room-living",
    gallery: "bg-room-gallery",
    minimal: "bg-room-minimal"
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between p-6 min-h-[440px] sm:min-h-[580px] transition-all">
      
      {/* Dynamic Environment Wall Backdrop */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${bgClasses[roomBg]}`}
        style={{
          backgroundColor: wallColorHex !== 'transparent' ? wallColorHex : undefined,
          backgroundImage: wallColorHex !== 'transparent' ? 'none' : undefined
        }}
      />

      {/* Top Controls Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-black/70 backdrop-blur-md p-2.5 rounded-xl border border-white/10 text-xs">
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setRoomBg('living'); setWallColorHex('transparent'); }}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${roomBg === 'living' && wallColorHex === 'transparent' ? 'bg-studio-orange text-white' : 'text-gray-300 hover:bg-white/10'}`}
          >
            Living Room
          </button>
          <button
            onClick={() => { setRoomBg('gallery'); setWallColorHex('transparent'); }}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${roomBg === 'gallery' && wallColorHex === 'transparent' ? 'bg-studio-orange text-white' : 'text-gray-300 hover:bg-white/10'}`}
          >
            Gallery Wall
          </button>
        </div>

        {/* Wall Paint Swatches */}
        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-lg border border-white/10">
          <Palette className="w-3.5 h-3.5 text-studio-orange ml-1" />
          <span className="text-[10px] text-gray-400 font-semibold hidden md:inline">Wall Paint:</span>
          {wallPaintColors.slice(1).map((paint) => (
            <button
              key={paint.id}
              onClick={() => setWallColorHex(paint.hex)}
              className={`w-4 h-4 rounded-full border border-white/20 transition-transform ${wallColorHex === paint.hex ? 'scale-125 ring-2 ring-studio-orange' : 'hover:scale-110'}`}
              style={{ backgroundColor: paint.hex }}
              title={paint.label}
            />
          ))}
        </div>

        {/* Scale & Glare Toggles */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowScaleRef(!showScaleRef)}
            className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 font-semibold ${showScaleRef ? 'bg-studio-orange/20 text-studio-orange border-studio-orange' : 'bg-white/5 text-gray-400 border-white/10'}`}
            title="Toggle Furniture Scale Reference"
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Scale Ref</span>
          </button>

          <button
            onClick={() => setShowGlare(!showGlare)}
            className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 font-semibold ${showGlare ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-white/5 text-gray-400 border-white/10'}`}
            title="Toggle Anti-Glare Glass Simulation"
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Glass Glare</span>
          </button>
        </div>

      </div>

      {/* CENTERPIECE: REALISTIC PHYSICAL FRAME VISUALIZER */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-8">
        
        {showScaleRef && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-72 h-16 bg-white/10 rounded-t-2xl border-t border-x border-white/20 backdrop-blur-sm pointer-events-none flex items-center justify-center text-[11px] font-bold text-gray-300">
            🛋️ Living Room Sofa Silhouette Scale Reference
          </div>
        )}

        <div 
          className={`relative max-w-full max-h-[380px] sm:max-h-[460px] transition-all duration-300 transform hover:scale-[1.02] ${selectedFrame.borderClass}`}
          style={{
            aspectRatio: selectedSize.aspectRatio || "3/4",
            padding: selectedMatting.id !== 'none' ? '20px' : '0px',
            backgroundColor: selectedMatting.color !== 'transparent' ? selectedMatting.color : undefined
          }}
        >
          {showGlare && (
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20" />
          )}

          <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center shadow-inner">
            <img
              src={displayPhoto}
              alt="Live Custom Frame Preview"
              className="w-full h-full object-cover transition-transform duration-300"
              style={{ filter: filterCss }}
            />

            {customText.trim() && (
              <div className="absolute bottom-3 left-0 right-0 text-center px-4 z-30 pointer-events-none drop-shadow-md">
                <span 
                  className={`text-sm sm:text-base font-bold tracking-wide ${textFont}`}
                  style={{ color: textColor }}
                >
                  {customText.trim()}
                </span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Live Info Badge */}
      <div className="relative z-10 flex items-center justify-between text-xs text-gray-300 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-studio-orange animate-pulse" />
          <span className="font-serif font-bold text-white">{selectedFrame.name}</span>
          <span className="text-gray-400">• {selectedSize.label} ({selectedSize.dimensions})</span>
        </div>
        <span className="text-studio-orange font-bold uppercase tracking-wider text-[10px]">Real-Time 3D Visualizer</span>
      </div>

    </div>
  );
}
