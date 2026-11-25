import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

// Optimize the transparent extractions without changing their aspect ratios.
const logo = await sharp('public/branding/dovvy-logo.png').trim().png().toBuffer();
const mark = await sharp('public/branding/dovvy-favicon.png').trim().png().toBuffer();
await sharp(logo).resize({ width: 1600, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile('public/branding/dovvy-logo.png');
await sharp(mark).resize(512, 512, { fit: 'contain', background: '#00000000' }).png({ compressionLevel: 9 }).toFile('public/branding/dovvy-favicon.png');
const sizes = [16, 32, 48];
const icons = await Promise.all(sizes.map(size => sharp(mark).resize(size, size, { fit: 'contain', background: '#00000000' }).png().toBuffer()));
const directory = Buffer.alloc(6 + icons.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(icons.length, 4);
let offset = directory.length;
icons.forEach((png, index) => {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(png.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
await writeFile('app/favicon.ico', Buffer.concat([directory, ...icons]));
for (const size of [16, 32, 48, 180]) {
  await sharp(mark).resize(size, size, { fit: 'contain', background: '#00000000' }).png({ compressionLevel: 9 }).toFile(`public/branding/favicon-${size}.png`);
}
console.log('Transparent brand PNGs and browser icons prepared.');
