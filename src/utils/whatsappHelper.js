import { studioConfig } from '../data/studioConfig.js';
import { frameStyles } from '../data/frames.js';
import { frameSizes, mattingOptions } from '../data/pricing.js';
import { calculateFramePrice } from './priceCalculator.js';

// JOURNEY A: PHOTOGRAPHY INQUIRY MESSAGE
export function buildPhotographyInquiryMessage({
  customerName = "Customer",
  customerPhone = "",
  serviceName = "Wedding Photography",
  eventType = "",
  eventDate = "",
  eventLocation = "",
  numberOfDays = "1",
  budget = "",
  requirements = ""
}) {
  let text = `Hello Kamali Digital Studio,\n\n`;
  text += `I would like to enquire about your Photography & Videography Services.\n\n`;
  text += `📸 *PHOTOGRAPHY INQUIRY DETAILS*\n`;
  text += `• *Service:* ${serviceName}\n`;
  if (eventType && eventType.trim()) text += `• *Event Type:* ${eventType.trim()}\n`;
  if (eventDate && eventDate.trim()) text += `• *Event Date:* ${eventDate.trim()}\n`;
  if (eventLocation && eventLocation.trim()) text += `• *Location:* ${eventLocation.trim()}\n`;
  text += `• *Duration:* ${numberOfDays} Day(s)\n`;
  if (budget && budget.trim()) text += `• *Estimated Budget:* ${budget.trim()}\n`;
  if (requirements && requirements.trim()) text += `• *Special Requirements:* ${requirements.trim()}\n`;
  text += `\n👤 *CUSTOMER INFO*\n`;
  text += `• *Name:* ${customerName}\n`;
  if (customerPhone && customerPhone.trim()) text += `• *Phone:* ${customerPhone}\n`;
  text += `\nPlease check your calendar availability and provide package quotes. Thank you!`;

  return text;
}

// JOURNEY B: FRAME ORDER MESSAGE (Based on Frame Price Menu Poster)
export function buildWhatsAppOrderMessage({
  customerName = "Customer",
  customerPhone = "",
  deliveryOption = "Studio Pickup",
  notes = "",
  frameId,
  sizeId,
  mattingId,
  customText = "",
  quantity = 1
}) {
  const frame = frameStyles.find(f => f.id === frameId) || frameStyles[0];
  const size = frameSizes.find(s => s.id === sizeId) || frameSizes[4];
  const matting = mattingOptions.find(m => m.id === mattingId) || mattingOptions[0];
  
  const basePricing = calculateFramePrice({ frameId, sizeId, mattingId, quantity });
  const formattedTotal = `₹${basePricing.grandTotal.toLocaleString('en-IN')}`;

  let text = `Hello Kamali Digital Studio,\n\n`;
  text += `I would like to order a custom photo frame!\n\n`;
  text += `🖼️ *FRAME ORDER DETAILS*\n`;
  text += `• *Frame Style:* ${frame.name}\n`;
  text += `• *Size:* ${size.label} (${size.dimensions})\n`;
  text += `• *Matting:* ${matting.label}\n`;
  if (customText && customText.trim()) text += `• *Custom Text:* "${customText.trim()}"\n`;
  text += `• *Quantity:* ${quantity}\n`;
  text += `• *Estimated Total:* ${formattedTotal}\n\n`;
  text += `👤 *CUSTOMER INFO*\n`;
  text += `• *Name:* ${customerName}\n`;
  if (customerPhone && customerPhone.trim()) text += `• *Phone:* ${customerPhone}\n`;
  text += `• *Fulfillment:* ${deliveryOption}\n`;
  if (notes && notes.trim()) text += `• *Note:* ${notes.trim()}\n`;
  text += `\n📌 *PHOTO ATTACHMENT: Please attach your photo as a DOCUMENT (📎 ➔ Document) in this chat for 100% full-resolution HD print quality!* 📸\n`;
  text += `\nPlease confirm order availability and final price. Thank you!`;

  return text;
}

