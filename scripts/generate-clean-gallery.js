import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function buildGallery() {
  const base = path.resolve('public/images/gallery');
  const catOrder = ['wedding', 'candid', 'portraits', 'events', 'outdoor', 'prewedding', 'traditional'];
  
  const displayNames = {
    wedding: 'Wedding',
    candid: 'Candid',
    portraits: 'Portraits',
    events: 'Events',
    outdoor: 'Outdoor',
    prewedding: 'Pre-wedding',
    traditional: 'Traditional'
  };

  const titles = {
    'wedding-01.webp': { title: 'Grand Mandapam Sacred Vows', location: 'Heritage Hall, TN' },
    'wedding-02.webp': { title: 'Eternal Garland Exchange', location: 'Tiruvannamalai' },
    'wedding-03.webp': { title: 'Royal Couple Portrait', location: 'Cheyyar' },
    'wedding-04.webp': { title: 'Traditional Muhurtham Ritual', location: 'Cheyyar Palace' },
    'wedding-05.webp': { title: 'Luminous Reception Glamour', location: 'Grand Ballroom' },
    'wedding-06.webp': { title: 'Golden Temple Ceremony', location: 'Vellore' },
    'wedding-07.webp': { title: 'Sacred Fire Mangalsutra Moments', location: 'Cheyyar' },
    'wedding-08.webp': { title: 'Joyful Haldi & Floral Bliss', location: 'Heritage Lawn' },
    'wedding-09.webp': { title: 'Bridal Elegance in Silk', location: 'Kanchipuram' },
    'wedding-10.webp': { title: 'Ceremonial Family Blessings', location: 'Cheyyar Mandapam' },
    'wedding-11.webp': { title: 'Grand Entry Celebration', location: 'Royal Lawn' },
    'wedding-12.webp': { title: 'Cherished Sunset Newlyweds', location: 'Temple Gardens' },
    'candid-01.webp': { title: 'Spontaneous Laughter & Joy', location: 'Cheyyar' },
    'candid-02.webp': { title: 'Stolen Romantic Glances', location: 'Heritage Hall' },
    'candid-03.webp': { title: 'Tender Pre-Wedding Smile', location: 'Garden Villa' },
    'candid-04.webp': { title: 'Heartfelt Family Moments', location: 'Tiruvannamalai' },
    'candid-05.webp': { title: 'The Giggles Behind the Stage', location: 'Cheyyar' },
    'candid-06.webp': { title: 'Golden Hour Pure Connection', location: 'Outdoor Lawn' },
    'baby-01.webp': { title: 'Little Angel First Smile', location: 'Kamali Studio, Cheyyar', tag: 'Baby Milestone' },
    'baby-02.webp': { title: 'Charming Baby Giggles', location: 'Kamali Studio, Cheyyar', tag: 'Baby Milestone' },
    'baby-03.webp': { title: 'Innocent Golden Moments', location: 'Cheyyar', tag: 'Baby Milestone' },
    'baby-04.webp': { title: 'Baby Boy Festive Shoot', location: 'Kamali Studio', tag: 'Baby Milestone' },
    'baby-05.webp': { title: 'Sweet Dreams Newborn Portrait', location: 'Kamali Studio', tag: 'Baby Milestone' },
    'portrait-01.webp': { title: 'Traditional Silk Sari Portrait', location: 'Kamali Studio', tag: 'Studio Portrait' },
    'portrait-02.webp': { title: 'Classic Studio Model Lighting', location: 'Kamali Studio', tag: 'Studio Portrait' },
    'portrait-03.webp': { title: 'Artistic Monochrome Expression', location: 'Kamali Studio', tag: 'Studio Portrait' },
    'portrait-04.webp': { title: 'Timeless Heritage Elegance', location: 'Kamali Studio', tag: 'Studio Portrait' },
    'event-01.webp': { title: 'Grand Housewarming Grahapravesam', location: 'Cheyyar' },
    'event-02.webp': { title: 'Traditional Ear Piercing Ceremony', location: 'Temple Complex' },
    'event-03.webp': { title: 'Milestone 1st Birthday Festivity', location: 'Cheyyar Hall' },
    'event-04.webp': { title: 'Golden Jubilee Celebration', location: 'Heritage Lawn' },
    'event-05.webp': { title: 'Sacred Ritual Gathering', location: 'Family Residence' },
    'event-06.webp': { title: 'Auspicious Kalash Pooja', location: 'Cheyyar' },
    'event-07.webp': { title: 'Family Festive Reunion', location: 'Tiruvannamalai' },
    'event-08.webp': { title: 'Evening Lights & Decor Ceremony', location: 'Cheyyar' },
    'outdoor-01.webp': { title: 'Scenic Lake Sunset Romance', location: 'Lakeview, TN' },
    'outdoor-02.webp': { title: 'Verdant Forest Trail Walk', location: 'Jawadhu Hills' },
    'outdoor-03.webp': { title: 'Lush Coconut Grove Stroll', location: 'Cheyyar Countryside' },
    'outdoor-04.webp': { title: 'Riverside Sunset Golden Glow', location: 'Cheyyar River' },
    'outdoor-05.webp': { title: 'Dramatic Misty Mountain Vista', location: 'Yelagiri' },
    'outdoor-06.webp': { title: 'Rustic Meadow Romance', location: 'Green Meadows' },
    'outdoor-07.webp': { title: 'Enchanting Canopy Pathway', location: 'Botanical Reserve' },
    'outdoor-08.webp': { title: 'Golden Hour Reflections', location: 'Sunset Point' },
    'prewedding-01.webp': { title: 'Whispers by the Waterside', location: 'Private Resort' },
    'prewedding-02.webp': { title: 'Sun-drenched Meadow Stroll', location: 'Countryside Villa' },
    'traditional-01.webp': { title: 'Sacred Fire Thali Muhurtham', location: 'Veda Mandapam' }
  };

  const galleryItems = [];
  let id = 1;

  for (const cat of catOrder) {
    const dir = path.join(base, cat);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp')).sort();
    
    for (const f of files) {
      const full = path.join(dir, f);
      const meta = await sharp(full).metadata();
      const isPortrait = meta.height > meta.width;
      const tInfo = titles[f] || { title: f.replace('.webp', ''), location: 'Cheyyar' };

      galleryItems.push({
        id: id++,
        title: tInfo.title,
        category: displayNames[cat],
        image: `/images/gallery/${cat}/${f}`,
        aspectRatio: isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]',
        caption: `${tInfo.title} captured with authentic emotion and artistic lighting by Kamali Digital Studio.`,
        tag: tInfo.tag || `${displayNames[cat]} Shoot`,
        location: tInfo.location
      });
    }
  }

  const js = `export const galleryCategories = [
  "ALL",
  "Wedding",
  "Candid",
  "Traditional",
  "Pre-wedding",
  "Events",
  "Portraits",
  "Outdoor"
];

export const galleryItems = ${JSON.stringify(galleryItems, null, 2)};
`;

  fs.writeFileSync('src/data/gallery.js', js);
  console.log(`✓ Successfully wrote src/data/gallery.js with ${galleryItems.length} items!`);
}

buildGallery().catch(console.error);
