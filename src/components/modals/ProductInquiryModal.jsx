import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { buildProductInquiryMessage, generateWhatsAppLink } from '../../utils/whatsappHelper.js';
import { X, Printer, MessageSquare, Upload, User, Phone, CheckCircle2 } from 'lucide-react';

export default function ProductInquiryModal({
  isOpen,
  onClose,
  initialProduct = null,
  overrideWhatsapp = null
}) {
  const [productTitle, setProductTitle] = useState(initialProduct?.title || "Photo Printing");
  const [hasDesign, setHasDesign] = useState("Yes");
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [quantity, setQuantity] = useState('100');
  const [specifications, setSpecifications] = useState('');
  const [notes, setNotes] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

    const msg = buildProductInquiryMessage({
      customerName,
      customerPhone,
      productTitle,
      hasDesign,
      quantity,
      specifications,
      notes: `${notes} ${fileUploaded ? '(Design file selected)' : ''}`
    });

    const link = generateWhatsAppLink(msg, overrideWhatsapp);
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="max-w-xl w-full bg-studio-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-5 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold mb-2">
            <Printer className="w-3.5 h-3.5" />
            <span>PRINTING & PRODUCT INQUIRY</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            ORDER / ENQUIRE <span className="text-studio-orange">{productTitle}</span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Specify your dimensions, paper finish, and quantity to receive a fast price quote over WhatsApp.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Product Category</label>
            <select
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-studio-orange"
            >
              <option value="Photo Printing">Photo Printing (Lab HD Prints)</option>
              <option value="Posters & Invitation Cards">Posters & Invitation Cards</option>
              <option value="Visiting Cards">Visiting Cards</option>
              <option value="LED Wall Displays">LED Wall Displays</option>
              <option value="Backlight Frames">Backlight Frames (Glowing Lightbox)</option>
              <option value="Passport Photos">Passport & Biometric ID Photos</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-studio-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-studio-orange" />
                <span>Mobile Phone / WhatsApp *</span>
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-studio-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Do You Have a Ready Design?</label>
              <select
                value={hasDesign}
                onChange={(e) => setHasDesign(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
              >
                <option value="Yes - Ready Design File">Yes, I have design ready</option>
                <option value="No - Need Kamali to Design">No, I need Kamali to design</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Quantity Needed</label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 500 cards / 10 prints"
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500"
              />
            </div>
          </div>

          {/* Optional Design File Picker */}
          {hasDesign.startsWith("Yes") && (
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-studio-orange" />
                <span>Upload Design File (JPG, PNG, PDF)</span>
              </div>
              <label className="px-3 py-1.5 rounded-lg bg-studio-orange/20 text-studio-orange border border-studio-orange/40 font-bold cursor-pointer hover:bg-studio-orange hover:text-white transition-colors">
                {fileUploaded ? 'File Attached ✓' : 'Browse File'}
                <input
                  type="file"
                  onChange={() => setFileUploaded(true)}
                  className="hidden"
                />
              </label>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Paper Finish / Size Specifications</label>
            <input
              type="text"
              value={specifications}
              onChange={(e) => setSpecifications(e.target.value)}
              placeholder="e.g. 12x18 inch, Matte Finish, 300 GSM card stock..."
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-studio-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Additional Notes</label>
            <textarea
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific delivery dates or customization notes..."
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-studio-orange"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span>SEND PRODUCT INQUIRY TO WHATSAPP</span>
          </button>
        </form>

      </div>
    </div>
  );
}
