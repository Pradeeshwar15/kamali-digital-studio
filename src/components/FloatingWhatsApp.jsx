import React from 'react';
import { studioConfig } from '../data/studioConfig.js';
import { MessageSquare } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${studioConfig.whatsappNumber}?text=${encodeURIComponent('Hello Kamali Digital Studio, I have an inquiry regarding photography / custom frame services.')}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-500 text-white shadow-2xl hover:bg-emerald-600 hover:scale-110 transition-all duration-300 group border-2 border-white/20"
      title="Chat on WhatsApp"
      aria-label="Contact Studio on WhatsApp"
    >
      <MessageSquare className="w-6 h-6 animate-pulse" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-black/90 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 shadow-xl pointer-events-none">
        Chat with Kamali Studio
      </span>
    </a>
  );
}
