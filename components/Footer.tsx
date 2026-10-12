import Image from "next/image";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__ornament" aria-hidden="true">
        <span />
        <svg viewBox="0 0 16 16"><path d="M8 1.5 14.5 8 8 14.5 1.5 8 8 1.5Z" /><circle cx="8" cy="8" r="2" /></svg>
        <span />
      </div>

      <div className="footer__inner">
        <div className="footer__cta">
          <div>
            <p>Make time for yourself</p>
            <h2>Your next beautiful set <em>starts here.</em></h2>
          </div>
          <a href="tel:+14089603611">
            Book an appointment
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M14 7l5 5-5 5" /></svg>
          </a>
        </div>

        <div className="footer__content">
          <div className="footer__brand">
            <a href="/" aria-label="Miu Miu Nail Design home">
              <Image
                src="/image/clear-logo.webp"
                alt="Miu Miu Nail Design"
                width={420}
                height={435}
                loading="lazy"
              />
            </a>
            <p>
              Thoughtful nail care, refined technique, and a warm salon
              experience in the heart of Menlo Park.
            </p>
          </div>

          <nav className="footer__column" aria-label="Footer navigation">
            <p>Explore</p>
            {footerLinks.map((link) => (
              <a href={link.href} key={link.label}>{link.label}</a>
            ))}
          </nav>

          <div className="footer__column footer__visit">
            <p>Visit us</p>
            <address>
              1150 El Camino Real<br />Menlo Park, CA 94025
            </address>
            <a href="tel:+14089603611">(408) 960-3611</a>
          </div>

          <div className="footer__column footer__hours">
            <p>Opening hours</p>
            <div><span>Mon - Thu</span><strong>9:30 AM - 7 PM</strong></div>
            <div><span>Fri - Sat</span><strong>9 AM - 7 PM</strong></div>
            <div><span>Sunday</span><strong>Closed</strong></div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Miu Miu Nail Design. All rights reserved. Designed by TD Transactions LLC.</p>
          <nav className="footer__social" aria-label="Social media">
            <span>Follow us</span>
            <a href="https://www.facebook.com/miumiunaildesign/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src="/icons/facebook.svg" alt="" aria-hidden="true" />
            </a>
            <a href="https://www.instagram.com/miumiunaildesign/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="/icons/instagram.svg" alt="" aria-hidden="true" />
            </a>
          </nav>
          <a href="https://miumiunaildesign.com/">miumiunaildesign.com</a>
        </div>
      </div>
    </footer>
  );
}
