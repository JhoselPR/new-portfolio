import { createCanvas, loadImage } from "canvas";
import fs from "fs";

const chars = " .:-=+*#%@".split("");

const processImage = (img, size) => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  const scale = 0.8;
  const imgAspect = img.width / img.height;

  let drawHeight = size * scale;
  let drawWidth = drawHeight * imgAspect;

  if (drawWidth > size * scale) {
    drawWidth = size * scale;
    drawHeight = drawWidth / imgAspect;
  }

  const offsetX = (size - drawWidth) / 2;
  const offsetY = (size - drawHeight) / 2;

  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

  const { data } = ctx.getImageData(0, 0, size, size);

  const rawParticles = [];

  const isMobile = size <= 280;
  const fontSize = isMobile ? 5 : 7;
  const colGap = fontSize * 0.7;
  const rowGap = fontSize * 1.1;

  for (let y = 0; y < size; y += rowGap) {
    for (let x = 0; x < size; x += colGap) {
      const i = (Math.floor(y) * size + Math.floor(x)) * 4;
      const a = data[i + 3];

      if (a > 128) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const brightness = (r + g + b) / (3 * 255);
        const charIndex = Math.floor(brightness * (chars.length - 1));

        rawParticles.push({
          x: Number(x.toFixed(1)),
          y: Number(y.toFixed(1)),
          char: chars[charIndex],
          alpha: Number((0.4 + brightness * 0.6).toFixed(2)),
        });
      }
    }
  }

  return rawParticles;
};

const generate = async () => {
  const img = await loadImage("./input.png"); // imagen

  const sizes = [220, 280, 400];

  const result = {};

  for (const size of sizes) {
    console.log(`Processing ${size}px...`);
    result[size] = processImage(img, size);
  }

  fs.writeFileSync(
    "./asciiData.js",
    `export const asciiData = ${JSON.stringify(result)};`
  );

  console.log("asciiData generado");
};

generate();