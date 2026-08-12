import React from 'react';
import { frameSizes, frameFinishes, mattingOptions } from '../../data/pricing.js';
import { Check, Type, Sparkles, Sliders } from 'lucide-react';

export default function StepCustomization({
  selectedSizeId,
  onSelectSize,
  selectedFinishId,
  onSelectFinish,
  selectedMattingId,
  onSelectMatting,
  customText,
  onCustomTextChange,
  textFont,
  onTextFontChange,
  textColor,
  onTextColorChange
}) {
  return (
    <div className="space-y-6">
      
      {/* STEP 3: SIZE SELECTION */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-studio-orange text-white text-xs flex items-center justify-center font-bold">3</span>
            <span>Choose Size</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {frameSizes.map((size) => {
            const isSelected = selectedSizeId === size.id;
            return (
              <button
                key={size.id}
                onClick={() => onSelectSize(size.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-studio-orange/15 border-studio-orange shadow-glow-orange ring-1 ring-studio-orange'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-bold text-white">{size.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-studio-orange" />}
                </div>
                <span className="text-[11px] text-gray-400 block mt-0.5">{size.tag}</span>
                <span className="text-[11px] font-semibold text-studio-orange block mt-1">+₹{size.priceAddon}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 4: FINISH SELECTION */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-studio-orange text-white text-xs flex items-center justify-center font-bold">4</span>
            <span>Select Print Finish</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {frameFinishes.map((finish) => {
            const isSelected = selectedFinishId === finish.id;
            return (
              <button
                key={finish.id}
                onClick={() => onSelectFinish(finish.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-studio-orange/15 border-studio-orange shadow-glow-orange'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <span className="font-serif text-xs font-bold text-white block">{finish.label}</span>
                <span className="text-[10px] text-studio-orange font-semibold block mt-0.5">+₹{finish.priceAddon}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MATTING / PASSEPARTOUT */}
      <div>
        <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Inner Mat Board (Passepartout)</label>
        <div className="grid grid-cols-3 gap-2">
          {mattingOptions.map((mat) => {
            const isSelected = selectedMattingId === mat.id;
            return (
              <button
                key={mat.id}
                onClick={() => onSelectMatting(mat.id)}
                className={`p-2.5 rounded-xl border text-center transition-all text-xs font-semibold ${
                  isSelected
                    ? 'bg-studio-orange/20 border-studio-orange text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <span>{mat.label.split(' ')[0]}</span>
                {mat.priceAddon > 0 && <span className="block text-[10px] text-studio-orange mt-0.5">+₹{mat.priceAddon}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 5: OPTIONAL CUSTOM INSCRIPTION TEXT */}
      <div className="pt-2 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-studio-orange text-white text-xs flex items-center justify-center font-bold">5</span>
            <span>Add Custom Text</span>
          </h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">Free Addon</span>
        </div>

        <input
          type="text"
          maxLength={60}
          value={customText}
          onChange={(e) => onCustomTextChange(e.target.value)}
          placeholder="e.g. Happy Birthday Mom ❤️ or 24.12.2025"
          className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-studio-orange mb-3"
        />

        {customText.trim() && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Font Style</label>
              <select
                value={textFont}
                onChange={(e) => onTextFontChange(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/20 text-white text-xs"
              >
                <option value="font-serif">Classic Serif</option>
                <option value="font-sans">Modern Sans</option>
                <option value="font-script">Script Elegant</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Color</label>
              <select
                value={textColor}
                onChange={(e) => onTextColorChange(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/20 text-white text-xs"
              >
                <option value="#D4AF37">Gold Foil</option>
                <option value="#FFFFFF">Crisp White</option>
                <option value="#000000">Deep Black</option>
                <option value="#C0C0C0">Silver Foil</option>
              </select>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
