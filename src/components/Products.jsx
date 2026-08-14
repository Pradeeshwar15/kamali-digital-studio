import React, { useState } from 'react';
import { productsData } from '../data/products.js';
import { Package, Sparkles, ArrowRight, MessageSquare, Frame, CreditCard, Image as ImageIcon, Monitor, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Products({ onOpenDesigner, onOpenProductInquiry, onOpenVisitingCardModal, onOpenContact }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = [
    { id: "ALL", label: "All Products" },
    { id: "FRAMES", label: "Custom Frames" },
    { id: "CARDS", label: "Visiting Cards" },
    { id: "PRINTING", label: "HD Printing" },
    { id: "DISPLAYS", label: "LED & Lightbox" }
  ];

  const filteredProducts = selectedCategory === "ALL" 
    ? productsData 
    : productsData.filter(p => {
        if (selectedCategory === "FRAMES") return p.id === "photo-frames";
        if (selectedCategory === "CARDS") return p.id === "visiting-cards";
        if (selectedCategory === "PRINTING") return p.id === "photo-printing" || p.id === "posters-invitations" || p.id === "passport-photos";
        if (selectedCategory === "DISPLAYS") return p.id === "led-wall-display" || p.id === "backlight-lightbox";
        return true;
      });

  const handleProductAction = (product) => {
    if (product.actionType === "designer") {
      onOpenDesigner && onOpenDesigner();
    } else if (product.actionType === "visiting-card") {
      onOpenVisitingCardModal && onOpenVisitingCardModal();
    } else {
      onOpenProductInquiry && onOpenProductInquiry(product);
    }
  };

  return (
    <section id="products" className="py-24 bg-[#0a0a0c] border-t border-white/10 relative overflow-hidden">
      
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-studio-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-studio-orange/10 border border-studio-orange/30 text-studio-orange text-xs font-bold uppercase tracking-widest mb-3">
            <Package className="w-4 h-4 text-studio-orange" />
            <span>STUDIO DIGITAL & PRINT PRODUCTS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            OUR POPULAR <span className="text-studio-orange">STUDIO PRODUCTS</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            High-definition printing, handcrafted photo frames, visiting cards, LED video displays & studio services.
          </p>
        </div>

        {/* Category Filter Pills (Common User Friendly Selection) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 shadow-md ${
                selectedCategory === cat.id
                  ? 'bg-studio-orange text-white shadow-glow-orange scale-105'
                  : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-studio-card rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-studio-orange/50 transition-all duration-300 group hover:-translate-y-1 shadow-2xl relative"
            >
              {/* Top Image Preview with Badge */}
              <div className="relative h-56 w-full overflow-hidden bg-black/40">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-card via-transparent to-black/30" />

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white bg-studio-orange shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-studio-orange transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {product.shortDesc || product.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle className="w-3.5 h-3.5 text-studio-orange shrink-0" />
                      <span>{product.category} Service</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-studio-orange shrink-0" />
                      <span>Studio Quality Guaranteed</span>
                    </div>
                  </div>
                </div>

                {/* Primary Action CTA */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase block">Inquire Via</span>
                    <span className="font-serif text-sm font-bold text-emerald-400 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleProductAction(product)}
                    className="px-5 py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-studio-orange to-amber-600 hover:from-studio-orangeHover hover:to-amber-700 shadow-glow-orange flex items-center gap-2 transform group-hover:scale-105 transition-all"
                  >
                    <span>{product.ctaText || "ORDER NOW"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
