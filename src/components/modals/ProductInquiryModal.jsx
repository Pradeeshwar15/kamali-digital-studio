import React, { useState } from 'react';
import { generateWhatsAppLink, buildProductInquiryMessage } from '../../utils/whatsappHelper.js';
import { sanitizeText, sanitizePhone, checkSubmissionRateLimit } from '../../utils/security.js';
import { X, Package, MessageSquare, Sparkles, User, Phone } from 'lucide-react';

export default function ProductInquiryModal({
  isOpen,
  onClose,
  initialProduct = null
}) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [hasDesign, setHasDesign] = useState('Yes');
  const [quantity, setQuantity] = useState('100');
  const [specifications, setSpecifications] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const productTitle = initialProduct?.title || "Photo Printing / Product";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkSubmissionRateLimit('product-inquiry', 2500)) {
      alert("Please wait a moment before sending another product inquiry.");
      return;
    }
    const msg = buildProductInquiryMessage({
      customerName: sanitizeText(customerName) || 'Customer',
      customerPhone: sanitizePhone(customerPhone),
      productTitle: sanitizeText(productTitle),
      hasDesign: sanitizeText(hasDesign),
      quantity: sanitizeText(quantity),
      specifications: sanitizeText(specifications),
      notes: sanitizeText(notes, 500)
    });

    const link = generateWhatsAppLink(msg);
    window.open(link, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="max-w-md w-full bg-studio-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-5 relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-studio-orange/10 border border-studio-orange/30 text-studio-orange text-xs font-bold mb-2">
            <Package className="w-3.5 h-3.5" />
            <span>PRINT & PRODUCT INQUIRY</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            {productTitle}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Provide details below to get an instant price quote on WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Your Name *</label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="+91 78260 60289"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Have Own Design?</label>
              <select
                value={hasDesign}
                onChange={(e) => setHasDesign(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
              >
                <option value="Yes">Yes, Ready File</option>
                <option value="No">No, Need Design</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Estimated Quantity</label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 50"
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Size / Specifications (Optional)</label>
            <input
              type="text"
              value={specifications}
              onChange={(e) => setSpecifications(e.target.value)}
              placeholder="e.g. 12x18 inch, Matte Finish"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-studio-orange hover:bg-studio-orangeHover shadow-glow-orange flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>SEND PRODUCT INQUIRY TO WHATSAPP</span>
          </button>
        </form>

      </div>
    </div>
  );
}
