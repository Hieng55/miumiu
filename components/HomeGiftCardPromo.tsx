import Image from "next/image";

export default function HomeGiftCardPromo() {
  return (
    <section className="home-gift" aria-labelledby="home-gift-title">
      <span className="home-gift__watermark" aria-hidden="true">Gift</span>
      <div className="home-gift__inner">
        <div className="home-gift__content">
          <p className="home-gift__eyebrow">
            <span aria-hidden="true" /> A thoughtful way to celebrate <span aria-hidden="true" />
          </p>
          <h2 id="home-gift-title">
            Give a little <em>moment of beauty.</em>
          </h2>
          <p className="home-gift__copy">
            Treat someone special to time just for them. Choose a Miu Miu gift
            card from $50 to $250, personalized with their name and ready to use
            toward any salon service.
          </p>
          <div className="home-gift__actions">
            <a href="/gift-cards">
              Explore gift cards <span aria-hidden="true">→</span>
            </a>
            <small>$50 · $100 · $150 · $200 · $250</small>
          </div>
        </div>

        <a className="home-gift__visual" href="/gift-cards" aria-label="Explore Miu Miu gift cards">
          <div className="home-gift__card">
            <span className="home-gift__shine" aria-hidden="true" />
            <Image
              src="/image/logo-miu-miu.webp"
              alt=""
              width={104}
              height={108}
              aria-hidden="true"
            />
            <div className="home-gift__card-title">
              <small>A moment of beauty</small>
              <strong>Gift Card</strong>
            </div>
            <div className="home-gift__card-footer">
              <span><small>Gifted to</small><strong>Someone special</strong></span>
              <span><small>Choose a value</small><strong>$50–$250</strong></span>
            </div>
          </div>
          <span className="home-gift__visual-note">Personalize yours <b aria-hidden="true">↗</b></span>
        </a>
      </div>
    </section>
  );
}
