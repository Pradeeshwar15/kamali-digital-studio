import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Packages from './components/Packages.jsx';
import Products from './components/Products.jsx';
import FrameDesigner from './components/designer/FrameDesigner.jsx';
import Occasions from './components/Occasions.jsx';
import FrameShowcase from './components/FrameShowcase.jsx';
import BeforeAfter from './components/BeforeAfter.jsx';
import Gallery from './components/Gallery.jsx';
import Testimonials from './components/Testimonials.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import StudioAdminDrawer from './components/admin/StudioAdminDrawer.jsx';

// Modals
import PhotographyInquiryModal from './components/modals/PhotographyInquiryModal.jsx';
import ProductInquiryModal from './components/modals/ProductInquiryModal.jsx';
import VisitingCardModal from './components/modals/VisitingCardModal.jsx';

import { studioConfig } from './data/studioConfig.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [selectedFrameId, setSelectedFrameId] = useState(null);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(null);
  
  // Modals Visibility
  const [photoInquiryOpen, setPhotoInquiryOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState("Wedding Package Inquiry");
  const [productInquiryOpen, setProductInquiryOpen] = useState(false);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState(null);
  const [visitingCardModalOpen, setVisitingCardModalOpen] = useState(false);

  // Admin Demo Live Testing State
  const [currentWhatsapp, setCurrentWhatsapp] = useState(studioConfig.whatsappNumber);
  const [pricingMultiplier, setPricingMultiplier] = useState(1);

  const handleOpenDesigner = (frameId = null, photoUrl = null) => {
    if (frameId) setSelectedFrameId(frameId);
    if (photoUrl) setSelectedPhotoUrl(photoUrl);
    setActiveTab('designer');
    const el = document.getElementById('designer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectOccasion = (occ) => {
    setSelectedOccasion(occ);
    if (occ.suggestedFrame) setSelectedFrameId(occ.suggestedFrame);
    setActiveTab('designer');
    const el = document.getElementById('designer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenPhotographyInquiry = (serviceTitle = null) => {
    if (serviceTitle) setSelectedServiceForInquiry(serviceTitle);
    setPhotoInquiryOpen(true);
  };

  const handleOpenProductInquiry = (product = null) => {
    if (product) setSelectedProductForInquiry(product);
    setProductInquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-studio-text flex flex-col font-sans selection:bg-studio-orange selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDesigner={() => handleOpenDesigner()}
        onOpenPhotographyInquiry={() => handleOpenPhotographyInquiry()}
      />

      {/* Main Content Sections in User-Requested UX Sequence */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero
          onOpenPhotographyInquiry={() => handleOpenPhotographyInquiry()}
          onOpenDesigner={() => handleOpenDesigner()}
          onExploreWork={() => {
            setActiveTab('packages');
            const el = document.getElementById('packages');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Packages Section (Basic ₹50k, Standard ₹90k, Platinum ₹1.2L) */}
        <Packages
          onOpenPhotographyInquiry={(serviceTitle) => handleOpenPhotographyInquiry(serviceTitle)}
          overrideWhatsapp={currentWhatsapp}
        />

        {/* 3. Products Section (Appears next to Packages) */}
        <Products
          onOpenDesigner={() => handleOpenDesigner()}
          onOpenProductInquiry={(product) => handleOpenProductInquiry(product)}
          onOpenVisitingCardModal={() => setVisitingCardModalOpen(true)}
          onOpenContact={() => {
            setActiveTab('contact');
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Photo Frames Customizer Section */}
        <FrameDesigner
          initialOccasion={selectedOccasion}
          initialFrameId={selectedFrameId}
          initialPhotoUrl={selectedPhotoUrl}
          pricingMultiplier={pricingMultiplier}
          overrideWhatsapp={currentWhatsapp}
        />

        {/* 5. Occasion-Based Frame Discovery */}
        <Occasions onSelectOccasion={handleSelectOccasion} />

        {/* 6. Bestselling Frame Styles Showcase */}
        <FrameShowcase
          onCustomizeFrame={(frameId) => handleOpenDesigner(frameId)}
        />

        {/* 7. Photo Restoration Before / After Showcase */}
        <BeforeAfter />

        {/* 8. Portfolio Gallery & Lightbox */}
        <Gallery
          onFrameThisPhoto={(photoUrl) => handleOpenDesigner(null, photoUrl)}
          onBookPhotography={(serviceCategory) => handleOpenPhotographyInquiry(serviceCategory)}
        />

        {/* 9. Client Testimonials */}
        <Testimonials />

        {/* 10. About Studio */}
        <About />

        {/* 11. Contact & Store Location */}
        <Contact />

      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenDesigner={() => handleOpenDesigner()}
        onOpenPhotographyInquiry={() => handleOpenPhotographyInquiry()}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Owner Demo Admin Controls Drawer */}
      <StudioAdminDrawer
        currentWhatsapp={currentWhatsapp}
        onUpdateWhatsapp={setCurrentWhatsapp}
        pricingMultiplier={pricingMultiplier}
        onUpdatePricingMultiplier={setPricingMultiplier}
      />

      {/* JOURNEY A: Photography Booking Modal */}
      <PhotographyInquiryModal
        isOpen={photoInquiryOpen}
        onClose={() => setPhotoInquiryOpen(false)}
        initialService={selectedServiceForInquiry}
        overrideWhatsapp={currentWhatsapp}
      />

      {/* JOURNEY C: Product & Printing Inquiry Modal */}
      <ProductInquiryModal
        isOpen={productInquiryOpen}
        onClose={() => setProductInquiryOpen(false)}
        initialProduct={selectedProductForInquiry}
        overrideWhatsapp={currentWhatsapp}
      />

      {/* JOURNEY D: Visiting Card Order & Design Request Modal */}
      <VisitingCardModal
        isOpen={visitingCardModalOpen}
        onClose={() => setVisitingCardModalOpen(false)}
        overrideWhatsapp={currentWhatsapp}
      />

    </div>
  );
}
