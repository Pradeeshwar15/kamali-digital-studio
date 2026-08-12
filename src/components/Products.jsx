import React from 'react';
import { productsData } from '../data/products.js';
import { Package, Frame, Printer, CreditCard, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Products({
  onOpenDesigner,
  onOpenProductInquiry,
  onOpenVisitingCardModal,
  onOpenContact
}) {
  const handleProductAction = (product) => {
    switch (product.actionType) {
      case 'designer':
        onOpenDesigner && onOpenDesigner();
        break;
      case 'visiting-card':
        onOpenVisitingCardModal && onOpenVisitingCardModal();
        break;
      case 'product-inquiry':
        onOpenProductInquiry && onOpenProductInquiry(product);
        break;
      case 'contact':
        onOpenContact && onOpenContact();
        break;
      default:
        onOpenProductInquiry && onOpenProductInquiry(product);
    }
  };

  return (
    <section id="products" className="py-24 bg-[#0c0c0f] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-orange/10 border border-studio-orange/20 text-studio-orange text-xs font-bold uppercase tracking-widest mb-3">
            <Package className="w-3.5 h-3.5" />
            <span>PRINTING & DIGITAL PRODUCTS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            OUR FEATURED <span className="text-studio-orange">PRODUCTS</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            Custom photo frames, business cards, HD prints, illuminated backlight lightboxes, and grand event LED video wall displays.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData.map((prod) => (
            <div
              key={prod.id}
              className="bg-studio-card rounded-2xl border border-white/10 overflow-hidden hover:border-studio-orange/40 transition-all duration-300 group flex flex-col hover:-translate-y-1 shadow-xl"
            >
              {/* Product Image Banner */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-card via-studio-card/30 to-transparent" />
                
                {/* Badge */}
                {prod.badge && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold text-white bg-studio-orange shadow-md">
                    {prod.badge}
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-studio-orange uppercase tracking-wider block mb-1">
                    {prod.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-studio-orange transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {prod.shortDesc}
                  </p>
                </div>

                <button
                  onClick={() => handleProductAction(prod)}
                  className="w-full py-3 rounded-xl font-bold text-xs text-white bg-white/5 hover:bg-studio-orange border border-white/10 hover:border-studio-orange transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                  <span>{prod.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
