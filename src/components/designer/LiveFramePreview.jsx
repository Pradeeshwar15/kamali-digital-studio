import React, { useState } from 'react';
import { frameStyles } from '../../data/frames.js';
import { mattingOptions, frameSizes } from '../../data/pricing.js';
import { photoFilters } from './StepPhotoUpload.jsx';
import { Eye, Palette, Users } from 'lucide-react';

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
  const selectedSize = frameSizes.find(s => s.id === sizeId) || frameSizes[4];
  const filterCss = photoFilters.find(f => f.id === activeFilter)?.cssFilter || "none";

  const defaultPhoto = "/images/gallery/Portraits/baby1.webp";
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

        {/* Scale Toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowScaleRef(!showScaleRef)}
            className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 font-semibold ${showScaleRef ? 'bg-studio-orange/20 text-studio-orange border-studio-orange' : 'bg-white/5 text-gray-400 border-white/10'}`}
            title="Toggle Furniture Scale Reference"
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Scale Ref</span>
          </button>
        </div>

      </div>

      {/* Main Centered 3D Realistic Frame Visualizer */}
      <div className="relative z-10 my-auto py-6 sm:py-10 flex flex-col items-center justify-center">
        
        {/* Frame Outer Structure */}
        <div 
          className={`relative transition-all duration-500 ${selectedFrame.borderClass} max-w-full shadow-2xl flex items-center justify-center`}
          style={{
            maxWidth: selectedSize.id === '24x36' ? '92%' : selectedSize.id === '6x8' ? '65%' : '80%'
          }}
        >
          {/* Optional Passepartout Matting */}
          <div 
            className="w-full h-full p-2 sm:p-5 transition-all duration-300 flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: selectedMatting.color }}
          >
            {/* The Photo Container with Dynamic Aspect Ratio */}
            <div 
              className="relative overflow-hidden shadow-inner max-w-full max-h-[380px] sm:max-h-[460px] flex items-center justify-center"
              style={{
                aspectRatio: selectedSize.aspectRatio || '4/5'
              }}
            >
              <img
                src={displayPhoto}
                alt="Framed Photograph"
                className="w-full h-full object-cover transition-all duration-300"
                style={{ filter: filterCss }}
              />

              {/* Anti-Reflective Subtle Glass Glare */}
              {showGlare && (
                <div 
                  className="absolute inset-0 pointer-events-none opacity-25 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                />
              )}

              {/* Custom Text Inscription Overlay */}
              {customText && customText.trim() && (
                <div 
                  className={`absolute bottom-3 left-0 right-0 px-4 text-center font-bold tracking-wider drop-shadow-md ${textFont}`}
                  style={{ color: textColor }}
                >
                  <span className="text-xs sm:text-sm bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 inline-block">
                    {customText}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Realistic Wall Shadow under frame */}
        <div className="w-2/3 h-4 bg-black/60 rounded-full blur-xl mt-4" />

        {/* Furniture Scale Reference Graphic */}
        {showScaleRef && (
          <div className="mt-4 pt-3 border-t border-white/10 w-full flex items-center justify-between text-[11px] text-gray-400">
            <span>Wall Width: ~3.2m</span>
            <span className="text-studio-orange font-bold">Standard 3-Seater Sofa Height Reference</span>
            <span>Eye Level: ~1.5m</span>
          </div>
        )}

      </div>

      {/* Frame Dimensions & Specs Bottom Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-white">{selectedFrame.name}</span>
          <span className="text-gray-400">•</span>
          <span className="text-studio-orange font-semibold">{selectedSize.label} ({selectedSize.dimensions})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-extrabold">₹{selectedSize.price.toLocaleString('en-IN')}</span>
          <span className="text-gray-400">•</span>
          <span className="text-emerald-400 font-bold">100% HD Print Guarantee</span>
        </div>
      </div>

    </div>
  );
}
