import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { buildPhotographyInquiryMessage, generateWhatsAppLink } from '../../utils/whatsappHelper.js';
import { X, Camera, MessageSquare, Calendar, MapPin, User, Phone, Sparkles } from 'lucide-react';

export default function PhotographyInquiryModal({
  isOpen,
  onClose,
  initialService = "Wedding Photography & Videography",
  overrideWhatsapp = null
}) {
  const [serviceName, setServiceName] = useState(initialService);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('1');
  const [budget, setBudget] = useState('');
  const [requirements, setRequirements] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

    const msg = buildPhotographyInquiryMessage({
      customerName,
      customerPhone,
      serviceName,
      eventType,
      eventDate,
      eventLocation,
      numberOfDays,
      budget,
      requirements
    });

    const link = generateWhatsAppLink(msg, overrideWhatsapp);
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="max-w-xl w-full bg-studio-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-5 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-studio-orange/10 text-studio-orange border border-studio-orange/30 text-xs font-bold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>PHOTOGRAPHY BOOKING INQUIRY</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            BOOK / ENQUIRE <span className="text-studio-orange">PHOTOGRAPHY</span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Fill out your event details below to receive a personalized quote and check calendar availability via WhatsApp.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Select Photography Service *</label>
            <select
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-studio-orange"
            >
              <option value="Wedding Photography & Videography">Wedding Photography & Videography</option>
              <option value="Candid Photography">Candid Photography</option>
              <option value="Traditional Photography">Traditional Photography</option>
              <option value="Pre-wedding Photography">Pre-wedding Shoot</option>
              <option value="Post-wedding Photography">Post-wedding Shoot</option>
              <option value="Event Photography">Event Photography (Birthday/Anniversary)</option>
              <option value="Portrait Photography">Studio Portrait Shoot</option>
              <option value="Outdoor Shoot">Outdoor Fashion / Family Shoot</option>
              <option value="Drone Aerial Photography">Drone Aerial Videography</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-studio-orange" />
                <span>Your Name *</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Ananya & Vikram"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-studio-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-studio-orange" />
                <span>Mobile Phone / WhatsApp *</span>
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-studio-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-studio-orange" />
                <span>Event Date</span>
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-studio-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-studio-orange" />
                <span>Event Location / City</span>
              </label>
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                placeholder="e.g. Palace Gardens, City"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-studio-orange"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Duration (Days)</label>
              <select
                value={numberOfDays}
                onChange={(e) => setNumberOfDays(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
              >
                <option value="1">1 Day Event</option>
                <option value="2">2 Days Event</option>
                <option value="3+">3+ Days Multi-Ceremony</option>
                <option value="Half Day">Half Day (3-4 Hours)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Estimated Budget (Optional)</label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. ₹50,000 - ₹1,00,000"
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Special Requirements / Notes</label>
            <textarea
              rows="3"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Tell us about album preferences, LED wall needs, drone coverage, or timeline details..."
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-studio-orange"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-studio-orange to-amber-600 hover:from-studio-orangeHover hover:to-amber-700 shadow-glow-orange flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span>SEND INQUIRY TO WHATSAPP</span>
          </button>
        </form>

      </div>
    </div>
  );
}
