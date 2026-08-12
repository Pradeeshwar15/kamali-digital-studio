import React from 'react';
import { photographyServices, digitalServices } from '../data/services.js';
import { Camera, HeartHandshake, Calendar, Frame, BookOpen, Sparkles, CheckCircle2, ArrowRight, Sun, Video, Printer, UserCheck } from 'lucide-react';

const iconMap = {
  HeartHandshake: HeartHandshake,
  Calendar: Calendar,
  Camera: Camera,
  Sun: Sun,
  Video: Video,
  Sparkles: Sparkles,
  Printer: Printer,
  UserCheck: UserCheck
};

export default function Services({ onOpenPhotographyInquiry, onOpenProductInquiry }) {
  return (
    <section id="services" className="py-24 bg-[#0a0a0c] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-orange/10 border border-studio-orange/20 text-studio-orange text-xs font-bold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>CONFIRMED STUDIO SERVICES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            PHOTOGRAPHY & <span className="text-studio-orange">DIGITAL SERVICES</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            From wedding sagas and drone flyovers to HD photo prints and biometric passport photos.
          </p>
        </div>

        {/* Section 1: Photography Services */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl font-bold text-white mb-8 border-l-4 border-studio-orange pl-4">
            PHOTOGRAPHY & VIDEOGRAPHY
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photographyServices.map((service) => {
              const IconComp = iconMap[service.icon] || Camera;
              return (
                <div
                  key={service.id}
                  className="bg-studio-card rounded-2xl border border-white/10 overflow-hidden hover:border-studio-orange/40 transition-all duration-300 group flex flex-col hover:-translate-y-1 shadow-xl"
                >
                  {/* Image Banner */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-studio-card via-studio-card/40 to-transparent" />
                    
                    <div className="absolute bottom-4 left-6 w-12 h-12 rounded-xl bg-studio-orange text-white flex items-center justify-center shadow-glow-orange">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs font-bold text-studio-orange tracking-wider uppercase mb-1">
                      {service.category}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-studio-orange transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm mb-6 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Sub-types */}
                    {service.subTypes && (
                      <ul className="space-y-2 mb-6 mt-auto">
                        {service.subTypes.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-studio-orange shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <button
                      onClick={() => onOpenPhotographyInquiry && onOpenPhotographyInquiry(service.title)}
                      className="w-full py-3 rounded-xl font-bold text-xs text-white bg-studio-orange hover:bg-studio-orangeHover shadow-glow-orange transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <span>BOOK / ENQUIRE THIS SERVICE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Photo / Digital Services */}
        <div>
          <h3 className="font-serif text-2xl font-bold text-white mb-8 border-l-4 border-amber-400 pl-4">
            PHOTO & DIGITAL EXPRESS SERVICES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {digitalServices.map((service) => {
              const IconComp = iconMap[service.icon] || Camera;
              return (
                <div
                  key={service.id}
                  className="bg-studio-card rounded-2xl border border-white/10 overflow-hidden hover:border-studio-orange/40 transition-all duration-300 group flex flex-col hover:-translate-y-1 shadow-xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-studio-orange flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-bold text-studio-orange tracking-wider uppercase mb-1">
                    {service.category}
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white mb-2">
                    {service.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  <button
                    onClick={() => onOpenProductInquiry && onOpenProductInquiry({ title: service.title })}
                    className="mt-auto w-full py-2.5 rounded-xl font-bold text-xs text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2"
                  >
                    <span>ENQUIRE SERVICE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-studio-orange" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
