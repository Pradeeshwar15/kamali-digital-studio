import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { generateWhatsAppLink, buildWhatsAppOrderMessage } from '../../utils/whatsappHelper.js';
import { sanitizeText, sanitizePhone, checkSubmissionRateLimit } from '../../utils/security.js';
import { calculateFramePrice } from '../../utils/priceCalculator.js';
import { frameStyles } from '../../data/frames.js';
import { frameSizes, mattingOptions } from '../../data/pricing.js';
import { X, MessageSquare, Copy, Check, Sparkles, Send, MapPin, Phone, User, Paperclip } from 'lucide-react';

export default function WhatsAppOrderModal({
  isOpen,
  onClose,
  frameId,
  sizeId,
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
  const size = frameSizes.find(s => s.id === sizeId) || frameSizes[4];
  const matting = mattingOptions.find(m => m.id === mattingId) || mattingOptions[0];

  const basePricing = calculateFramePrice({ frameId, sizeId, mattingId, quantity });
  const formattedGrandTotal = `₹${basePricing.grandTotal.toLocaleString('en-IN')}`;

  const orderData = {
    customerName: sanitizeText(customerName) || 'Customer',
    customerPhone: sanitizePhone(customerPhone),
    deliveryOption: sanitizeText(deliveryOption),
    notes: sanitizeText(notes, 500),
    frameId,
    sizeId,
    mattingId,
    customText: sanitizeText(customText, 100),
    quantity
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!checkSubmissionRateLimit('frame-order', 2500)) {
      alert("Please wait a moment before sending another order request.");
      return;
    }
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

        {/* Order Configuration Preview */}
        <div className="bg-black/60 p-4 rounded-xl border border-white/10 space-y-2 text-xs text-gray-300">
          <div className="flex justify-between font-bold text-white text-sm border-b border-white/10 pb-2">
            <span>{frame.name}</span>
            <span className="text-studio-orange">{formattedGrandTotal}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <div>• <strong className="text-gray-200">Size:</strong> {size.label} ({size.dimensions})</div>
            <div>• <strong className="text-gray-200">Matting:</strong> {matting.label}</div>
            <div>• <strong className="text-gray-200">Quantity:</strong> {quantity}</div>
            <div>• <strong className="text-gray-200">Unit Price:</strong> ₹{size.price}</div>
          </div>
          {customText.trim() && (
            <div className="text-[11px] text-amber-300 pt-1">
              • <strong className="text-gray-200">Custom Text:</strong> "{customText}"
            </div>
          )}
        </div>

        {/* Option A: Guided Photo Upload Instruction Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 to-studio-orange/20 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-3 shadow-lg">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <Paperclip className="w-4 h-4 text-studio-orange" />
          </div>
          <div className="space-y-1">
            <span className="font-bold text-white block">
              How to send your high-resolution photo:
            </span>
            <p className="text-[11px] text-amber-100/90 leading-relaxed">
              When WhatsApp opens, tap the <strong>Attachment icon (📎)</strong> and select <strong>"Document"</strong> (not Gallery). This ensures your photo prints in 100% lossless HD studio quality without compression!
            </p>
          </div>
        </div>

        <form onSubmit={handleSendWhatsApp} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-studio-orange" />
              <span>Your Name *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Anand Kumar"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-studio-orange text-sm transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-studio-orange" />
              <span>Contact / WhatsApp Phone Number *</span>
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. 9876543210"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-studio-orange text-sm transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-studio-orange" />
              <span>Fulfillment Option</span>
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {['Studio Pickup (Cheyyar)', 'Home Delivery (+Courier)'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setDeliveryOption(opt)}
                  className={`p-2.5 rounded-xl border font-semibold transition-all ${
                    deliveryOption === opt
                      ? 'bg-studio-orange/20 border-studio-orange text-white'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
              Special Instructions / Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Any specific delivery instructions, cropping notes, or urgent timeline..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-studio-orange text-xs transition-colors"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>SEND ORDER ON WHATSAPP</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="px-4 py-3.5 rounded-xl font-semibold text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
