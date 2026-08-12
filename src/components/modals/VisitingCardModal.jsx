import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { buildVisitingCardRequestMessage, generateWhatsAppLink } from '../../utils/whatsappHelper.js';
import { X, CreditCard, MessageSquare, Upload, Sparkles, CheckCircle2, Paintbrush } from 'lucide-react';

export default function VisitingCardModal({
  isOpen,
  onClose,
  overrideWhatsapp = null
}) {
  const [activeTab, setActiveTab] = useState("has-design"); // "has-design" vs "request-design"
  
  // Path 1 State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [quantity, setQuantity] = useState('250');
  const [paperFinish, setPaperFinish] = useState('Matte Finish (350 GSM)');
  const [notes, setNotes] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);

  // Path 2 State (Request Design)
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [designBrief, setDesignBrief] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });

    const msg = buildVisitingCardRequestMessage({
      mode: activeTab,
      customerName,
      businessName,
      customerPhone,
      email,
      paperFinish,
      quantity,
      address,
      designNotes: activeTab === "has-design" ? `${notes} ${fileUploaded ? '(Design file attached)' : ''}` : designBrief
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-studio-orange/10 text-studio-orange border border-studio-orange/30 text-xs font-bold mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>VISITING CARD SERVICE</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            VISITING CARDS <span className="text-studio-orange">PRINT & DESIGN</span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Whether you have a print-ready design file or need our creative designers to craft one for you, we've got you covered.
          </p>
        </div>

        {/* Dual Path Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-black/50 p-1.5 rounded-xl border border-white/10 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("has-design")}
            className={`py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "has-design"
                ? 'bg-studio-orange text-white shadow-glow-orange'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>I Have a Design</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("request-design")}
            className={`py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "request-design"
                ? 'bg-studio-orange text-white shadow-glow-orange'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Paintbrush className="w-4 h-4" />
            <span>Request Kamali Design</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Rajesh Kumar"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-studio-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Mobile Phone / WhatsApp *</label>
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
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Quantity</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
              >
                <option value="100">100 Cards</option>
                <option value="250">250 Cards</option>
                <option value="500">500 Cards</option>
                <option value="1000">1,000 Cards</option>
                <option value="2000+">2,000+ Bulk Order</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Paper Finish</label>
              <select
                value={paperFinish}
                onChange={(e) => setPaperFinish(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
              >
                <option value="Matte Finish (350 GSM)">Matte Premium (350 GSM)</option>
                <option value="Glossy HD Luster">Glossy Luster HD</option>
                <option value="Velvet Soft Touch">Velvet Soft Touch</option>
                <option value="Metallic Gold Foil">Metallic Foil Accent</option>
              </select>
            </div>
          </div>

          {/* PATH 1: UPLOAD DESIGN */}
          {activeTab === "has-design" && (
            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-studio-orange" />
                  <span>Upload Visiting Card File (PDF, PNG, JPG)</span>
                </div>
                <label className="px-3 py-1.5 rounded-lg bg-studio-orange/20 text-studio-orange border border-studio-orange/40 font-bold cursor-pointer hover:bg-studio-orange hover:text-white transition-colors">
                  {fileUploaded ? 'File Ready ✓' : 'Browse File'}
                  <input
                    type="file"
                    onChange={() => setFileUploaded(true)}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Print Notes (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Double-sided print with rounded corners"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-xs"
                />
              </div>
            </div>
          )}

          {/* PATH 2: REQUEST DESIGN */}
          {activeTab === "request-design" && (
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Kamali Enterprises"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rajesh@company.com"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Business Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="City, State - Pincode"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Design Brief & Logo Details</label>
                <textarea
                  rows="3"
                  value={designBrief}
                  onChange={(e) => setDesignBrief(e.target.value)}
                  placeholder="Mention your color preferences, logo details, tagline, and contact info to print on card..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-xs"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-studio-orange to-amber-600 hover:from-studio-orangeHover hover:to-amber-700 shadow-glow-orange flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{activeTab === "has-design" ? "SEND PRINT ORDER TO WHATSAPP" : "REQUEST DESIGN ON WHATSAPP"}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
