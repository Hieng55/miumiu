import Image from "next/image";

const serviceCategories = [
  {
    id: "pedicure",
    number: "01",
    title: "Pedicure",
    description: "Signature spa pedicures created for comfort, renewal, and a beautifully polished finish.",
    image: "/image/services/home-pedicure.webp",
    alt: "Relaxing professional pedicure care",
  },
  {
    id: "manicure",
    number: "02",
    title: "Manicure",
    description: "Detailed hand and nail care with elegant finishes designed around your personal style.",
    image: "/image/services/home-manicure.webp",
    alt: "Professional manicure treatment",
  },
  {
    id: "artificial-nails",
    number: "03",
    title: "Artificial Nails",
    description: "Refined length, strength, and structure with modern enhancement techniques and finishes.",
    image: "/image/services/artificial-nails.png",
    alt: "Luxury artificial nail design",
  },
  {
    id: "dipping-additional-services",
    number: "04",
    title: "Dipping & Additional Services",
    description: "Dipping options and thoughtful finishing services for a complete, long-lasting result.",
    image: "/image/services/additional-services.webp",
    alt: "Detailed dipping powder nail design",
  },
  {
    id: "facial-relaxing-services",
    number: "05",
    title: "Facial Relaxing Services",
    description: "Restorative facial experiences designed to cleanse, hydrate, and leave your skin refreshed.",
    image: "/image/services/facial-relaxing-new.webp",
    alt: "Relaxing facial and beauty care",
  },
  {
    id: "waxing-services",
    number: "06",
    title: "Waxing Services",
    description: "Gentle, precise waxing care for a smooth finish and beautifully maintained appearance.",
    image: "/image/services/waxing.jpg",
    alt: "Professional beauty and waxing care",
  },
] as const;

export default function Services() {
  return (
    <section className="services services--featured" id="services" aria-labelledby="services-title">
      <span className="services__watermark" aria-hidden="true">Services</span>

      <div className="services__inner">
        <header className="services__header">
          <div>
            <p className="services__eyebrow">
              <span className="services__eyebrow-ornament" aria-hidden="true">
                <svg viewBox="0 0 58 8"><path d="M1 4h43" /><path d="m50 1 3 3-3 3-3-3 3-3Z" /></svg>
              </span>
              Care made personal
              <span className="services__eyebrow-ornament services__eyebrow-ornament--right" aria-hidden="true">
                <svg viewBox="0 0 58 8"><path d="M1 4h43" /><path d="m50 1 3 3-3 3-3-3 3-3Z" /></svg>
              </span>
            </p>
            <h2 id="services-title">Our service <em>categories.</em></h2>
          </div>
          <p className="services__intro">
            Explore the main beauty and nail care categories available at Miu Miu
            Nail Design, each delivered with thoughtful attention to detail.
          </p>
        </header>

        <div className="services__list">
          {serviceCategories.map((category) => (
            <article className="service-card" key={category.title}>
              <div className="service-card__image">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 620px) 88vw, (max-width: 1100px) 44vw, 395px"
                />
                <span className="service-card__number">{category.number}</span>
              </div>
              <div className="service-card__content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <a href={`/services#${category.id}`} aria-label={`View ${category.title} services and prices`}>
                  View services & prices <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="services__footer">
          <div>
            <span>Not sure what to choose?</span>
            <strong>Our team will help you find the perfect service.</strong>
          </div>
          <a href="https://www.lldtek.org/salon/appt/UTBGZk1USTBOVFU9">Book an appointment <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
