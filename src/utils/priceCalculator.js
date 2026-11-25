import { frameStyles } from '../data/frames.js';
import { frameSizes, mattingOptions } from '../data/pricing.js';

export function calculateFramePrice({
  frameId = "classic-wood",
  sizeId = "12x15",
  mattingId = "none",
  quantity = 1
}) {
  const selectedFrame = frameStyles.find(f => f.id === frameId) || frameStyles[0];
  const selectedSize = frameSizes.find(s => s.id === sizeId) || frameSizes[4]; // Default 12x15
  const selectedMatting = mattingOptions.find(m => m.id === mattingId) || mattingOptions[0];

  // Base price is driven directly by the size menu from the poster
  const sizePrice = selectedSize.price;
  const mattingPrice = selectedMatting.priceAddon || 0;

  const unitTotal = sizePrice + mattingPrice;
  const grandTotal = unitTotal * Math.max(1, quantity);

  return {
    basePrice: sizePrice,
    sizePrice,
    mattingPrice,
    unitTotal,
    grandTotal,
    quantity,
    formattedUnitTotal: `₹${unitTotal.toLocaleString('en-IN')}`,
    formattedGrandTotal: `₹${grandTotal.toLocaleString('en-IN')}`
  };
}
