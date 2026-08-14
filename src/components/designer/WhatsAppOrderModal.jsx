import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { generateWhatsAppLink, buildWhatsAppOrderMessage } from '../../utils/whatsappHelper.js';
import { calculateFramePrice } from '../../utils/priceCalculator.js';
import { frameStyles } from '../../data/frames.js';
import { frameSizes, frameFinishes, mattingOptions } from '../../data/pricing.js';
import { X, MessageSquare, Copy, Check, Sparkles, Send, MapPin, Phone, User } from 'lucide-react';

export default function WhatsAppOrderModal({
  isOpen,
  onClose,
  frameId,
  sizeId,
  finishId,
  mattingId,
  customText,
  quantity
}) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('Studio Pickup');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const frame = frameStyles.find(f => f.id === frameId) || frameStyles[0];
  const size = frameSizes.find(s => s.id === sizeId) || frameSizes[1];
  const finish = frameFinishes.find(fn => fn.id === finishId) || frameFinishes[0];
  const matting = mattingOptions.find(m => m.id === mattingId) || mattingOptions[0];

  const basePricing = calculateFramePrice({ frameId, sizeId, finishId, mattingId, quantity });
  const formattedGrandTotal = `₹${basePricing.grandTotal.toLocaleString('en-IN')}`;

  const orderData = {
    customerName: customerName || 'Customer',
    customerPhone,
    deliveryOption,
    notes,
    frameId,
    sizeId,
    finishId,
    mattingId,
    customText,
    quantity
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });

    const msg = buildWhatsAppOrderMessage(orderData);
    const link = generateWhatsAppLink(msg);
    window.open(link, '_blank');
  };

  const handleCopyMessage = () => {
    const msg = buildWhatsAppOrderMessage(orderData);
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="max-w-xl w-full bg-studio-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FINAL STEP</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            CONFIRM <span className="text-emerald-400">WHATSAPP ORDER</span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Review your order summary and enter contact details to dispatch to studio.
          </p>
        </div>

        <div className="bg-black/60 p-4 rounded-xl border border-white/10 space-y-2 text-xs text-gray-300">
          <div className="flex justify-between font-bold text-white text-sm border-b border-white/10 pb-2">
            <span>{frame.name}</span>
            <span className="text-studio-orange">{formattedGrandTotal}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <div>• <strong className="text-gray-200">Size:</strong> {size.label}</div>
            <div>• <strong className="text-gray-200">Finish:</strong> {finish.label}</div>
            <div>• <strong className="text-gray-200">Matting:</strong> {matting.label}</div>
            <div>• <strong className="text-gray-200">Quantity:</strong> {quantity}</div>
          </div>
          {customText.trim() && (
            <div className="text-[11px] text-amber-300 pt-1">
              • <strong>Custom Text:</strong> "{customText.trim()}"
            </div>
          )}
        </div>

        <form onSubmit={handleSendWhatsApp} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-studio-orange" />
              <span>Your Name *</span>
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Pradeesh Kumar"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-studio-orange" />
              <span>Mobile Phone Number *</span>
            </label>
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="+91 78260 60289"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Fulfillment Option</label>
              <select
                value={deliveryOption}
                onChange={(e) => setDeliveryOption(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
              >
                <option value="Studio Pickup">Studio Store Pickup</option>
                <option value="Home Delivery">Doorstep Home Delivery</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Special Notes (Optional)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Gift wrap needed"
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 py-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span>SEND ORDER TO WHATSAPP</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="py-4 px-4 rounded-xl font-semibold text-xs text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2"
              title="Copy text summary to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'COPIED!' : 'COPY SUMMARY'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
