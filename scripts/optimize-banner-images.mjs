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

const projectImage = (path) =>
  fileURLToPath(new URL(`../public/image/${path}`, import.meta.url));

await Promise.all(
  images.map(([source, output, width]) =>
    sharp(fileURLToPath(new URL(`../public/image/banner/${source}`, import.meta.url)))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(fileURLToPath(new URL(`../public/image/banner/${output}`, import.meta.url))),
  ),
);

await sharp(projectImage("clear logo Miu Miu.png"))
  .resize({ width: 420, withoutEnlargement: true })
  .webp({ quality: 84, alphaQuality: 90, effort: 6 })
  .toFile(projectImage("clear-logo.webp"));

await sharp(projectImage("about-us/Students Checking In at Chic Nail Salon.png"))
  .resize({ width: 1400, withoutEnlargement: true })
  .webp({ quality: 84, effort: 6 })
  .toFile(projectImage("about-us/student-discount-salon.webp"));

const homeServiceImages = [
  ["pedicure new.png", "home-pedicure.webp"],
  ["manicure new.png", "home-manicure.webp"],
  ["ArtificialNails.png", "home-artificial-nails.webp"],
  ["faacial.jpg", "facial-relaxing-new.webp"],
  ["waxing.jpg", "waxing-new.webp"],
];

await Promise.all(
  homeServiceImages.map(([source, output]) =>
    sharp(projectImage(`services/${source}`))
      .resize({ width: 1000, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(projectImage(`services/${output}`)),
  ),
);

await Promise.all(
  Array.from({ length: 10 }, (_, index) => {
    const file = `gallery-${String(index + 1).padStart(2, "0")}.webp`;
    return sharp(projectImage(`gallery/${file}`))
      .resize({ width: 640, height: 640, fit: "cover", withoutEnlargement: true })
      .webp({ quality: 76, effort: 5 })
      .toFile(projectImage(`gallery/thumb-${file}`));
  }),
);
