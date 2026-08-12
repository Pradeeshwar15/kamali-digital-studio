# 📸 Kamali Digital Studio — Production Website & Custom Frame Designer

> **"CAPTURE BEYOND IMAGINATION"**  
> A modern, conversion-focused digital showroom, photography booking platform, and custom photo frame designer for **Kamali Digital Studio**.

---

## 🌟 Key Features

### 1. Custom Photo Frame Designer (Core Feature)
- **Multi-Step Customization**: Select Frame Style (Classic Black, Gold, Wooden, Brown, Silver), Upload Photo (with drag & drop, sample photo picks, and B&W/Sepia/HDR tone filters), Select Size (`8x10"`, `12x18"`, `16x24"`, `18x24"`), Select Finish (Matte, Glossy, Canvas), and Inscribe Custom Text.
- **Live 3D Visualizer**: Real-time rendering with wall paint color picker (Midnight Navy, Warm Cream, Deep Charcoal, Royal Emerald, Terracotta) and human/sofa scale reference overlay.
- **Transparent Price Calculator & WhatsApp Order**: Itemized price calculations + customer info form generating structured WhatsApp order messages with a celebratory confetti burst.

### 2. Multi-Channel Customer Journeys
- **Journey A — Photography Booking Inquiry**: Booking form for Wedding Photography & Videography (Candid, Traditional, Pre-wedding, Post-wedding), Event Photography, Studio Portraits, Outdoor Shoots, and 4K Drone Aerial Videography.
- **Journey B — Custom Frame Designer**: End-to-end frame customization and WhatsApp ordering.
- **Journey C — Printing & Digital Products Inquiry**: Photo Printing, Posters, Invitations, LED Walls, Backlight Lightboxes, and 5-Min Passport Photos.
- **Journey D — Visiting Card Order & Design Request**: Dual-path workflow (Path 1: Upload own design vs. Path 2: Request Kamali design team to create design -> WhatsApp).

### 3. Studio Owner Live Demo Admin Drawer
- A floating **"Owner Demo Controls"** panel allowing real-time testing of live WhatsApp business number updates and promotional pricing discounts without touching code.

---

## 🚀 Tech Stack

- **Framework**: React 18 + Vite 6
- **Styling**: Tailwind CSS + Lucide Icons + Google Fonts (`Cinzel` & `Inter`)
- **Interactivity**: Canvas Confetti
- **Language**: JavaScript (ES Modules)

---

## 🛠️ Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000/](http://localhost:3000/) in your browser.

### 3. Build for Production
```bash
npm run build
```
The production bundle will be generated inside the `dist/` directory.

---

## 📁 Project Structure

```
Kamali Digital Studio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Occasions.jsx
│   │   ├── FrameShowcase.jsx
│   │   ├── Products.jsx
│   │   ├── Services.jsx
│   │   ├── BeforeAfter.jsx
│   │   ├── Gallery.jsx
│   │   ├── Lightbox.jsx
│   │   ├── Testimonials.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── FloatingWhatsApp.jsx
│   │   ├── admin/
│   │   │   └── StudioAdminDrawer.jsx
│   │   ├── designer/
│   │   │   ├── FrameDesigner.jsx
│   │   │   ├── StepFrameSelect.jsx
│   │   │   ├── StepPhotoUpload.jsx
│   │   │   ├── StepCustomization.jsx
│   │   │   ├── LiveFramePreview.jsx
│   │   │   ├── PriceBreakdown.jsx
│   │   │   └── WhatsAppOrderModal.jsx
│   │   └── modals/
│   │       ├── PhotographyInquiryModal.jsx
│   │       ├── ProductInquiryModal.jsx
│   │       └── VisitingCardModal.jsx
│   ├── data/
│   │   ├── studioConfig.js
│   │   ├── services.js
│   │   ├── products.js
│   │   ├── frames.js
│   │   ├── pricing.js
│   │   ├── gallery.js
│   │   ├── occasions.js
│   │   └── testimonials.js
│   ├── utils/
│   │   ├── priceCalculator.js
│   │   └── whatsappHelper.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 📄 License & Copyright

© 2026 Kamali Digital Studio. All Rights Reserved.
