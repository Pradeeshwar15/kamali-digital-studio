import React from 'react';
import { frameSizes } from '../../data/pricing.js';
import { Check, Type, Sparkles } from 'lucide-react';

export default function StepCustomization({
  selectedSizeId,
  onSelectSize,
  customText,
  onCustomTextChange,
  textFont,
  onTextFontChange,
  textColor,
  onTextColorChange
}) {
  return (
    <div className="space-y-6">
      
      {/* STEP 3: SIZE SELECTION (Exact 9 sizes from poster) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-studio-orange text-white text-xs flex items-center justify-center font-bold">3</span>
            <span>Choose Size & Pricing</span>
          </h3>
          <span className="text-xs text-amber-400 font-semibold">Official Menu Rates</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {frameSizes.map((size) => {
            const isSelected = selectedSizeId === size.id;
            return (
              <button
                key={size.id}
                onClick={() => onSelectSize(size.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-studio-orange/15 border-studio-orange shadow-glow-orange ring-1 ring-studio-orange'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-bold text-white">{size.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-studio-orange" />}
                </div>
                <span className="text-[10px] text-gray-400 block mt-0.5">{size.dimensions}</span>
                <span className="text-xs font-extrabold text-studio-orange block mt-1.5">
                  ₹{size.price.toLocaleString('en-IN')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 4: CUSTOM TEXT INSCRIPTION */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-gray-300 uppercase flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-studio-orange" />
            <span>Add Custom Text Inscription (Optional)</span>
          </label>
          <span className="text-[11px] text-gray-400">Free Inscription</span>
        </div>

        <input
          type="text"
          maxLength={50}
          placeholder="e.g. Anand & Divya • 24.02.2026"
          value={customText}
          onChange={(e) => onCustomTextChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-studio-orange text-sm transition-colors"
        />

        {customText.trim() && (
          <div className="mt-3 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-400">Font Style:</span>
              <div className="flex items-center gap-2">
                {[
                  { id: 'font-serif', label: 'Serif' },
                  { id: 'font-sans', label: 'Modern Sans' },
                  { id: 'font-script', label: 'Script' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onTextFontChange(f.id)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold border ${
                      textFont === f.id ? 'bg-studio-orange text-white border-studio-orange' : 'bg-white/5 text-gray-400 border-white/10'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-400">Text Color:</span>
              <div className="flex items-center gap-2">
                {[
                  { hex: '#D4AF37', label: 'Gold' },
                  { hex: '#FFFFFF', label: 'White' },
                  { hex: '#C0C0C0', label: 'Silver' },
                  { hex: '#111115', label: 'Dark' }
                ].map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => onTextColorChange(c.hex)}
                    className={`w-5 h-5 rounded-full border border-white/20 transition-transform ${textColor === c.hex ? 'scale-125 ring-2 ring-studio-orange' : ''}`}
                    style={{ backgroundColor: c.hex }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
