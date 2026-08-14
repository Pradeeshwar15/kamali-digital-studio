import { studioConfig } from '../data/studioConfig.js';
import { frameStyles } from '../data/frames.js';
import { frameSizes, frameFinishes, mattingOptions } from '../data/pricing.js';
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
  if (eventType.trim()) text += `• *Event Type:* ${eventType.trim()}\n`;
  if (eventDate.trim()) text += `• *Event Date:* ${eventDate.trim()}\n`;
  if (eventLocation.trim()) text += `• *Location:* ${eventLocation.trim()}\n`;
  text += `• *Duration:* ${numberOfDays} Day(s)\n`;
  if (budget.trim()) text += `• *Estimated Budget:* ${budget.trim()}\n`;
  if (requirements.trim()) text += `• *Special Requirements:* ${requirements.trim()}\n`;
  text += `\n👤 *CUSTOMER INFO*\n`;
  text += `• *Name:* ${customerName}\n`;
  if (customerPhone.trim()) text += `• *Phone:* ${customerPhone}\n`;
  text += `\nPlease check your calendar availability and provide package quotes. Thank you!`;

  return text;
}

// JOURNEY B: FRAME ORDER MESSAGE
export function buildWhatsAppOrderMessage({
  customerName = "Customer",
  customerPhone = "",
  deliveryOption = "Studio Pickup",
  notes = "",
  frameId,
  sizeId,
  finishId,
  mattingId,
  customText = "",
  quantity = 1
}) {
  const frame = frameStyles.find(f => f.id === frameId) || frameStyles[0];
  const size = frameSizes.find(s => s.id === sizeId) || frameSizes[1];
  const finish = frameFinishes.find(fn => fn.id === finishId) || frameFinishes[0];
  const matting = mattingOptions.find(m => m.id === mattingId) || mattingOptions[0];
  
  const basePricing = calculateFramePrice({ frameId, sizeId, finishId, mattingId, quantity });
  const formattedTotal = `₹${basePricing.grandTotal.toLocaleString('en-IN')}`;

  let text = `Hello Kamali Digital Studio,\n\n`;
  text += `I would like to order a custom photo frame!\n\n`;
  text += `🖼️ *FRAME ORDER DETAILS*\n`;
  text += `• *Frame Style:* ${frame.name}\n`;
  text += `• *Size:* ${size.label} (${size.dimensions})\n`;
  text += `• *Finish:* ${finish.label}\n`;
  text += `• *Matting:* ${matting.label}\n`;
  if (customText.trim()) text += `• *Custom Text:* "${customText.trim()}"\n`;
  text += `• *Quantity:* ${quantity}\n`;
  text += `• *Estimated Total:* ${formattedTotal}\n\n`;
  text += `👤 *CUSTOMER INFO*\n`;
  text += `• *Name:* ${customerName}\n`;
  if (customerPhone.trim()) text += `• *Phone:* ${customerPhone}\n`;
  text += `• *Fulfillment:* ${deliveryOption}\n`;
  if (notes.trim()) text += `• *Note:* ${notes.trim()}\n`;
  text += `\nPlease confirm order availability and final price. Thank you!`;

  return text;
}

// JOURNEY C: PRODUCT & PRINTING INQUIRY MESSAGE
export function buildProductInquiryMessage({
  customerName = "Customer",
  customerPhone = "",
  productTitle = "Photo Printing",
  hasDesign = "Yes",
  quantity = "100",
  specifications = "",
  notes = ""
}) {
  let text = `Hello Kamali Digital Studio,\n\n`;
  text += `I would like to enquire about your Printing & Digital Products.\n\n`;
  text += `🖨️ *PRODUCT INQUIRY DETAILS*\n`;
  text += `• *Product:* ${productTitle}\n`;
  text += `• *Have Own Design:* ${hasDesign}\n`;
  text += `• *Quantity:* ${quantity}\n`;
  if (specifications.trim()) text += `• *Specifications:* ${specifications.trim()}\n`;
  if (notes.trim()) text += `• *Note:* ${notes.trim()}\n`;
  text += `\n👤 *CUSTOMER INFO*\n`;
  text += `• *Name:* ${customerName}\n`;
  if (customerPhone.trim()) text += `• *Phone:* ${customerPhone}\n`;
  text += `\nPlease provide price estimate and printing timeline. Thank you!`;

  return text;
}

// JOURNEY D: VISITING CARD & DESIGN REQUEST MESSAGE
export function buildVisitingCardRequestMessage({
  mode = "has-design", // "has-design" vs "request-design"
  customerName = "Customer",
  businessName = "",
  customerPhone = "",
  email = "",
  paperFinish = "Matte",
  quantity = "250",
  address = "",
  designNotes = ""
}) {
  let text = `Hello Kamali Digital Studio,\n\n`;
  if (mode === "has-design") {
    text += `I have a Visiting Card design ready to print!\n\n`;
    text += `💳 *VISITING CARD PRINT ORDER*\n`;
    text += `• *Quantity:* ${quantity} Cards\n`;
    text += `• *Paper Finish:* ${paperFinish}\n`;
    if (designNotes.trim()) text += `• *Note:* ${designNotes.trim()}\n`;
  } else {
    text += `I would like Kamali Digital Studio to design my Visiting Card!\n\n`;
    text += `🎨 *VISITING CARD DESIGN REQUEST*\n`;
    if (businessName.trim()) text += `• *Business Name:* ${businessName.trim()}\n`;
    text += `• *Quantity Needed:* ${quantity} Cards\n`;
    text += `• *Preferred Finish:* ${paperFinish}\n`;
    if (address.trim()) text += `• *Business Address:* ${address.trim()}\n`;
    if (designNotes.trim()) text += `• *Design Brief:* ${designNotes.trim()}\n`;
  }

  text += `\n👤 *CONTACT DETAILS*\n`;
  text += `• *Name:* ${customerName}\n`;
  if (customerPhone.trim()) text += `• *Phone:* ${customerPhone}\n`;
  if (email.trim()) text += `• *Email:* ${email.trim()}\n`;
  text += `\nPlease guide me on the next steps. Thank you!`;

  return text;
}

export function generateWhatsAppLink(messageText) {
  const encodedText = encodeURIComponent(messageText);
  const targetPhone = studioConfig.whatsappNumber;
  return `https://wa.me/${targetPhone}?text=${encodedText}`;
}
