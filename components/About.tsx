"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const openingHours = [
  { day: "Monday", time: "09:30 – 19:00" },
  { day: "Tuesday", time: "09:30 – 19:00" },
  { day: "Wednesday", time: "09:30 – 19:00" },
  { day: "Thursday", time: "09:30 – 19:00" },
  { day: "Friday", time: "09:00 – 19:00" },
  { day: "Saturday", time: "09:00 – 19:00" },
  { day: "Sunday", time: "09:00 – 19:00" },
] as const;

export default function About({
  headingLevel = "h2",
  teamHref = "/about#our-team",
}: {
  headingLevel?: "h1" | "h2";
  teamHref?: string;
}) {
  const [today, setToday] = useState<string | null>(null);
  const Heading = headingLevel;

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        timeZone: "America/Los_Angeles",
      }).format(new Date()),
    );
  }, []);

  const todayHours = openingHours.find(({ day }) => day === today);

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about__ornament about__ornament--one" aria-hidden="true" />
      <div className="about__ornament about__ornament--two" aria-hidden="true" />

      <div className="about__inner">
        <div className="about__visual">
          <div className="about__image about__image--main">
            <Image
              src="/image/about-us/student-discount.png"
              alt="Student ID promotion offering 10 percent off"
              fill
              sizes="(max-width: 900px) 82vw, 520px"
            />
          </div>

          <div className="about__seal" aria-hidden="true">
            <span>Miu Miu</span>
            <strong>MM</strong>
            <i>Menlo Park</i>
          </div>
        </div>

        <div className="about__content">
          <p className="about__eyebrow">
            <span className="about__eyebrow-ornament" aria-hidden="true">
              <svg viewBox="0 0 58 8"><path d="M1 4h43" /><path d="m50 1 3 3-3 3-3-3 3-3Z" /></svg>
            </span>
            Welcome to Miu Miu
            <span className="about__eyebrow-ornament about__eyebrow-ornament--right" aria-hidden="true">
              <svg viewBox="0 0 58 8"><path d="M1 4h43" /><path d="m50 1 3 3-3 3-3-3 3-3Z" /></svg>
            </span>
          </p>
          <Heading id="about-title">
            Beauty that feels
            <em>uniquely yours.</em>
          </Heading>
          <p className="about__lead">
            We help every guest turn an idea into a polished look that feels
            personal—whether you prefer something timeless, modern, subtle, or
            designed to stand out.
          </p>
          <p className="about__text">
            From manicures and relaxing pedicures to artificial nails, dipping,
            detailed finishing services, facial relaxation, and waxing, Miu Miu
            Nail Design makes it easy to care for your nails and beauty needs in
            one welcoming place. We take time to understand the result you want,
            help you choose a service that fits your style, and create a calm salon
            moment so you can leave feeling polished, refreshed, and confident.
          </p>

          <address className="about__contact-list">
            <a href="/contact">
              <span className="about__contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M12 21s6-5.45 6-12a6 6 0 1 0-12 0c0 6.55 6 12 6 12Z"/><circle cx="12" cy="9" r="2.2"/></svg>
              </span>
              <span><small>Visit our salon</small><strong>1150 El Camino Real, Menlo Park, CA 94025</strong></span>
            </a>
            <a href="tel:+14089603611">
              <span className="about__contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M8.2 3.8 10 7.9 7.8 9.5c1.25 2.55 3.15 4.45 5.7 5.7l1.6-2.2 4.1 1.8v3c0 .75-.6 1.35-1.35 1.4C10.55 19.65 4.35 13.45 4.8 6.15c.05-.75.65-1.35 1.4-1.35h2Z"/></svg>
              </span>
              <span><small>Call for an appointment</small><strong>(408) 960-3611</strong></span>
            </a>
          </address>

          <div className="about__hours" aria-labelledby="hours-title">
            <div className="about__hours-heading">
              <div>
                <span>Plan your visit</span>
                <h3 id="hours-title">Opening Hours</h3>
              </div>
              {todayHours && (
                <div className="about__today">
                  <svg className="about__today-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3.5" y="5.5" width="17" height="15" rx="3" />
                    <path d="M7.5 3.5v4M16.5 3.5v4M3.5 9.5h17" />
                    <path d="M8 13h2M14 13h2M8 17h2M14 17h2" />
                  </svg>
                  <div className="about__today-copy">
                    <span>Today</span>
                    <strong>{todayHours.time}</strong>
                  </div>
                </div>
              )}
            </div>

            <dl className="about__hours-list">
              {openingHours.map(({ day, time }) => {
                const isToday = day === today;
                return (
                  <div
                    className={isToday ? "is-today" : undefined}
                    key={day}
                  >
                    <dt>{day}{isToday && <small>Today</small>}</dt>
                    <dd>{time}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="about__socials">
            <div className="about__socials-copy">
              <span>Follow our latest work</span>
              <p>Stay connected for new nail looks, salon updates, and inspiration for your next appointment.</p>
            </div>
            <nav className="about__socials-links" aria-label="Social media links">
              <a href="https://www.facebook.com/miumiunaildesign/" target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.svg" alt="" aria-hidden="true" />
                <span><strong>Facebook</strong><small>News & salon updates</small></span>
              </a>
              <a href="https://www.instagram.com/miumiunaildesign/" target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.svg" alt="" aria-hidden="true" />
                <span><strong>Instagram</strong><small>Nail looks & inspiration</small></span>
              </a>
              <a href="https://www.yelp.com/biz/miu-miu-nail-design-menlo-park-2" target="_blank" rel="noopener noreferrer">
                <img src="/icons/yelp.svg" alt="" aria-hidden="true" />
                <span><strong>Yelp</strong><small>Reviews & guest feedback</small></span>
              </a>
            </nav>
          </div>

          <div className="about__actions">
            <a className="about__button" href="https://www.lldtek.org/salon/appt/UTBGZk1USTBOVFU9">
              Book an appointment
            </a>
            <a className="about__button about__button--outline about__team-link" href={teamHref}>
              Meet our team <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
