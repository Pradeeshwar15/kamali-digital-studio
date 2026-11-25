import React, { useState, useEffect } from 'react';
import StepFrameSelect from './StepFrameSelect.jsx';
import StepPhotoUpload from './StepPhotoUpload.jsx';
import StepCustomization from './StepCustomization.jsx';
import LiveFramePreview from './LiveFramePreview.jsx';
import PriceBreakdown from './PriceBreakdown.jsx';
import WhatsAppOrderModal from './WhatsAppOrderModal.jsx';
import { calculateFramePrice } from '../../utils/priceCalculator.js';
import { Sparkles } from 'lucide-react';

export default function FrameDesigner({
  initialOccasion,
  initialFrameId,
  initialPhotoUrl,
  isVisibleMobile = false
}) {
  const [selectedFrameId, setSelectedFrameId] = useState(initialFrameId || "classic-wood");
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl || "/images/gallery/portraits/baby-01.webp");
  const [selectedSizeId, setSelectedSizeId] = useState(initialOccasion?.suggestedSize || "12x15");
  const [selectedMattingId, setSelectedMattingId] = useState("none");
  const [customText, setCustomText] = useState(initialOccasion?.sampleText || "");
  const [textFont, setTextFont] = useState("font-serif");
  const [textColor, setTextColor] = useState("#D4AF37");
  const [activeFilter, setActiveFilter] = useState("none");
  const [quantity, setQuantity] = useState(1);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  // Sync state if props change when user interacts with other sections (Occasions, FrameShowcase, Gallery)
  useEffect(() => {
    if (initialFrameId) {
      setSelectedFrameId(initialFrameId);
    }
  }, [initialFrameId]);

  useEffect(() => {
    if (initialPhotoUrl) {
      setPhotoUrl(initialPhotoUrl);
    }
  }, [initialPhotoUrl]);

  useEffect(() => {
    if (initialOccasion) {
      if (initialOccasion.suggestedFrame) setSelectedFrameId(initialOccasion.suggestedFrame);
      if (initialOccasion.suggestedSize) setSelectedSizeId(initialOccasion.suggestedSize);
      if (initialOccasion.sampleText) setCustomText(initialOccasion.sampleText);
    }
  }, [initialOccasion]);

  const basePricing = calculateFramePrice({
    frameId: selectedFrameId,
    sizeId: selectedSizeId,
    mattingId: selectedMattingId,
    quantity
  });

  return (
    <section 
      id="designer" 
      className={`py-20 sm:py-24 bg-[#0a0a0c] border-t border-white/5 relative min-h-screen ${isVisibleMobile ? 'block' : 'block'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-studio-orange/10 border border-studio-orange/30 text-studio-orange text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STUDIO DIGITAL CUSTOMIZER</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            CREATE YOUR <span className="text-studio-orange">PERFECT FRAME</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-lg mt-3 font-serif italic">
            "A frame preserves not just a photo, but a memory forever..."
          </p>
        </div>

        {/* Dual Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT PANE: Step-by-Step Designer Controls (Desktop Left, Mobile Below Preview) */}
          <div className="lg:col-span-6 space-y-8 bg-studio-card p-5 sm:p-8 rounded-2xl border border-white/10 shadow-2xl order-2 lg:order-1">

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

            {/* Step 3: Size & Customization (No Finish selection) */}
            <div className="pt-6 border-t border-white/10">
              <StepCustomization
                selectedSizeId={selectedSizeId}
                onSelectSize={setSelectedSizeId}
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
                mattingId={selectedMattingId}
                quantity={quantity}
                onQuantityChange={setQuantity}
                onOpenOrderModal={() => setOrderModalOpen(true)}
              />
            </div>

          </div>

          {/* RIGHT PANE: Live Visualizer (Mobile Top, Desktop Sticky Right) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4 order-1 lg:order-2">
            <LiveFramePreview
              frameId={selectedFrameId}
              photoUrl={photoUrl}
              sizeId={selectedSizeId}
              mattingId={selectedMattingId}
              customText={customText}
              textFont={textFont}
              textColor={textColor}
              activeFilter={activeFilter}
            />
          </div>

        </div>

      </div>

      {/* WhatsApp Order Modal */}
      <WhatsAppOrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        frameId={selectedFrameId}
        sizeId={selectedSizeId}
        mattingId={selectedMattingId}
        customText={customText}
        quantity={quantity}
      />
    </section>
  );
}
