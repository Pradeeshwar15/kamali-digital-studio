import fs from 'fs';
import path from 'path';

const inv = JSON.parse(fs.readFileSync('public/images/inventory.json', 'utf8'));

const titles = {
  wedding: [
    'Sacred Muhurtham Vows', 'Grand Stage Garland Exchange', 'Royal Mandap Ceremonies',
    'Golden Bridal Entrance', 'Vows in Golden Sunlight', 'Reception Gala Spotlight',
    'Timeless Couple Embrace', 'Sacred Mangalsutra Ritual', 'Grand Floral Stage',
    'Royal Evening Reception', 'Saptapadi Sacred Steps', 'Sindoor Blessing Moment'
  ],
  candid: [
    'Unfiltered Joy & Laughter', 'Stolen Glances of Love', 'Playful Bride Candid',
    'Heartfelt Family Tears of Joy', 'Festive Celebration Candid', 'Bespoke Ceremony Smile'
  ],
  events: [
    'Milestone Birthday Jubilee', 'Grand House Warming Entrance', 'Sacred Puberty Ceremony Glow',
    'Ear Piercing Blessings', 'Joyful Family Gathering', 'Festive Haldi Splash',
    'Evening Celebration Lights', 'Milestone Stage Celebrations'
  ],
  outdoor: [
    'Golden Hour Sunlit Trail', 'Lakeside Serenade Portrait', 'Romantic Breeze Couple Shoot',
    'Emerald Garden Canopy', 'Sunlit Heritage Whispers', 'Evening Coastal Glow',
    'Scenic Outdoor Romance', 'Verdant Meadow Romance'
  ],
  portraits: [
    'Little Angel First Smile', 'Charming Baby Giggles', 'Innocent Golden Moments',
    'Baby Boy Milestone Shoot', 'Little Princess Smiles', 'Dashing Groom Solo Portrait',
    'Bridal Splendor & Silk', 'Studio Lighting Elegance', 'Ethereal Classic Portrait'
  ],
  prewedding: [
    'Sunset Whispers Pre-Wedding', 'Fort Heritage Love Story'
  ],
  traditional: [
    'Sacred Traditional Temple Rituals'
  ]
};

const categoryLabels = {
  wedding: 'Wedding',
  candid: 'Candid',
  events: 'Events',
  outdoor: 'Outdoor',
  portraits: 'Portraits',
  prewedding: 'Pre-wedding',
  traditional: 'Traditional'
};

const items = [];
let id = 1;

for (const item of inv) {
  if (item.category === 'branding') continue;
  const cat = item.category;
  const label = categoryLabels[cat] || 'Wedding';
  const list = titles[cat] || ['Memorable Studio Capture'];
  const titleIndex = (id - 1) % list.length;
  const title = list[titleIndex] || 'Memorable Moment';
  const aspect = item.aspectRatio === 'landscape' ? 'aspect-[3/2]' : 'aspect-[3/4]';
  
  items.push({
    id: id++,
    title: title,
    category: label,
    image: item.relativePath,
    aspectRatio: aspect,
    caption: `${title} captured with authentic emotion and artistic lighting by Kamali Digital Studio.`,
    tag: `${label} Shoot`,
    location: (id % 3 === 0) ? 'Cheyyar' : (id % 3 === 1 ? 'Tiruvannamalai' : 'Heritage Hall, TN')
  });
}

const content = `export const galleryCategories = [
  "ALL",
  "Wedding",
  "Candid",
  "Traditional",
  "Pre-wedding",
  "Events",
  "Portraits",
  "Outdoor"
];

export const galleryItems = ${JSON.stringify(items, null, 2)};
`;

fs.writeFileSync('src/data/gallery.js', content, 'utf8');
console.log(`Successfully generated ${items.length} real gallery items in src/data/gallery.js!`);