// JOURNEY C: PRODUCT & PRINTING INQUIRY MESSAGE
export function buildProductInquiryMessage({
  customerName = "Customer",
  customerPhone = "",
  productTitle = "Custom Photo Gift",
  productCategory = "Product",
  quantity = 1,
  notes = ""
}) {
  let text = `Hello Kamali Digital Studio,\n\n`;
  text += `I am interested in ordering your customized studio products:\n\n`;
  text += `🎁 *PRODUCT ORDER DETAILS*\n`;
  text += `• *Product:* ${productTitle}\n`;
  text += `• *Category:* ${productCategory}\n`;
  text += `• *Quantity:* ${quantity}\n`;
  if (notes && notes.trim()) text += `• *Customization Notes:* ${notes.trim()}\n`;
  text += `\n👤 *CUSTOMER INFO*\n`;
  text += `• *Name:* ${customerName}\n`;
  if (customerPhone && customerPhone.trim()) text += `• *Phone:* ${customerPhone}\n`;
  text += `\nPlease provide final pricing, printing time, and delivery timeline. Thank you!`;

  return text;
}

// JOURNEY D: VISITING CARD ORDER / DESIGN REQUEST MESSAGE
export function buildVisitingCardRequestMessage({
  mode = "has-design",
  customerName = "Customer",
  businessName = "",
  customerPhone = "",
  email = "",
  paperFinish = "Matte 350 GSM",
  quantity = "250",
  address = "",
  designNotes = ""
}) {
  let text = `Hello Kamali Digital Studio,\n\n`;
  text += `I would like to order Visiting Cards with ${mode === 'has-design' ? 'my existing design' : 'custom design assistance'}.\n\n`;
  text += `📇 *VISITING CARD ORDER DETAILS*\n`;
  text += `• *Order Mode:* ${mode === 'has-design' ? 'I Have My Own File/Design' : 'Request Studio Custom Design'}\n`;
  if (businessName && businessName.trim()) text += `• *Business / Brand:* ${businessName.trim()}\n`;
  text += `• *Paper Finish:* ${paperFinish}\n`;
  text += `• *Quantity:* ${quantity} Cards\n`;
  if (address && address.trim()) text += `• *Delivery Address:* ${address.trim()}\n`;
  if (designNotes && designNotes.trim()) text += `• *Design Notes:* ${designNotes.trim()}\n`;
  text += `\n👤 *CONTACT INFO*\n`;
  text += `• *Name:* ${customerName}\n`;
  if (customerPhone && customerPhone.trim()) text += `• *Phone:* ${customerPhone}\n`;
  if (email && email.trim()) text += `• *Email:* ${email}\n`;
  if (mode === 'has-design') {
    text += `\n📎 *FILE ATTACHMENT: I will attach my CDR / PDF / PSD / AI / JPG file as a Document in this chat.*\n`;
  }
  text += `\nPlease confirm pricing quote and turnaround time. Thank you!`;

  return text;
}

// JOURNEY E: GENERAL CONTACT FORM INQUIRY MESSAGE
export function buildGeneralInquiryMessage({
  name = "Customer",
  phone = "",
  email = "",
  message = ""
}) {
  let text = `Hello Kamali Digital Studio,\n\n`;
  text += `I have a general inquiry from your website contact form:\n\n`;
  text += `💬 *INQUIRY DETAILS*\n`;
  text += `• *Name:* ${name}\n`;
  if (phone && phone.trim()) text += `• *Phone:* ${phone.trim()}\n`;
  if (email && email.trim()) text += `• *Email:* ${email.trim()}\n`;
  if (message && message.trim()) text += `• *Message:* ${message.trim()}\n`;
  text += `\nPlease get in touch with me at your earliest convenience. Thank you!`;

  return text;
}

export function generateWhatsAppLink(messageText) {
  const phone = studioConfig.contact.whatsappPhone;
  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${phone}?text=${encodedText}`;
}
