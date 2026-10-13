const artistInitials = ["M", "Q", "Q", "J", "T", "V"] as const;

export default function HomeTeamPromo() {
  return (
    <section className="home-team" aria-labelledby="home-team-title">
      <span className="home-team__watermark" aria-hidden="true">Artists</span>
      <div className="home-team__inner">
        <div className="home-team__content">
          <p className="home-team__eyebrow"><span /> Meet the artists <span /></p>
          <h2 id="home-team-title">Skilled hands.<em>Personal care.</em></h2>
          <p className="home-team__copy">
            Get to know the talented artists behind every polished set. Explore
            each team member&apos;s specialties and find the right fit for your next visit.
          </p>
          <a className="home-team__link" href="/our-team">
            Meet our team <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="home-team__preview" aria-label="Six nail and beauty artists">
          <div className="home-team__preview-top">
            <span>Our salon team</span>
            <strong>6 talented artists</strong>
          </div>
          <div className="home-team__artists" aria-hidden="true">
            {artistInitials.map((initial, index) => (
              <span key={`${initial}-${index}`}>{initial}</span>
            ))}
          </div>
          <div className="home-team__specialties">
            <span>Nail artistry</span>
            <span>Waxing</span>
            <span>Facials</span>
          </div>
          <a href="/our-team" aria-label="View all Miu Miu Nail Design team members">
            View all artists <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
