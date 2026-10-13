const teamMembers = [
  {
    name: "Miu",
    role: "Nail & Beauty Artist",
    specialties: ["Nail services", "Waxing", "Facials"],
    description: "A versatile artist offering complete nail and beauty care with a thoughtful, personalized touch.",
  },
  {
    name: "Quyen 1",
    role: "Nail Artist",
    specialties: ["Manicures", "Pedicures", "Nail enhancements"],
    description: "Detailed nail care across classic services and modern enhancements, tailored to each guest.",
  },
  {
    name: "Quyen 2",
    role: "Nail & Waxing Artist",
    specialties: ["Manicures", "Pedicures", "Waxing"],
    description: "Known for polished hands and feet, with precise waxing services for a complete visit.",
  },
  {
    name: "Jenny",
    role: "Nail & Beauty Artist",
    specialties: ["Nail services", "Waxing", "Facials"],
    description: "Complete nail and beauty services delivered with care, versatility, and attention to detail.",
  },
  {
    name: "Trinh",
    role: "Natural Nail Artist",
    specialties: ["Manicures", "Pedicures"],
    description: "Focused on beautiful natural nail care and relaxing services for hands and feet.",
  },
  {
    name: "Victor",
    role: "Natural Nail Artist",
    specialties: ["Manicures", "Pedicures"],
    description: "Thoughtful manicure and pedicure care with clean technique and a refined finish.",
  },
] as const;

export default function Team({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section className="team" id="our-team" aria-labelledby="team-title">
      <span className="team__watermark" aria-hidden="true">Team</span>
      <div className="team__inner">
        <div className="team__featured-label">
          <span aria-hidden="true">✦</span>
          Meet the people behind every beautiful set
        </div>
        <header className="team__header">
          <div>
            <p className="team__eyebrow"><span /> The artists behind your look <span /></p>
            <Heading id="team-title">Meet our <em>talented team.</em></Heading>
          </div>
          <p>
            Find the artist whose specialties match your visit. Every member of
            our team brings a warm welcome, careful technique, and a personal touch.
          </p>
        </header>

        <div className="team__grid">
          {teamMembers.map((member, index) => (
            <article className="team-card" key={member.name}>
              <span className="team-card__number">{String(index + 1).padStart(2, "0")}</span>
              <div className="team-card__content">
                <p>{member.role}</p>
                <h3>{member.name}</h3>
                <div className="team-card__specialties" aria-label={`${member.name}'s specialties`}>
                  {member.specialties.map((specialty) => <span key={specialty}>{specialty}</span>)}
                </div>
                <p className="team-card__description">{member.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="team__cta">
          <div><span>Found the right artist?</span><strong>Let&apos;s plan your visit.</strong></div>
          <a href="https://www.lldtek.org/salon/appt/UTBGZk1USTBOVFU9">
            Book an appointment <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
