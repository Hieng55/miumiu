import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Salon Policy",
  description:
    "Review Miu Miu Nail Design policies for service repairs, adjustments, salon etiquette, pricing, refunds, and gift cards.",
  path: "/policy/",
});

const policies = [
  {
    number: "01",
    title: "7-Day Nail Service Guarantee",
    introduction:
      "At Miu Miu Nail Design, your satisfaction is important to us. If you experience lifting, chipping, cracking, or a broken nail, please contact us within 7 days of your original service, and we’ll be happy to assist with a repair.",
    items: [
      {
        label: "Repairs only",
        text: "Our guarantee covers repairs only and does not include changes to color, shape, length, or design.",
      },
      {
        label: "Regular polish",
        text: "The 7-day guarantee does not apply to regular polish services.",
      },
      {
        label: "Color and design selection",
        text: "Please carefully confirm your color and design before the service is completed.",
      },
      {
        label: "Timely repairs",
        text: "Please contact us within 7 days so we can address the issue promptly.",
      },
    ],
  },
  {
    number: "02",
    title: "Service & Change Policy",
    items: [
      {
        text: "Please confirm your nail length, shape, color, and design with your nail technician before or during the service.",
      },
      {
        text: "If you would like any adjustments, please let your technician know during your appointment.",
      },
      {
        text: "Changes requested after the service has been completed may be subject to additional charges.",
      },
      {
        text: "We reserve the right to refuse service to anyone displaying rude, aggressive, inappropriate, or disruptive behavior, or when providing the service may present a health or safety concern.",
      },
    ],
  },
  {
    number: "03",
    title: "Phone Policy",
    introduction:
      "To help us maintain a relaxing environment for everyone, please keep phone conversations brief and use a low speaking volume during your service.",
    closing: "We appreciate your consideration for our guests and technicians.",
  },
  {
    number: "04",
    title: "Pricing & Refund Policy",
    items: [
      {
        text: "Prices may vary depending on nail length, shape, design, and custom work. Please confirm the price with your technician before starting.",
      },
      {
        text: "All services are final once completed. If you have any concerns about your service, please let us know before leaving the salon so we have an opportunity to address them.",
      },
      {
        text: "Gift card sales are final and non-refundable.",
      },
    ],
  },
] as const;

export default function PolicyPage() {
  return (
    <main id="main-content" className="policy-page">
      <header className="policy-hero">
        <p className="policy-hero__eyebrow">Miu Miu Nail Design</p>
        <h1>Salon <em>Policy</em></h1>
        <p>
          Clear expectations help us provide every guest with thoughtful service,
          consistent care, and a relaxing salon experience.
        </p>
      </header>

      <section className="policy-content" aria-label="Salon policies">
        <div className="policy-content__intro">
          <span>Before your visit</span>
          <h2>Our commitment to beautiful results.</h2>
          <p>
            Please review these guidelines before your appointment. If you have a
            question or concern, our team is always happy to help.
          </p>
        </div>

        <div className="policy-list">
          {policies.map((policy) => (
            <article className="policy-card" key={policy.number}>
              <div className="policy-card__heading">
                <span>{policy.number}</span>
                <h2>{policy.title}</h2>
              </div>

              {"introduction" in policy && policy.introduction && (
                <p>{policy.introduction}</p>
              )}

              {"items" in policy && policy.items && (
                <ul>
                  {policy.items.map((item, index) => (
                    <li key={index}>
                      {"label" in item && item.label && <strong>{item.label}: </strong>}
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}

              {"closing" in policy && policy.closing && (
                <p className="policy-card__closing">{policy.closing}</p>
              )}
            </article>
          ))}
        </div>

        <aside className="policy-contact">
          <div>
            <span>Questions or concerns?</span>
            <h2>We’re here to assist you.</h2>
            <p>
              If you have any concerns about your service, please contact us. Our
              team will do our best to assist you.
            </p>
          </div>
          <a href="tel:+14089603611">Call (408) 960-3611</a>
        </aside>
      </section>
    </main>
  );
}
