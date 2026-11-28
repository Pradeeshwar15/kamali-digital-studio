import React from 'react';
import { frameStyles } from '../../data/frames.js';
import { Check, Sparkles } from 'lucide-react';

export default function StepFrameSelect({ selectedFrameId, onSelectFrame }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-studio-orange text-white text-xs flex items-center justify-center font-bold">1</span>
          <span>Our Frame Collections</span>
        </h3>
        <span className="text-xs text-amber-400 font-semibold">4 Signature Mouldings</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {frameStyles.map((frame) => {
          const isSelected = selectedFrameId === frame.id;
          return (
            <button
              key={frame.id}
              onClick={() => onSelectFrame(frame.id)}
              className={`relative p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-studio-orange/15 border-studio-orange shadow-glow-orange ring-1 ring-studio-orange'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-studio-orange text-white flex items-center justify-center shadow-md">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}

              <div className="w-full h-12 rounded-lg mb-2 overflow-hidden bg-black/40 border border-white/10 relative flex items-center justify-center p-1">
                <div 
                  className={`w-full h-full rounded shadow-sm ${frame.borderClass}`}
                  style={{ borderWidth: '6px' }}
                />
              </div>

              <div>
                <span className="font-serif text-sm font-bold text-white block truncate">
                  {frame.name}
                </span>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  {frame.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
