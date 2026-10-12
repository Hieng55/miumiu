export default function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <span className="contact__watermark" aria-hidden="true">Contact</span>

      <div className="contact__inner">
        <div className="contact__content">
          <p className="contact__eyebrow">
            <span className="contact__eyebrow-ornament" aria-hidden="true">
              <svg viewBox="0 0 58 8"><path d="M1 4h43" /><path d="m50 1 3 3-3 3-3-3 3-3Z" /></svg>
            </span>
            Visit Miu Miu
            <span className="contact__eyebrow-ornament contact__eyebrow-ornament--right" aria-hidden="true">
              <svg viewBox="0 0 58 8"><path d="M1 4h43" /><path d="m50 1 3 3-3 3-3-3 3-3Z" /></svg>
            </span>
          </p>

          <h2 id="contact-title">Come in.<em>Leave glowing.</em></h2>
          <p className="contact__intro">
            We would love to welcome you to Miu Miu Nail Design. Call to reserve
            your appointment or visit us in the heart of Menlo Park.
          </p>

          <div className="contact__details">
            <a href="tel:+14089603611">
              <span className="contact__detail-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M8.2 3.8 10 7.9 7.8 9.5c1.25 2.55 3.15 4.45 5.7 5.7l1.6-2.2 4.1 1.8v3c0 .75-.6 1.35-1.35 1.4C10.55 19.65 4.35 13.45 4.8 6.15c.05-.75.65-1.35 1.4-1.35h2Z" /></svg>
              </span>
              <span><small>Call us</small><strong>(408) 960-3611</strong></span>
            </a>

            <div>
              <span className="contact__detail-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M12 21s6-5.45 6-12a6 6 0 1 0-12 0c0 6.55 6 12 6 12Z" /><circle cx="12" cy="9" r="2.2" /></svg>
              </span>
              <span><small>Find us</small><strong>1150 El Camino Real<br />Menlo Park, CA 94025</strong></span>
            </div>

            <div>
              <span className="contact__detail-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.2 2" /></svg>
              </span>
              <span><small>Opening hours</small><strong>Mon–Thu 9:30 AM–7 PM<br />Fri–Sat 9 AM–7 PM · Sun Closed</strong></span>
            </div>
          </div>

          <div className="contact__actions">
            <a className="contact__button" href="tel:+14089603611">Book an appointment <span>→</span></a>
          </div>

          <div className="contact__social">
            <span>Follow our latest work</span>
            <div>
              <a href="https://www.facebook.com/miumiunaildesign/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img src="/icons/facebook.svg" alt="" aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/miumiunaildesign/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="/icons/instagram.svg" alt="" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="contact__map-wrap contact__location-card" id="location">
          <div className="contact__location-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 21s6-5.45 6-12a6 6 0 1 0-12 0c0 6.55 6 12 6 12Z" /><circle cx="12" cy="9" r="2.2" /></svg>
          </div>
          <span>Visit our salon</span>
          <h3>1150 El Camino Real</h3>
          <p>Menlo Park, CA 94025</p>
          <small>Directions will be updated soon</small>
        </div>
      </div>
    </section>
  );
}
