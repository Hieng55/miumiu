"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const galleryImages = Array.from({ length: 10 }, (_, index) => ({
  src: `/image/gallery/gallery-${String(index + 1).padStart(2, "0")}.webp`,
  alt: `Miu Miu Nail Design gallery look ${index + 1}`,
}));

export default function Gallery() {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const showPrevious = useCallback(() => {
    setActiveImage((current) =>
      current === null
        ? galleryImages.length - 1
        : (current - 1 + galleryImages.length) % galleryImages.length,
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveImage((current) =>
      current === null ? 0 : (current + 1) % galleryImages.length,
    );
  }, []);

  useEffect(() => {
    if (activeImage === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage, showNext, showPrevious]);

  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <span className="gallery__watermark" aria-hidden="true">Gallery</span>

      <div className="gallery__inner">
        <header className="gallery__header">
          <p className="gallery__eyebrow">
            <span className="gallery__eyebrow-ornament" aria-hidden="true">
              <svg viewBox="0 0 58 8"><path d="M1 4h43" /><path d="m50 1 3 3-3 3-3-3 3-3Z" /></svg>
            </span>
            Our latest work
            <span className="gallery__eyebrow-ornament gallery__eyebrow-ornament--right" aria-hidden="true">
              <svg viewBox="0 0 58 8"><path d="M1 4h43" /><path d="m50 1 3 3-3 3-3-3 3-3Z" /></svg>
            </span>
          </p>
          <h2 id="gallery-title">Details worth <em>showing off.</em></h2>
          <p>
            Explore a selection of looks created at Miu Miu Nail Design. Select any
            image to view the full gallery.
          </p>
        </header>

        <div className="gallery__list">
          {galleryImages.map((image, index) => (
            <button
              className="gallery__item"
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`Open gallery image ${index + 1} of ${galleryImages.length}`}
              key={image.src}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 620px) 46vw, (max-width: 1100px) 31vw, 240px"
              />
              <span className="gallery__item-overlay" aria-hidden="true">
                <i>{String(index + 1).padStart(2, "0")}</i>
                <svg viewBox="0 0 24 24"><path d="M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5" /></svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeImage !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery image ${activeImage + 1} of ${galleryImages.length}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveImage(null);
          }}
        >
          <button
            className="gallery-lightbox__close"
            type="button"
            onClick={() => setActiveImage(null)}
            aria-label="Close gallery"
          >
            <span />
            <span />
          </button>

          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--previous"
            type="button"
            onClick={showPrevious}
            aria-label="Previous image"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="m15 5-7 7 7 7M8 12h12" />
            </svg>
            <small>Prev</small>
          </button>

          <div className="gallery-lightbox__stage">
            <Image
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].alt}
              fill
              sizes="90vw"
            />
            <div className="gallery-lightbox__counter" aria-live="polite">
              <span>{String(activeImage + 1).padStart(2, "0")}</span>
              <i />
              <span>{String(galleryImages.length).padStart(2, "0")}</span>
            </div>
          </div>

          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--next"
            type="button"
            onClick={showNext}
            aria-label="Next image"
          >
            <small>Next</small>
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="m9 5 7 7-7 7M16 12H4" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
