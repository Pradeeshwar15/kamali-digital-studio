import React from 'react';
import { testimonialsData } from '../data/testimonials.js';
import { studioConfig } from '../data/studioConfig.js';
import { Star, Quote, Heart, CheckCircle2, ExternalLink, MessageSquare } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#0c0c0f] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-studio-orange/10 border border-studio-orange/20 text-studio-orange text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2.5">
            <Heart className="w-3.5 h-3.5 text-studio-orange" />
            <span>REAL CLIENT EXPERIENCES</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
            WHAT OUR CUSTOMERS <span className="text-studio-orange">SAY</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-base mt-2">
            Real feedback from families, newlyweds, and business owners across Cheyyar & surrounding regions.
          </p>

          {/* Google Reviews Trust Bar & Direct Review CTA */}
          <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              {/* Google G Emblem */}
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-white text-base">4.9</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <span className="text-[11px] text-gray-400 font-medium block">
                  Based on 180+ Verified Google Reviews
                </span>
              </div>
            </div>

            {/* Write a Google Review Button */}
            <a
              href={studioConfig.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-studio-orange to-amber-600 hover:from-studio-orangeHover hover:to-amber-700 shadow-glow-orange flex items-center justify-center gap-2 transition-all hover:scale-105 shrink-0"
              title="Leave a review for Kamali Studio on Google Maps"
            >
              <span>WRITE A REVIEW</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Real Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonialsData.map((t) => (
            <div
              key={t.id}
              className="bg-studio-card p-5 sm:p-6 rounded-2xl border border-white/10 relative flex flex-col justify-between hover:border-studio-orange/40 transition-all duration-300 shadow-xl group"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5 group-hover:text-studio-orange/20 transition-colors pointer-events-none" />

              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Verified Client</span>
                  </span>
                </div>

                {/* Comment */}
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author & Occasion */}
              <div className="flex items-center gap-3 pt-3.5 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-full object-cover border-2 border-studio-orange shrink-0 pointer-events-none select-none"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <h4 className="font-serif text-sm font-bold text-white truncate">
                    {t.name}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] text-studio-orange font-medium block truncate">
                    {t.role}
                  </span>
                  <span className="text-[9px] text-gray-400 block">
                    {t.location} • {t.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Review Prompt Banner */}
        <div className="mt-10 sm:mt-14 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-studio-card via-[#14141c] to-studio-card border border-white/10 text-center max-w-2xl mx-auto">
          <h4 className="font-serif text-base sm:text-lg font-bold text-white mb-1">
            Are You a Recent Client of Kamali Studio?
          </h4>
          <p className="text-xs text-gray-400 mb-4">
            Your review helps other families in Cheyyar choose the best photography and framing services.
          </p>
          <a
            href={studioConfig.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-studio-orange border border-white/15 hover:border-studio-orange transition-all"
          >
            <span>Rate & Review Us on Google</span>
            <ExternalLink className="w-3.5 h-3.5 text-studio-orange group-hover:text-white" />
          </a>
        </div>

      </div>
    </section>
  );
}
