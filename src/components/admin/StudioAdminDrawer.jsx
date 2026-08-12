import React, { useState } from 'react';
import { studioConfig } from '../../data/studioConfig.js';
import { Settings, X, Save, RefreshCw, Phone, Tag, Check, Shield } from 'lucide-react';

export default function StudioAdminDrawer({
  currentWhatsapp,
  onUpdateWhatsapp,
  pricingMultiplier,
  onUpdatePricingMultiplier
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempPhone, setTempPhone] = useState(currentWhatsapp);
  const [tempMultiplier, setTempMultiplier] = useState(pricingMultiplier);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateWhatsapp(tempPhone);
    onUpdatePricingMultiplier(Number(tempMultiplier));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 px-3.5 py-2 rounded-full bg-studio-card/90 text-gray-300 border border-white/20 backdrop-blur-md shadow-2xl hover:text-white hover:border-studio-orange transition-all duration-300 flex items-center gap-2 text-xs font-bold group"
        title="Studio Owner Demo Settings Panel"
      >
        <Settings className="w-4 h-4 text-studio-orange group-hover:rotate-90 transition-transform duration-500" />
        <span className="hidden sm:inline">Owner Demo Controls</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="max-w-md w-full bg-studio-card rounded-2xl border border-studio-orange/40 p-6 shadow-2xl space-y-5 relative">
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-studio-orange bg-studio-orange/10 px-2.5 py-1 rounded-full border border-studio-orange/30 inline-block mb-2">
                PROPOSAL DEMO MODE
              </span>
              <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-studio-orange" />
                <span>Studio Admin Settings</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Demonstrate how pricing tables and studio contact details update live in real-time without touching code.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-studio-orange" />
                  <span>WhatsApp Business Number</span>
                </label>
                <input
                  type="text"
                  value={tempPhone}
                  onChange={(e) => setTempPhone(e.target.value)}
                  placeholder="919876543210"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">Full digits with country code (e.g., 919876543210)</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-studio-orange" />
                  <span>Live Pricing Multiplier / Discount Rate</span>
                </label>
                <select
                  value={tempMultiplier}
                  onChange={(e) => setTempMultiplier(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
                >
                  <option value="1">Standard List Price (100%)</option>
                  <option value="0.9">Festive Special (10% OFF)</option>
                  <option value="0.85">Festive Super Saver (15% OFF)</option>
                  <option value="1.1">Express Priority Surge (+10%)</option>
                </select>
              </div>

              {saved && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Studio settings updated live across website!</span>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-bold text-xs text-white bg-studio-orange hover:bg-studio-orangeHover shadow-glow-orange flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>APPLY LIVE CHANGES</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTempPhone(studioConfig.whatsappNumber);
                    setTempMultiplier(1);
                    onUpdateWhatsapp(studioConfig.whatsappNumber);
                    onUpdatePricingMultiplier(1);
                  }}
                  className="px-3 py-3 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-white/5 border border-white/10"
                  title="Reset to defaults"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
