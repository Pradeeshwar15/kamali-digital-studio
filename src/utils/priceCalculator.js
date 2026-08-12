import { frameStyles } from '../data/frames.js';
import { frameSizes, frameFinishes, mattingOptions } from '../data/pricing.js';

export function calculateFramePrice({
  frameId = "classic-black",
  sizeId = "12x18",
  finishId = "matte",
  mattingId = "none",
  quantity = 1
}) {
  const selectedFrame = frameStyles.find(f => f.id === frameId) || frameStyles[0];
  const selectedSize = frameSizes.find(s => s.id === sizeId) || frameSizes[1];
  const selectedFinish = frameFinishes.find(fn => fn.id === finishId) || frameFinishes[0];
  const selectedMatting = mattingOptions.find(m => m.id === mattingId) || mattingOptions[0];

  const basePrice = selectedFrame.basePrice;
  const sizePrice = selectedSize.priceAddon;
  const finishPrice = selectedFinish.priceAddon;
  const mattingPrice = selectedMatting.priceAddon;

  const unitTotal = basePrice + sizePrice + finishPrice + mattingPrice;
  const grandTotal = unitTotal * Math.max(1, quantity);

  return {
    basePrice,
    sizePrice,
    finishPrice,
    mattingPrice,
    unitTotal,
    grandTotal,
    quantity,
    formattedUnitTotal: `₹${unitTotal.toLocaleString('en-IN')}`,
    formattedGrandTotal: `₹${grandTotal.toLocaleString('en-IN')}`
  };
}
