import React, { useState } from 'react';
import { studioConfig } from '../data/studioConfig.js';
import { generateWhatsAppLink, buildGeneralInquiryMessage } from '../utils/whatsappHelper.js';
import { Phone, MessageSquare, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = buildGeneralInquiryMessage(formData);
    const link = generateWhatsAppLink(msg);
    window.open(link, '_blank');
    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <section id="contact" className="py-24 bg-[#0c0c0f] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-orange/10 border border-studio-orange/20 text-studio-orange text-xs font-bold uppercase tracking-widest mb-3">
            <Phone className="w-3.5 h-3.5" />
            <span>VISIT OR CALL US</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            GET IN <span className="text-studio-orange">TOUCH</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            Have questions about frame sizes, photography packages, visiting card design, or custom bulk orders? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details & Quick Action Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <a
              href={`tel:${studioConfig.phone}`}
              className="p-6 rounded-2xl bg-studio-card border border-white/10 hover:border-studio-orange/40 transition-all flex items-center gap-5 group shadow-lg"
            >
              <div className="w-14 h-14 rounded-xl bg-studio-orange/10 text-studio-orange flex items-center justify-center shrink-0 group-hover:bg-studio-orange group-hover:text-white transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Call Direct</span>
                <span className="font-serif text-xl font-bold text-white group-hover:text-studio-orange transition-colors">{studioConfig.phone}</span>
              </div>
            </a>

            <a
              href={`https://wa.me/${studioConfig.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-500 transition-all flex items-center gap-5 group shadow-lg"
            >
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Instant WhatsApp Chat</span>
                <span className="font-serif text-xl font-bold text-white">Message Studio Owner</span>
              </div>
            </a>

            <div className="p-6 rounded-2xl bg-studio-card border border-white/10 flex items-start gap-5 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-white/5 text-gray-300 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-studio-orange" />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Studio Location</span>
                <p className="text-sm text-gray-200 mt-1 font-medium leading-relaxed">{studioConfig.address}</p>
                <a
                  href={studioConfig.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-xs font-bold text-studio-orange hover:underline"
                >
                  GET DIRECTIONS ON GOOGLE MAPS →
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-studio-card border border-white/10 flex items-center gap-5 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-white/5 text-gray-300 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-studio-orange" />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Opening Hours</span>
                <p className="text-xs text-gray-200 mt-1 font-medium">{studioConfig.workingHours}</p>
              </div>
            </div>

          </div>

          {/* Quick Inquiry Form */}
          <div className="lg:col-span-7 bg-studio-card p-8 rounded-2xl border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">Send an Inquiry</h3>
              <p className="text-xs text-gray-400 mb-6">Fill out your query below and our studio team will get back to you within 2 hours.</p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center my-8">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h4 className="font-serif text-xl font-bold text-white mb-1">Message Received!</h4>
                  <p className="text-xs text-emerald-300">Thank you for reaching out to Kamali Digital Studio. We will call you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-studio-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-studio-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-studio-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Your Message or Booking Query</label>
                    <textarea
                      rows="4"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Details about your photography requirement or product inquiry..."
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-studio-orange"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-studio-orange to-amber-600 hover:from-studio-orangeHover hover:to-amber-700 shadow-glow-orange flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>SEND MESSAGE</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
