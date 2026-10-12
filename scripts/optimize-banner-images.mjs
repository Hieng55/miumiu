import sharp from "sharp";
import { fileURLToPath } from "node:url";

const images = [
  ["banner-main.jpg", "banner-main.webp", 1920],
  ["banner-detail.jpg", "banner-detail.webp", 1920],
  ["banner-treatment.jpg", "banner-treatment.webp", 1920],
  ["frame-flower-nails.jpg", "frame-flower-nails.webp", 1000],
  ["frame-manicure.jpg", "frame-manicure.webp", 1000],
  ["frame-spring-nails.jpg", "frame-spring-nails.webp", 1000],
];

await Promise.all(
  images.map(([source, output, width]) =>
    sharp(fileURLToPath(new URL(`../public/image/banner/${source}`, import.meta.url)))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(fileURLToPath(new URL(`../public/image/banner/${output}`, import.meta.url))),
  ),
);
