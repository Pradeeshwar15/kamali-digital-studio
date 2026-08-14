import React, { useState } from 'react';
import StepFrameSelect from './StepFrameSelect.jsx';
import StepPhotoUpload from './StepPhotoUpload.jsx';
import StepCustomization from './StepCustomization.jsx';
import LiveFramePreview from './LiveFramePreview.jsx';
import PriceBreakdown from './PriceBreakdown.jsx';
import WhatsAppOrderModal from './WhatsAppOrderModal.jsx';
import { calculateFramePrice } from '../../utils/priceCalculator.js';
import { Sparkles, MessageSquare, Frame as FrameIcon, ShieldCheck } from 'lucide-react';

export default function FrameDesigner({
  initialOccasion,
  initialFrameId,
  initialPhotoUrl
}) {
  const [selectedFrameId, setSelectedFrameId] = useState(initialFrameId || "classic-black");
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl || null);
  const [selectedSizeId, setSelectedSizeId] = useState(initialOccasion?.suggestedSize || "12x18");
  const [selectedFinishId, setSelectedFinishId] = useState("matte");
  const [selectedMattingId, setSelectedMattingId] = useState("none");
  const [customText, setCustomText] = useState(initialOccasion?.sampleText || "");
  const [textFont, setTextFont] = useState("font-serif");
  const [textColor, setTextColor] = useState("#D4AF37");
  const [activeFilter, setActiveFilter] = useState("none");
  const [quantity, setQuantity] = useState(1);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const basePricing = calculateFramePrice({
    frameId: selectedFrameId,
    sizeId: selectedSizeId,
    finishId: selectedFinishId,
    mattingId: selectedMattingId,
    quantity
  });

  const formattedFinalTotal = `₹${basePricing.grandTotal.toLocaleString('en-IN')}`;

  return (
    <section id="designer" className="py-24 bg-[#0a0a0c] border-t border-white/5 relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-studio-orange/10 border border-studio-orange/30 text-studio-orange text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STUDIO DIGITAL CUSTOMIZER</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            CREATE YOUR <span className="text-studio-orange">PERFECT FRAME</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3 font-serif italic">
            "Turn your favorite memory into something you can hold forever."
          </p>
        </div>

        {/* Dual Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANE: Step-by-Step Designer Controls (Lg: col-span-6) */}
          <div className="lg:col-span-6 space-y-8 bg-studio-card p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
            
            {/* Step 1: Select Frame */}
            <StepFrameSelect
              selectedFrameId={selectedFrameId}
              onSelectFrame={setSelectedFrameId}
            />

            {/* Step 2: Upload Photo & Filter */}
            <div className="pt-6 border-t border-white/10">
              <StepPhotoUpload
                photoUrl={photoUrl}
                onPhotoChange={setPhotoUrl}
                onRemovePhoto={() => setPhotoUrl(null)}
                activeFilter={activeFilter}
                onSelectFilter={setActiveFilter}
              />
            </div>

            {/* Step 3, 4, 5: Customization */}
            <div className="pt-6 border-t border-white/10">
              <StepCustomization
                selectedSizeId={selectedSizeId}
                onSelectSize={setSelectedSizeId}
                selectedFinishId={selectedFinishId}
                onSelectFinish={setSelectedFinishId}
                selectedMattingId={selectedMattingId}
                onSelectMatting={setSelectedMattingId}
                customText={customText}
                onCustomTextChange={setCustomText}
                textFont={textFont}
                onTextFontChange={setTextFont}
                textColor={textColor}
                onTextColorChange={setTextColor}
              />
            </div>

            {/* Price Breakdown */}
            <div className="pt-6 border-t border-white/10">
              <PriceBreakdown
                frameId={selectedFrameId}
                sizeId={selectedSizeId}
                finishId={selectedFinishId}
                mattingId={selectedMattingId}
                quantity={quantity}
                onQuantityChange={setQuantity}
                onOpenOrderModal={() => setOrderModalOpen(true)}
              />
            </div>

          </div>

          {/* RIGHT PANE: Sticky Live Visualizer (Lg: col-span-6) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <LiveFramePreview
              frameId={selectedFrameId}
              photoUrl={photoUrl}
              sizeId={selectedSizeId}
              finishId={selectedFinishId}
              mattingId={selectedMattingId}
              customText={customText}
              textFont={textFont}
              textColor={textColor}
              activeFilter={activeFilter}
            />

            {/* Mobile Sticky Order Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0c]/95 border-t border-white/15 p-4 backdrop-blur-xl flex items-center justify-between shadow-2xl">
              <div>
                <span className="text-[10px] text-gray-400 block font-semibold">Estimated Total</span>
                <span className="font-serif text-xl font-bold text-studio-orange">{formattedFinalTotal}</span>
              </div>
              <button
                onClick={() => setOrderModalOpen(true)}
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 shadow-lg shadow-emerald-950/50 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ORDER WHATSAPP</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* WhatsApp Order Modal */}
      <WhatsAppOrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        frameId={selectedFrameId}
        sizeId={selectedSizeId}
        finishId={selectedFinishId}
        mattingId={selectedMattingId}
        customText={customText}
        quantity={quantity}
      />
    </section>
  );
}
