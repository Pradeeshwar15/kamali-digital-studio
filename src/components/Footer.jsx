import React from 'react';
import { studioConfig } from '../data/studioConfig.js';
import { Camera, Frame, Phone, Mail, MapPin, Instagram, Facebook, MessageSquare, ArrowUp, Package, Award, ExternalLink } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenDesigner, onOpenPhotographyInquiry }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (tabId, action = null) => {
    setActiveTab(tabId);
    if (action) action();
    const el = document.getElementById(tabId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050506] text-gray-400 border-t border-white/10 pt-10 sm:pt-16 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            MOBILE FOOTER (Sleek, Compact, Zero Endless Scrolling)
           ========================================================================= */}
        <div className="md:hidden space-y-6 pb-8 border-b border-white/10">
          
          {/* Logo & Quick Bio */}
          <div className="text-center">
            <img 
              src="/images/branding/logo-transparent.png" 
              alt="Kamali Studio & Digital Lab" 
              className="h-10 w-auto object-contain mx-auto mb-2" 
            />
            <p className="text-[11px] text-gray-400 font-serif italic max-w-xs mx-auto">
              "{studioConfig.tagline}"
            </p>
          </div>

          {/* Quick Action Contact Bar */}
          <div className="grid grid-cols-3 gap-2">
            <a
              href={`tel:${studioConfig.phone}`}
              className="py-2.5 px-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold flex flex-col items-center justify-center gap-1 active:scale-95 transition-all text-center"
            >
              <Phone className="w-4 h-4 text-studio-orange" />
              <span className="text-[10px]">Call Direct</span>
            </a>

            <a
              href={`https://wa.me/${studioConfig.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-2 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex flex-col items-center justify-center gap-1 active:scale-95 transition-all text-center"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px]">WhatsApp</span>
            </a>

            <a
              href={studioConfig.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-2 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs font-bold flex flex-col items-center justify-center gap-1 active:scale-95 transition-all text-center"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="text-[10px]">Google Maps</span>
            </a>
          </div>

          {/* Active Clickable Studio Location Link */}
          <a
            href={studioConfig.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-2.5 group active:bg-white/5 transition-all"
            title="Open Kamali Studio in Google Maps"
          >
            <div className="flex items-center gap-2 text-left min-w-0">
              <MapPin className="w-4 h-4 text-studio-orange shrink-0" />
              <span className="text-xs text-gray-200 truncate font-medium">
                {studioConfig.address}
              </span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-studio-orange shrink-0 opacity-80" />
          </a>

          {/* Compact 2-Column Links Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs pt-2">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Explore</span>
              <button onClick={() => handleNavClick('home')} className="block text-gray-300 hover:text-white">
                Home
              </button>
              <button onClick={() => handleNavClick('packages')} className="block text-amber-400 font-bold">
                Wedding Packages
              </button>
              <button onClick={() => handleNavClick('products')} className="block text-gray-300 hover:text-white">
                Studio Products
              </button>
              <button onClick={() => handleNavClick('designer', onOpenDesigner)} className="block text-studio-orange font-bold">
                Photo Frame Designer
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Studio</span>
              <button onClick={() => handleNavClick('gallery')} className="block text-gray-300 hover:text-white">
                Our Work / Portfolio
              </button>
              <button onClick={() => handleNavClick('reviews')} className="block text-gray-300 hover:text-white">
                Client Reviews
              </button>
              <button onClick={() => handleNavClick('about')} className="block text-gray-300 hover:text-white">
                About Kamali
              </button>
              <button onClick={() => handleNavClick('contact')} className="block text-gray-300 hover:text-white">
                Contact & Hours
              </button>
            </div>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <a
              href={studioConfig.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href={studioConfig.socials.facebook}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300"
              aria-label="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href={studioConfig.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP FOOTER (Expansive, Balanced 5-Column Grid)
           ========================================================================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img 
                src="/images/branding/logo-transparent.png" 
                alt="Kamali Studio & Digital Lab" 
                className="h-11 sm:h-12 w-auto object-contain drop-shadow-md" 
              />
            </div>

            <p className="text-xs leading-relaxed text-gray-400 max-w-sm mb-6 font-serif italic">
              "{studioConfig.tagline}" — Complete reception & wedding packages, bespoke handcrafted frames, HD printing, visiting cards, and digital studio products.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={studioConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-studio-orange hover:border-studio-orange transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={studioConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-studio-orange hover:border-studio-orange transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={studioConfig.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-studio-orange transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('packages')} className="hover:text-studio-orange transition-colors flex items-center gap-1 font-bold text-amber-400">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>Wedding Packages</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('products')} className="hover:text-studio-orange transition-colors flex items-center gap-1">
                  <Package className="w-3 h-3 text-studio-orange" />
                  <span>Products</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('designer', onOpenDesigner)} className="text-studio-orange font-bold hover:underline flex items-center gap-1">
                  <Frame className="w-3 h-3" />
                  <span>Photo Frame Designer</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('gallery')} className="hover:text-studio-orange transition-colors">
                  Our Work / Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('reviews')} className="hover:text-studio-orange transition-colors">
                  Client Reviews
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-studio-orange transition-colors">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Core Products */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">Core Products</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>Reception & Wedding Packages</li>
              <li>Custom Photo Frames</li>
              <li>Visiting Cards (Print & Design)</li>
              <li>HD Photo Printing & Posters</li>
              <li>Invitation Cards</li>
              <li>LED Wall Displays & Lightboxes</li>
              <li>5-Min Passport Photos</li>
            </ul>
          </div>

          {/* Contact Summary with ACTIVE Google Maps Link */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">Studio Location</h4>
            <ul className="space-y-3 text-xs">
              <li>
                {/* Location Address as Active Interactive Link */}
                <a
                  href={studioConfig.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 text-gray-300 hover:text-studio-orange transition-colors group"
                  title="Open Kamali Studio in Google Maps"
                >
                  <MapPin className="w-4 h-4 text-studio-orange shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:underline leading-relaxed">
                    {studioConfig.address}
                  </span>
                  <ExternalLink className="w-3 h-3 text-studio-orange shrink-0 mt-0.5 opacity-70 group-hover:opacity-100" />
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-studio-orange shrink-0" />
                <a href={`tel:${studioConfig.phone}`} className="hover:text-white transition-colors">{studioConfig.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-studio-orange shrink-0" />
                <a href={`mailto:${studioConfig.email}`} className="hover:text-white transition-colors">{studioConfig.email}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p className="text-center sm:text-left">
            © 2026 Kamali Studio & Digital Lab. All Rights Reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-studio-orange font-bold hover:underline"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
