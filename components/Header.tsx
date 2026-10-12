"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { CalendarDays, House, Images, Menu, Phone, Sparkles, X } from "lucide-react";
import { Facebook, Instagram } from "@thesvg/react";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

const primaryLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
];

const secondaryLinks: NavItem[] = [
  { label: "Contact us", href: "/contact" },
  { label: "Booking", href: "tel:+14089603611" },
  { label: "Directions", href: "/contact#location" },
];

const mobileLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Booking", href: "tel:+14089603611" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact us", href: "/contact" },
  { label: "Directions", href: "/contact#location" },
];

const appLinks = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Services", href: "/services", icon: "services" },
  { label: "Book", href: "tel:+14089603611", icon: "book", featured: true },
  { label: "Gallery", href: "/gallery", icon: "gallery" },
  { label: "Contact", href: "/contact", icon: "contact" },
] as const;

function AppNavIcon({ name }: { name: (typeof appLinks)[number]["icon"] }) {
  const Icon = name === "home"
    ? House
    : name === "services"
      ? Sparkles
      : name === "book"
        ? CalendarDays
        : name === "gallery"
          ? Images
          : Phone;

  return <Icon aria-hidden="true" strokeWidth={1.7} />;
}

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasSolidBackground = pathname !== "/" || isScrolled;
  const activeAppTab = appLinks.findIndex(
    (link) => link.href.startsWith("/") && pathname === link.href,
  );

  useEffect(() => {
    let animationFrame = 0;
    const updateHeader = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 24;
        setIsScrolled((current) => current === nextScrolled ? current : nextScrolled);
        animationFrame = 0;
      });
    };

    setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`site-header${hasSolidBackground ? " is-scrolled" : ""}${
        isMenuOpen ? " is-menu-open" : ""
      }`}
    >
      <div className="header-shell">
        <nav className="desktop-nav desktop-nav--left" aria-label="Primary navigation">
          {primaryLinks.map((link) => (
            <Link
              className={`nav-link${pathname === link.href ? " is-active" : ""}`}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link className="brand" href="/" aria-label="Miu Miu Nail Design home">
          <Image
            src="/image/clear-logo.webp"
            alt="Miu Miu Nail Design"
            width={420}
            height={435}
            priority
          />
        </Link>

        <nav className="desktop-nav desktop-nav--right" aria-label="Secondary navigation">
          {secondaryLinks.map((link) => link.href.startsWith("/") ? (
            <Link className={`nav-link${pathname === link.href ? " is-active" : ""}`} href={link.href} key={link.label}>
              {link.label}
            </Link>
          ) : (
            <a className="nav-link" href={link.href} key={link.label}>{link.label}</a>
          ))}
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X className="menu-toggle__close" aria-hidden="true" /> : <Menu className="menu-toggle__menu" aria-hidden="true" />}
        </button>
      </div>

      <div
        className={`mobile-menu${isMenuOpen ? " is-open" : ""}`}
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-menu__glow" aria-hidden="true" />
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          {mobileLinks.map((link, index) => {
            const content = <><span>{String(index + 1).padStart(2, "0")}</span>{link.label}</>;
            const className = pathname === link.href ? "is-active" : undefined;

            return link.href.startsWith("/") ? (
              <Link href={link.href} className={className} aria-current={pathname === link.href ? "page" : undefined} onClick={closeMenu} key={link.label}>
                {content}
              </Link>
            ) : (
              <a href={link.href} onClick={closeMenu} key={link.label}>{content}</a>
            );
          })}
        </nav>

        <div className="mobile-menu__footer">
          <a className="mobile-call" href="tel:+14089603611">
            (408) 960-3611
          </a>
          <span
            className="mobile-address"
          >
            1150 El Camino Real
            <br />
            Menlo Park, CA 94025
          </span>
          <div className="social-links" aria-label="Social media">
            <a
              href="https://www.facebook.com/miumiunaildesign/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook variant="mono" aria-hidden="true" />
              <span className="social-links__label">Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/miumiunaildesign/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram variant="mono" aria-hidden="true" />
              <span className="social-links__label">Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="mobile-app-nav" aria-label="Quick navigation">
        {activeAppTab >= 0 && (
          <span
            className="mobile-app-nav__indicator"
            style={{ "--active-index": activeAppTab } as CSSProperties}
            aria-hidden="true"
          />
        )}
        {appLinks.map((link) => {
          const isActive = pathname === link.href;

          const className = `${isActive ? "is-active" : ""}${"featured" in link && link.featured ? " is-featured" : ""}`;
          const content = <><span><AppNavIcon name={link.icon} /></span><small>{link.label}</small></>;

          return link.href.startsWith("/") ? (
            <Link href={link.href} className={className} aria-current={isActive ? "page" : undefined} aria-label={link.label} key={link.label}>
              {content}
            </Link>
          ) : (
            <a href={link.href} className={className} aria-label="Book an appointment" key={link.label}>
              {content}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
