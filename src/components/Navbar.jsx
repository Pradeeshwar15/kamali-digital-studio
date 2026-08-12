import React, { useState, useEffect } from 'react';
import { studioConfig } from '../data/studioConfig.js';
import { Camera, Sparkles, Menu, X, Phone, MessageSquare, Frame, Package, Award } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenDesigner, onOpenPhotographyInquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'packages', label: 'Packages', isPackage: true },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Our Work' },
    { id: 'products', label: 'Products' },
    { id: 'designer', label: 'Photo Frames', isDesigner: true },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0c]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Identity */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-studio-orange to-amber-600 p-0.5 shadow-glow-orange group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0a0a0c] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <Camera className="w-6 h-6 text-studio-orange group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-studio-orange/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white block leading-none">
                KAMALI
              </span>
              <span className="text-[10px] tracking-[0.25em] text-studio-orange font-semibold uppercase block mt-1">
                DIGITAL STUDIO
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-5 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  activeTab === link.id
                    ? 'bg-studio-orange text-white shadow-glow-orange'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenPhotographyInquiry}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-gray-200 bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md transition-colors"
            >
              ENQUIRE NOW
            </button>

            <button
              onClick={() => {
                setActiveTab('designer');
                onOpenDesigner && onOpenDesigner();
              }}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-studio-orange to-amber-600 hover:from-studio-orangeHover hover:to-amber-700 shadow-glow-orange transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Frame className="w-4 h-4" />
              <span>DESIGN YOUR FRAME</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenPhotographyInquiry}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-studio-orange shadow-glow-orange flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>ENQUIRE</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 border border-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bg-[#0a0a0c]/95 border-b border-white/10 backdrop-blur-xl p-6 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center justify-between px-4 py-3 text-left font-medium rounded-xl text-base transition-colors ${
                  activeTab === link.id
                    ? 'bg-studio-orange/20 text-studio-orange border border-studio-orange/30 font-bold'
                    : 'text-gray-200 hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {link.isPackage && <Award className="w-4 h-4 text-amber-400" />}
                {link.isDesigner && <Sparkles className="w-4 h-4 text-studio-orange" />}
              </button>
            ))}
          </nav>
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenPhotographyInquiry && onOpenPhotographyInquiry();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-studio-orange to-amber-600 shadow-glow-orange flex items-center justify-center gap-2 text-center"
            >
              <Camera className="w-5 h-5" />
              <span>ENQUIRE FOR PHOTOGRAPHY</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('designer');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl font-bold text-gray-200 bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-center"
            >
              <Frame className="w-5 h-5 text-studio-orange" />
              <span>DESIGN YOUR FRAME</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
