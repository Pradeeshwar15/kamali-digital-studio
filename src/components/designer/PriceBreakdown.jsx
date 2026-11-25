import React from 'react';
import { calculateFramePrice } from '../../utils/priceCalculator.js';
import { frameStyles } from '../../data/frames.js';
import { frameSizes, mattingOptions } from '../../data/pricing.js';
import { Calculator, MessageSquare, Plus, Minus, Info } from 'lucide-react';

export default function PriceBreakdown({
  frameId,
  sizeId,
  mattingId,
  quantity,
  onQuantityChange,
  onOpenOrderModal
}) {
  const selectedFrame = frameStyles.find(f => f.id === frameId) || frameStyles[0];
  const selectedSize = frameSizes.find(s => s.id === sizeId) || frameSizes[4];
  const selectedMatting = mattingOptions.find(m => m.id === mattingId) || mattingOptions[0];

  const basePricing = calculateFramePrice({ frameId, sizeId, mattingId, quantity });
  const formattedGrandTotal = `₹${basePricing.grandTotal.toLocaleString('en-IN')}`;

  return (
    <div className="bg-studio-card p-6 rounded-2xl border border-white/10 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
          <Calculator className="w-4 h-4 text-studio-orange" />
          <span>Estimated Price Summary</span>
        </h3>
        <span className="text-[10px] font-bold text-studio-orange uppercase tracking-wider bg-studio-orange/10 px-2.5 py-1 rounded-full">
          Transparent Quote
        </span>
      </div>

      <div className="space-y-2 text-xs text-gray-300">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Selected Frame Moulding:</span>
          <span className="font-bold text-white">{selectedFrame.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Size & Base Amount ({selectedSize.label}):</span>
          <span className="font-bold text-white">₹{selectedSize.price.toLocaleString('en-IN')}</span>
        </div>
        {selectedMatting.id !== 'none' && (
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Mat Board ({selectedMatting.label}):</span>
            <span className="font-bold text-white">Included</span>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-300">Quantity</span>
        <div className="flex items-center gap-3 bg-black/50 px-3 py-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="font-bold text-sm text-white px-2">{quantity}</span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 block font-medium">Estimated Total Price</span>
          <span className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5">
            <Info className="w-3 h-3" />
            <span>Final price confirmed via WhatsApp</span>
          </span>
        </div>

        <div className="text-right">
          <span className="font-serif text-3xl font-extrabold text-white text-transparent bg-clip-text bg-gradient-to-r from-studio-orange to-amber-300">
            {formattedGrandTotal}
          </span>
        </div>
      </div>

      <button
        onClick={onOpenOrderModal}
        className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition-all"
      >
        <MessageSquare className="w-5 h-5" />
        <span>ORDER VIA WHATSAPP</span>
      </button>
    </div>
  );
}
