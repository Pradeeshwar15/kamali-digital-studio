import React, { useState } from 'react';
import { generateWhatsAppLink, buildPhotographyInquiryMessage } from '../../utils/whatsappHelper.js';
import { sanitizeText, sanitizePhone, checkSubmissionRateLimit } from '../../utils/security.js';
import { X, Camera, MessageSquare, Sparkles, User, Phone, MapPin, Calendar, Clock, Tag } from 'lucide-react';

export default function PhotographyInquiryModal({
  isOpen,
  onClose,
  initialService = "Wedding Photography & Videography"
}) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [serviceName, setServiceName] = useState(initialService);
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('1');
  const [budget, setBudget] = useState('');
  const [requirements, setRequirements] = useState('');

  // Update state if the initialService prop changes (e.g. clicking different gallery categories)
  React.useEffect(() => {
    if (initialService) {
      setServiceName(initialService);
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkSubmissionRateLimit('photography-inquiry', 2500)) {
      alert("Please wait a moment before submitting another booking inquiry.");
      return;
    }
    const msg = buildPhotographyInquiryMessage({
      customerName: sanitizeText(customerName) || 'Customer',
      customerPhone: sanitizePhone(customerPhone),
      serviceName: sanitizeText(serviceName),
      eventType: sanitizeText(eventType),
      eventDate: sanitizeText(eventDate),
      eventLocation: sanitizeText(eventLocation),
      numberOfDays: sanitizeText(numberOfDays),
      budget: sanitizeText(budget),
      requirements: sanitizeText(requirements, 500)
    });

    const link = generateWhatsAppLink(msg);
    window.open(link, '_blank');
    onClose();
  };

  const standardServiceOptions = [
    "Wedding Package Inquiry",
    "Wedding Photography & Videography",
    "Event Photography",
    "Portrait Photography",
    "Outdoor Shoot",
    "4K Drone Aerial Coverage"
  ];

  // Ensure the passed serviceName exists in the options list so the select dropdown works correctly
  const renderServiceOptions = () => {
    const options = [...standardServiceOptions];
    if (serviceName && !options.includes(serviceName)) {
      options.unshift(serviceName);
    }
    return options.map(opt => (
      <option key={opt} value={opt}>{opt}</option>
    ));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="max-w-xl w-full bg-studio-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-5 relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-studio-orange/10 border border-studio-orange/30 text-studio-orange text-xs font-bold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>PHOTOGRAPHY & VIDEO BOOKING</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            BOOK A <span className="text-studio-orange">PHOTOGRAPHY SHOOT</span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Fill in your event details below to send an instant inquiry to studio team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="e.g. Ananya Ramesh"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-studio-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-studio-orange" />
                <span>Phone Number *</span>
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+91 78260 60289"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-studio-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-studio-orange" />
              <span>Service Requirement</span>
            </label>
            <select
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
            >
              {renderServiceOptions()}
            </select>
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
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
                placeholder="e.g. Cheyyar / Chennai"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-studio-orange" />
                <span>Duration (Days)</span>
              </label>
              <select
                value={numberOfDays}
                onChange={(e) => setNumberOfDays(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
              >
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4+">4+ Days</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Estimated Budget (Optional)</label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. ₹80,000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Special Requirements (Optional)</label>
            <textarea
              rows="3"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="e.g. Need candid album + drone video coverage..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-studio-orange hover:bg-studio-orangeHover shadow-glow-orange flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span>SEND INQUIRY VIA WHATSAPP</span>
          </button>
        </form>

      </div>
    </div>
  );
}
