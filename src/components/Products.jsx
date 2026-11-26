import React from 'react';
import { productsData } from '../data/products.js';
import { Package, Sparkles, ArrowRight, Frame, CreditCard, Image as ImageIcon, Monitor, CheckCircle } from 'lucide-react';

export default function Products({ onOpenDesigner, onOpenProductInquiry, onOpenVisitingCardModal, onOpenContact }) {
  const handleProductAction = (product) => {
    if (product.actionType === "designer") {
      onOpenDesigner && onOpenDesigner();
    } else if (product.actionType === "visiting-card") {
      onOpenVisitingCardModal && onOpenVisitingCardModal();
    } else if (product.actionType === "contact") {
      onOpenContact && onOpenContact();
    } else {
      onOpenProductInquiry && onOpenProductInquiry(product);
    }
  };

  return (
    <section id="products" className="py-10 sm:py-16 md:py-20 bg-[#0a0a0c] border-t border-white/10 relative overflow-hidden">
      
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-studio-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (No Filter Tabs) */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-studio-orange/10 border border-studio-orange/30 text-studio-orange text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2.5">
            <Package className="w-3.5 h-3.5 text-studio-orange" />
            <span>STUDIO DIGITAL & PRINT PRODUCTS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
            OUR POPULAR <span className="text-studio-orange">PRODUCTS</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-base mt-2">
            Handcrafted custom photo frames, visiting cards, HD archival printing, invitation cards, LED wall displays & studio services.
          </p>
        </div>

        {/* All Products Displayed Together (2-column on mobile, 3 on tablet, 4 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="bg-studio-card rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-studio-orange/50 transition-all duration-300 group hover:-translate-y-1 shadow-xl relative select-none"
            >
              {/* Product Image Preview with Badge */}
              <div className="relative h-28 sm:h-48 w-full overflow-hidden bg-black/50 select-none">
                <img
                  src={product.image}
                  alt={product.title}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onError={(e) => {
                    if (product.fallbackImage && e.target.src !== product.fallbackImage) {
                      e.target.src = product.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-card via-transparent to-black/20 pointer-events-none" />

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider text-white bg-studio-orange shadow-md pointer-events-none">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-sm sm:text-lg font-bold text-white group-hover:text-studio-orange transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-gray-400 text-[11px] sm:text-xs mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed">
                    {product.shortDesc}
                  </p>
                </div>

                {/* Action CTA Button */}
                <div className="mt-3 sm:mt-5 pt-3 border-t border-white/5">
                  <button
                    onClick={() => handleProductAction(product)}
                    className="w-full py-2 sm:py-2.5 rounded-xl font-bold text-[10px] sm:text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all duration-300 bg-white/5 hover:bg-studio-orange text-white border border-white/10 hover:border-studio-orange hover:shadow-glow-orange group/btn"
                  >
                    <span>{product.ctaText}</span>
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
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
