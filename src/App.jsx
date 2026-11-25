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
import SecurityShield from './components/SecurityShield.jsx';

// Modals
import PhotographyInquiryModal from './components/modals/PhotographyInquiryModal.jsx';
import ProductInquiryModal from './components/modals/ProductInquiryModal.jsx';
import VisitingCardModal from './components/modals/VisitingCardModal.jsx';

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

  const handleOpenDesigner = (frameId = null, photoUrl = null) => {
    if (frameId) setSelectedFrameId(frameId);
    if (photoUrl) setSelectedPhotoUrl(photoUrl);
    setActiveTab('designer');
    setTimeout(() => {
      const el = document.getElementById('designer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleSelectOccasion = (occ) => {
    setSelectedOccasion(occ);
    if (occ.suggestedFrame) setSelectedFrameId(occ.suggestedFrame);
    setActiveTab('designer');
    setTimeout(() => {
      const el = document.getElementById('designer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
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

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero
          onOpenPhotographyInquiry={() => handleOpenPhotographyInquiry()}
          onOpenDesigner={() => handleOpenDesigner()}
          onExploreWork={() => {
            setActiveTab('gallery');
            const el = document.getElementById('gallery');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Wedding & Event Packages Section */}
        <Packages
          onOpenPhotographyInquiry={(serviceTitle) => handleOpenPhotographyInquiry(serviceTitle)}
        />

        {/* 3. Products Section */}
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
          isVisibleMobile={activeTab === 'designer'}
        />

        {/* 5. Occasion-Based Frame Discovery */}
        <Occasions onSelectOccasion={handleSelectOccasion} />

        {/* 6. Bestselling Frame Styles Showcase (Desktop Only, Hidden on Mobile) */}
        <FrameShowcase
          onCustomizeFrame={(frameId) => handleOpenDesigner(frameId)}
        />

        {/* 7. Photo Restoration Before / After Showcase */}
        <BeforeAfter />

        {/* 8. Portfolio Gallery & Lightbox (Spotlight Preview on Dashboard, Full Portfolio on Menu Click) */}
        <Gallery
          onFrameThisPhoto={(photoUrl) => handleOpenDesigner(null, photoUrl)}
          onBookPhotography={(serviceCategory) => handleOpenPhotographyInquiry(serviceCategory)}
          isFullPortfolio={activeTab === 'gallery'}
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

      {/* Security & Image Protection Shield */}
      <SecurityShield />

      {/* JOURNEY A: Photography Booking Modal */}
      <PhotographyInquiryModal
        isOpen={photoInquiryOpen}
        onClose={() => setPhotoInquiryOpen(false)}
        initialService={selectedServiceForInquiry}
      />

      {/* JOURNEY C: Product & Printing Inquiry Modal */}
      <ProductInquiryModal
        isOpen={productInquiryOpen}
        onClose={() => setProductInquiryOpen(false)}
        initialProduct={selectedProductForInquiry}
      />

      {/* JOURNEY D: Visiting Card Order & Design Request Modal */}
      <VisitingCardModal
        isOpen={visitingCardModalOpen}
        onClose={() => setVisitingCardModalOpen(false)}
      />

    </div>
  );
}
