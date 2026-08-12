import React from 'react';
import { studioConfig } from '../data/studioConfig.js';
import { Camera, Frame, Phone, Mail, MapPin, Instagram, Facebook, MessageSquare, ArrowUp, Package } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenDesigner, onOpenPhotographyInquiry }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050506] text-gray-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-studio-orange to-amber-600 p-0.5 shadow-glow-orange flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-white block">
                  KAMALI
                </span>
                <span className="text-[9px] tracking-[0.25em] text-studio-orange font-semibold uppercase block">
                  DIGITAL STUDIO
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-gray-400 max-w-sm mb-6 font-serif italic">
              "{studioConfig.tagline}" — Digital showroom, wedding photography, bespoke handcrafted frames, HD printing, and custom business products.
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

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-studio-orange transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-studio-orange transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gallery')} className="hover:text-studio-orange transition-colors">
                  Our Work
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-studio-orange transition-colors flex items-center gap-1">
                  <Package className="w-3 h-3 text-studio-orange" />
                  <span>Products</span>
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('designer'); onOpenDesigner && onOpenDesigner(); }} className="text-studio-orange font-bold hover:underline flex items-center gap-1">
                  <Frame className="w-3 h-3" />
                  <span>Photo Frame Designer</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-studio-orange transition-colors">
                  About Studio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-studio-orange transition-colors">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Confirmed Offerings */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">Core Offerings</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>Wedding Photography & Drone</li>
              <li>Candid & Traditional Shoots</li>
              <li>Custom Photo Frames</li>
              <li>Visiting Cards (Print & Design)</li>
              <li>Photo Printing & Posters</li>
              <li>LED Wall & Backlight Lightboxes</li>
              <li>5-Min Passport Photos</li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">Studio Info</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-studio-orange shrink-0 mt-0.5" />
                <span>{studioConfig.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-studio-orange shrink-0" />
                <a href={`tel:${studioConfig.phone}`} className="hover:text-white">{studioConfig.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-studio-orange shrink-0" />
                <a href={`mailto:${studioConfig.email}`} className="hover:text-white">{studioConfig.email}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Kamali Digital Studio. All Rights Reserved.</p>
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
