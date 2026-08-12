import React, { useState } from 'react';
import { galleryCategories, galleryItems } from '../data/gallery.js';
import Lightbox from './Lightbox.jsx';
import { Camera, Eye, Frame } from 'lucide-react';

export default function Gallery({ onFrameThisPhoto, onBookPhotography }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activeItem, setActiveItem] = useState(null);

  const filteredItems = selectedCategory === "ALL"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 bg-[#0a0a0c] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-orange/10 border border-studio-orange/20 text-studio-orange text-xs font-bold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>PORTFOLIO GALLERY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            OUR FEATURED <span className="text-studio-orange">WORK</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            Explore authentic studio highlights across wedding sagas, candid moments, drone view, custom frame craft, and digital products.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-studio-orange text-white shadow-glow-orange'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-studio-card border border-white/10 aspect-[4/3] cursor-pointer shadow-lg hover:shadow-glow-orange transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />

              {/* Dark Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <span className="p-2.5 rounded-full bg-studio-orange text-white shadow-lg">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-studio-orange uppercase tracking-widest block mb-1">
                    {item.category} • {item.tag}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-xs line-clamp-2 mb-3">
                    {item.caption}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-studio-orange group-hover:text-white">
                    <Camera className="w-3.5 h-3.5" />
                    <span>View Details & Enquire</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <Lightbox
          item={activeItem}
          onClose={() => setActiveItem(null)}
          onFrameThisPhoto={onFrameThisPhoto}
          onBookPhotography={onBookPhotography}
        />
      )}
    </section>
  );
}
