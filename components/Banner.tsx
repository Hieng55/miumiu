"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    image: "/image/banner/banner-main.webp",
    frameImage: "/image/banner/frame-flower-nails.webp",
    alt: "Luxury white and gold manicure",
    eyebrow: "Miu Miu Nail Design · Menlo Park",
    title: "Modern Nails",
    accent: "Soft Luxury",
    description:
      "Discover a refined nail experience where graceful details, modern artistry, and a beautiful finish come together.",
    note: "Manicure · Pedicure · Nail Design",
  },
  {
    image: "/image/banner/banner-detail.webp",
    frameImage: "/image/banner/frame-manicure.webp",
    alt: "Professional manicure treatment",
    eyebrow: "Care · Detail · Confidence",
    title: "Refined Care",
    accent: "Lasting Beauty",
    description:
      "Thoughtful nail care and precise attention to detail, designed to leave every set feeling polished and beautifully personal.",
    note: "Clean details · Modern techniques",
  },
  {
    image: "/image/banner/banner-treatment.webp",
    frameImage: "/image/banner/frame-spring-nails.webp",
    alt: "Relaxing nail salon manicure service",
    eyebrow: "Relax · Refresh · Renew",
    title: "Your Beauty",
    accent: "Ritual",
    description:
      "Slow down and enjoy a calming salon moment created around beautiful nails, comfort, and your individual style.",
    note: "Beautiful nails · Relaxing care",
  },
] as const;

export default function Banner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const backgroundImages = useRef<Array<HTMLImageElement | null>>([]);
  const navigationRequest = useRef(0);

  const goToSlide = useCallback(
    async (index: number) => {
      const nextSlide = (index + slides.length) % slides.length;
      const request = ++navigationRequest.current;
      if (nextSlide === activeSlide) return;

      const nextImage = backgroundImages.current[nextSlide];

      // Keep the reveal from finishing behind an image that is still loading
      // when the visitor navigates immediately after the first paint.
      if (nextImage?.decode) {
        await nextImage.decode().catch(() => undefined);
      }

      if (request !== navigationRequest.current) return;

      setPreviousSlide(activeSlide);
      setActiveSlide(nextSlide);
    },
    [activeSlide],
  );

  const showNext = useCallback(() => {
    goToSlide(activeSlide + 1);
  }, [activeSlide, goToSlide]);

  const showPrevious = useCallback(() => {
    goToSlide(activeSlide - 1);
  }, [activeSlide, goToSlide]);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(showNext, 6000);
    return () => window.clearInterval(timer);
  }, [isPaused, showNext]);

  const slide = slides[activeSlide];

  return (
    <section
      className="banner"
      aria-labelledby="banner-title"
      aria-roledescription="carousel"
      aria-label="Featured nail services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="banner__media">
        {slides.map((item, index) => (
          <Image
            className={`banner__background${
              index === activeSlide
                ? " is-active"
                : index === previousSlide
                  ? " is-previous"
                  : ""
            }`}
            src={item.image}
            alt={index === activeSlide ? item.alt : ""}
            fill
            priority={index === 0}
            loading={index === 0 ? undefined : "eager"}
            sizes="100vw"
            aria-hidden={index !== activeSlide}
            key={item.image}
            ref={(image) => {
              backgroundImages.current[index] = image;
            }}
          />
        ))}
      </div>
      <div className="banner__overlay" aria-hidden="true" />
      <div className="banner__number" aria-hidden="true">
        {String(activeSlide + 1).padStart(2, "0")}
      </div>

      <div className="banner__inner">
        <div className="banner__copy" key={activeSlide} aria-live="polite">
          <p className="banner__eyebrow">
            <span className="banner__eyebrow-ornament" aria-hidden="true">
              <svg viewBox="0 0 58 8"><path d="M1 4h43" /><path d="m50 1 3 3-3 3-3-3 3-3Z" /></svg>
            </span>
            {slide.eyebrow}
            <span className="banner__eyebrow-ornament banner__eyebrow-ornament--right" aria-hidden="true">
              <svg viewBox="0 0 58 8"><path d="M1 4h43" /><path d="m50 1 3 3-3 3-3-3 3-3Z" /></svg>
            </span>
          </p>
          <h1 id="banner-title">
            {slide.title}
            <em>{slide.accent}</em>
          </h1>
          <p className="banner__description">{slide.description}</p>
          <div className="banner__actions">
            <a className="banner__button banner__button--primary" href="tel:+14089603611">
              Call now
            </a>
            <a
              className="banner__button banner__button--secondary"
              href="/contact"
            >
              Contact us
            </a>
          </div>
          <p className="banner__services">{slide.note}</p>
        </div>

        <div className="banner__visual" aria-hidden="true">
          <div className="banner__frame" key={`frame-${activeSlide}`}>
            <Image
              src={slide.frameImage}
              alt=""
              fill
              sizes="(max-width: 760px) calc(100vw - 36px), (max-width: 1100px) 1px, 420px"
            />
          </div>
          <div className="banner__badge">
            <strong>MM</strong>
            <span>Beauty in every detail</span>
          </div>
        </div>

        <div className="banner__contact">
          <span className="banner__contact-mark">
            <Image
              src="/image/clear-logo.webp"
              alt=""
              width={46}
              height={48}
            />
          </span>
          <div>
            <strong>Miu Miu Nail Design</strong>
            <a href="/contact">
              1150 El Camino Real, Menlo Park, CA 94025
            </a>
          </div>
        </div>
      </div>

      <nav className="banner__social" aria-label="Social media links">
        <span>Follow us</span>
        <a
          href="https://www.facebook.com/miumiunaildesign/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          title="Facebook"
        >
          <img src="/icons/facebook.svg" alt="" aria-hidden="true" />
        </a>
        <a
          href="https://www.instagram.com/miumiunaildesign/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          title="Instagram"
        >
          <img src="/icons/instagram.svg" alt="" aria-hidden="true" />
        </a>
        <a
          href="https://www.yelp.com/biz/miu-miu-nail-design-menlo-park-2"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Yelp"
          title="Yelp"
        >
          <img src="/icons/yelp.svg" alt="" aria-hidden="true" />
        </a>
      </nav>

      <nav className="banner__pagination" aria-label="Banner slide controls">
        <button type="button" onClick={showPrevious} aria-label="Previous slide">
          <span aria-hidden="true">←</span> Prev
        </button>
        <div className="banner__dots">
          {slides.map((item, index) => (
            <button
              className={index === activeSlide ? "is-active" : undefined}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Show slide ${index + 1}: ${item.title} ${item.accent}`}
              aria-current={index === activeSlide ? "true" : undefined}
              key={item.image}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <button type="button" onClick={showNext} aria-label="Next slide">
          Next <span aria-hidden="true">→</span>
        </button>
      </nav>
    </section>
  );
}
