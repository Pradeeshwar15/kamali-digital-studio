import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = path.resolve('photos');
const TARGET_BASE = path.resolve('public/images');

// Category mapping helper based on filename
function getCategory(filename) {
  const lower = filename.toLowerCase();
  if (lower.startsWith('logo')) return 'branding';
  if (lower.startsWith('baby') || lower.startsWith('portrait')) return 'portraits';
  if (lower.startsWith('candi') || lower.startsWith('candit')) return 'candid';
  if (lower.startsWith('event') || lower.startsWith('img-')) return 'events';
  if (lower.startsWith('prewedding')) return 'prewedding';
  if (lower.startsWith('traditional')) return 'traditional';
  if (lower.startsWith('outdoor')) return 'outdoor';
  if (lower.startsWith('weddi') || lower.startsWith('wedding')) return 'wedding';
  return 'general';
}

async function convertAll() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Source directory ${SOURCE_DIR} does not exist!`);
    process.exit(1);
  }

  const files = fs.readdirSync(SOURCE_DIR).filter(f => /\.(jpe?g|png)$/i.test(f));
  console.log(`Found ${files.length} images to convert in ${SOURCE_DIR}...`);

  let totalOriginalBytes = 0;
  let totalOptimizedBytes = 0;
  const processedFiles = [];

  for (const file of files) {
    const srcPath = path.join(SOURCE_DIR, file);
    const category = getCategory(file);
    const targetDir = path.join(TARGET_BASE, 'gallery', category);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const baseName = path.parse(file).name;
    const destName = `${baseName}.webp`;
    const destPath = path.join(targetDir, destName);

    const origStats = fs.statSync(srcPath);
    totalOriginalBytes += origStats.size;

    const image = sharp(srcPath);
    const metadata = await image.metadata();

    // Resize if oversized (limit max dimension to 1920px while preserving aspect ratio)
    let pipeline = image.rotate(); // Auto-rotate based on EXIF
    if (metadata.width > 1920 || metadata.height > 1920) {
      pipeline = pipeline.resize({
        width: metadata.width >= metadata.height ? 1920 : undefined,
        height: metadata.height > metadata.width ? 1920 : undefined,
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Convert to webp with high quality 82
    await pipeline
      .webp({ quality: 82, effort: 6 })
      .toFile(destPath);

    const optStats = fs.statSync(destPath);
    totalOptimizedBytes += optStats.size;

    const savingsPercent = ((1 - optStats.size / origStats.size) * 100).toFixed(1);
    console.log(`✓ [${category}] ${file} (${(origStats.size / 1024 / 1024).toFixed(2)} MB) -> ${destName} (${(optStats.size / 1024).toFixed(1)} KB) [-${savingsPercent}%]`);

    processedFiles.push({
      original: file,
      category,
      webpName: destName,
      relativePath: `/images/gallery/${category}/${destName}`,
      width: metadata.width,
      height: metadata.height,
      aspectRatio: metadata.width >= metadata.height ? 'landscape' : 'portrait'
    });
  }

  // Create Hero selection from best landscape wedding & outdoor shots
  const heroDir = path.join(TARGET_BASE, 'hero');
  if (!fs.existsSync(heroDir)) {
    fs.mkdirSync(heroDir, { recursive: true });
  }

  // Pick suitable landscape images for Hero
  const heroCandidates = processedFiles.filter(f => 
    (f.category === 'wedding' || f.category === 'outdoor' || f.category === 'prewedding')
  );

  const heroSelections = ['wedding1.webp', 'outdoor6.webp', 'wedding10.webp', 'outdoor11.webp', 'wedding6.webp'];
  let heroIndex = 1;
  for (const hName of heroSelections) {
    const candidate = processedFiles.find(f => f.webpName === hName) || heroCandidates[heroIndex - 1];
    if (candidate) {
      const srcWebp = path.join(TARGET_BASE, 'gallery', candidate.category, candidate.webpName);
      const heroDest = path.join(heroDir, `hero-${heroIndex}.webp`);
      if (fs.existsSync(srcWebp)) {
        fs.copyFileSync(srcWebp, heroDest);
        console.log(`⭐ Created Hero Slide ${heroIndex}: /images/hero/hero-${heroIndex}.webp (from ${candidate.webpName})`);
        heroIndex++;
      }
    }
  }

  // Write inventory JSON for easy reference in gallery.js
  const inventoryPath = path.join(TARGET_BASE, 'inventory.json');
  fs.writeFileSync(inventoryPath, JSON.stringify(processedFiles, null, 2));

  console.log('\n=============================================');
  console.log(`TOTAL ORIGINAL SIZE:  ${(totalOriginalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`TOTAL OPTIMIZED SIZE: ${(totalOptimizedBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`TOTAL BANDWIDTH SAVED: ${((1 - totalOptimizedBytes / totalOriginalBytes) * 100).toFixed(1)}%`);
  console.log('=============================================\n');
}

convertAll().catch(err => {
  console.error("Conversion failed:", err);
  process.exit(1);
});
