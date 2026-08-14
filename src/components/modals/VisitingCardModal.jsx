import React, { useState } from 'react';
import { generateWhatsAppLink, buildVisitingCardRequestMessage } from '../../utils/whatsappHelper.js';
import { X, CreditCard, MessageSquare, Upload, Paintbrush, CheckCircle, FileText } from 'lucide-react';

export default function VisitingCardModal({
  isOpen,
  onClose
}) {
  const [activeTab, setActiveTab] = useState("has-design"); // "has-design" vs "request-design"
  const [customerName, setCustomerName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paperFinish, setPaperFinish] = useState('Matte 350 GSM');
  const [quantity, setQuantity] = useState('250');
  const [address, setAddress] = useState('');
  const [designNotes, setDesignNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = buildVisitingCardRequestMessage({
      mode: activeTab,
      customerName: customerName || 'Customer',
      businessName,
      customerPhone,
      email,
      paperFinish,
      quantity,
      address,
      designNotes
    });

    const link = generateWhatsAppLink(msg);
    window.open(link, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="max-w-xl w-full bg-studio-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-studio-orange/10 border border-studio-orange/30 text-studio-orange text-xs font-bold mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>VISITING CARD STUDIO</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            VISITING CARD <span className="text-studio-orange">ORDER & DESIGN</span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Choose whether you have a print-ready design or need Kamali team to design your visiting cards.
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
          </div>

          {activeTab === "request-design" && (
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Apex Enterprises"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Paper Finish</label>
              <select
                value={paperFinish}
                onChange={(e) => setPaperFinish(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
              >
                <option value="Matte 350 GSM">Matte 350 GSM (Classic)</option>
                <option value="Glossy Luster">Glossy Luster (Vivid Colors)</option>
                <option value="Velvet Soft Touch">Velvet Soft Touch (Premium)</option>
                <option value="Metallic Gold Foil">Metallic Gold Foil Accents</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Quantity</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
              >
                <option value="100">100 Cards</option>
                <option value="250">250 Cards</option>
                <option value="500">500 Cards</option>
                <option value="1000">1,000 Cards</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
              {activeTab === "has-design" ? "File Details / Order Notes" : "Design Brief / Details to Print"}
            </label>
            <textarea
              rows="3"
              value={designNotes}
              onChange={(e) => setDesignNotes(e.target.value)}
              placeholder={activeTab === "has-design" ? "e.g. Design PDF attached in WhatsApp..." : "e.g. Include logo, phone number, address, tagline..."}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-studio-orange hover:bg-studio-orangeHover shadow-glow-orange flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span>SEND TO WHATSAPP</span>
          </button>
        </form>

      </div>
    </div>
  );
}
