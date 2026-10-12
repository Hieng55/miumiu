"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PROMOTION_END = Date.parse("2026-11-16T00:00:00-08:00");

export default function PromotionPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (Date.now() >= PROMOTION_END) return;

    const timer = window.setTimeout(() => setIsOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="promotion-popup"
      role="dialog"
      aria-modal="true"
      aria-label="Grand opening promotion: 10% off all services through November 15, 2026"
      onClick={(event) => {
        if (event.target === event.currentTarget) closePopup();
      }}
    >
      <div className="promotion-popup__panel">
        <button
          className="promotion-popup__close"
          type="button"
          onClick={closePopup}
          aria-label="Close promotion"
          autoFocus
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        <Image
          className="promotion-popup__image"
          src="/image/popup/Flyer Miu Miu_page-0001.jpg"
          alt="Miu Miu Nail Design grand opening offer: 10% off all services, valid until November 15, 2026. Call (408) 960-3611."
          width={1240}
          height={1754}
          sizes="(max-width: 620px) calc(100vw - 28px), 540px"
        />
      </div>
    </div>
  );
}
