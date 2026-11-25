# Kamali Digital Studio — Client Photo Placement & Image Optimization Guide

This guide explains how to convert raw camera JPGs (8–15 MB) into lightweight WebP format and link them into the website.

---

## 1. Where to Place Your Real Photos

Store all converted `.webp` photos inside the `public/images/` folder according to their category:

```
public/images/
├── hero/                   ← High-resolution horizontal photos for the top hero banner (1920x1080)
│   ├── hero-1.webp
│   ├── hero-2.webp
│   └── hero-3.webp
│
├── packages/               ← Official Studio Package Posters & Samples
│   ├── small-event-10k.jpg
│   ├── small-event-14k.jpg
│   ├── small-event-17k.jpg
│   └── small-event-25k.jpg
│
├── gallery/                ← Portfolio showcase photos (1200px max width)
│   ├── wedding/            ← Sacred rituals, couple portraits, reception
│   ├── candid/             ← Unfiltered smiles, glances, emotions
│   ├── traditional/        ← Muhurtham, garland exchange, temple ceremonies
│   ├── outdoor/            ← Pre-wedding sunset shoots, botanical gardens
│   ├── events/             ← Puberty functions, house warming, birthdays
│   └── portraits/          ← Baby photos, bridal makeup, groom solo
│
└── raw_incoming/           ← Temporary folder where you can drop raw 8-15 MB camera JPGs before converting
```

---

## 2. Converting Heavy 8–15 MB JPGs to WebP

> [!IMPORTANT]
> **Never upload raw 8–15 MB camera files directly to a website.**
> On mobile networks, downloading a few 15 MB files will freeze the phone and make the website take 30+ seconds to load.
> 
> Converting to **WebP (Quality 82%)** shrinks a **12 MB file down to ~200 KB** (a **98% size reduction**) with zero visible difference in clarity!

### Best Free Online Conversion Tools:
1. **[Squoosh.app](https://squoosh.app/)** (Google's free tool):
   * Drag your JPG file in.
   * Under **Compress**, select **WebP**.
   * Set **Quality** to **82**.
   * Under **Resize**, set **Width** to `1920` (for Hero banner) or `1200` (for Gallery photos).
   * Click download.

2. **[CloudConvert JPG to WebP](https://cloudconvert.com/jpg-to-webp)** (Batch converter):
   * Upload 10–20 JPG photos at once.
   * Convert to WebP and download the zip.

3. **Adobe Photoshop / Lightroom**:
   * `File` → `Export` → `Export As...`
   * Format: `WebP`
   * Quality: `80%`
   * Max width: `1920px`

---

## 3. How to Link Photos in Code

Once you place your `.webp` files in `public/images/`, you link them in the code starting with `/images/...`:

### A. Updating Portfolio Gallery Photos:
Open [`src/data/gallery.js`](file:///c:/Users/prade/OneDrive/Desktop/Kamali/Kamali%20Digital%20Studio/src/data/gallery.js) and replace the Unsplash URLs with your local paths:
```javascript
{
  id: 1,
  title: "Grand Reception Portrait",
  category: "Wedding",
  image: "/images/gallery/wedding/photo-1.webp",
  aspectRatio: "aspect-[3/4]",
  caption: "Couple portrait captured in evening stage lighting.",
  tag: "Wedding Portrait",
  location: "Cheyyar"
}
```

### B. Updating Top Hero Slideshow:
Open [`src/components/Hero.jsx`](file:///c:/Users/prade/OneDrive/Desktop/Kamali/Kamali%20Digital%20Studio/src/components/Hero.jsx) and update `HERO_IMAGES`:
```javascript
const HERO_IMAGES = [
  '/images/hero/hero-1.webp',
  '/images/hero/hero-2.webp',
  '/images/hero/hero-3.webp'
];
```

### C. Updating Sample Photos in 3D Frame Customizer:
Open [`src/components/designer/StepPhotoUpload.jsx`](file:///c:/Users/prade/OneDrive/Desktop/Kamali/Kamali%20Digital%20Studio/src/components/designer/StepPhotoUpload.jsx) and update `samplePhotos`:
```javascript
const samplePhotos = [
  { label: "Wedding Couple", url: "/images/gallery/wedding/photo-1.webp" },
  { label: "Family Portrait", url: "/images/gallery/events/photo-2.webp" },
  { label: "Baby Smile", url: "/images/gallery/portraits/baby-1.webp" }
];
```
