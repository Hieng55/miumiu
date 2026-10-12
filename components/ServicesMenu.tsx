import Image from "next/image";

type ServiceItem = {
  name: string;
  duration?: string;
  card: string;
  cash: string;
  details?: readonly string[];
};

type ServiceGroup = {
  title: string;
  items: readonly ServiceItem[];
  note?: string;
};

type ServiceCategory = {
  id: string;
  number: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  groups: readonly ServiceGroup[];
};

const categories: readonly ServiceCategory[] = [
  {
    id: "pedicure",
    number: "01",
    title: "Pedicure",
    intro: "Five levels of foot and nail care, from a polished refresh to an extended relaxation ritual.",
    image: "/image/services/home-pedicure.webp",
    imageAlt: "Relaxing professional pedicure care",
    groups: [{
      title: "Pedicure treatments",
      note: "Regular polish included. Dazzle Dry +$10. Gel polish +$15 cash / +$15.38 card.",
      items: [
        { name: "Herbal Detox Premium Healing Session", duration: "75 mins", card: "$122", cash: "$119", details: ["Herbal detox and Himalayan pink salt soak", "Nail shaping and cuticle care", "Soothing scrub and clay mask with steam", "Collagen socks and 25-minute oil candle massage"] },
        { name: "Cherry Blossom Treatment Pedicure", duration: "50 mins", card: "$81", cash: "$79", details: ["Cherry blossom bath bomb with soap flowers", "Nail shaping, cuticle and callus care", "Sea salt scrub and collagen mask", "Paraffin wax and 10-minute massage"] },
        { name: "Golden Luxury Pedicure", duration: "60 mins", card: "$101.50", cash: "$99", details: ["Sea salt soak with citrus fruits", "Nail shaping, cuticle and callus care", "Golden sugar scrub and collagen mask", "Collagen socks, 15-minute massage and body butter gift"] },
        { name: "Lavender Treatment Pedicure", duration: "40 mins", card: "$60.50", cash: "$59", details: ["Lavender Himalayan pink salt bath", "Nail shaping and cuticle care", "Lavender scrub and hot-towel mask", "Paraffin wax and 8-minute massage"] },
        { name: "Sunshine Treatment Pedicure", duration: "30 mins", card: "$40", cash: "$39", details: ["Tropical sea salt bath with citrus fruits", "Nail shaping and cuticle care", "5-minute massage"] },
      ],
    }],
  },
  {
    id: "manicure",
    number: "02",
    title: "Manicure",
    intro: "Thoughtful hand and nail care with massage, hydration, and polish options for every schedule.",
    image: "/image/services/home-manicure.webp",
    imageAlt: "Professional manicure treatment",
    groups: [{
      title: "Manicure treatments",
      note: "Regular polish included. Dazzle Dry +$10. Gel polish +$15.",
      items: [
        { name: "Rose Premium Manicure", duration: "60 mins", card: "$82", cash: "$80", details: ["Rose Himalayan salt soak with flowers and citrus", "Nail shaping, cuticle care and sugar scrub", "15-minute hand, neck and shoulder massage", "Collagen gloves and hand mask"] },
        { name: "Cherry Blossom Deluxe Manicure", duration: "50 mins", card: "$61.50", cash: "$60", details: ["Himalayan pink sea salt with citrus", "Nail shaping, cuticle care and sugar scrub", "10-minute hand, neck and shoulder massage", "Collagen moisturizing gloves"] },
        { name: "Lavender Deluxe Manicure", duration: "40 mins", card: "$46.10", cash: "$45", details: ["Lavender Himalayan pink salt bath", "Nail shaping and cuticle care", "8-minute hand, neck and shoulder massage", "Paraffin hand wax"] },
        { name: "Sunshine Classic Manicure", duration: "30 mins", card: "$32.80", cash: "$32", details: ["Nail shaping and cuticle care", "5-minute hand massage with hand cream"] },
      ],
    }],
  },
  {
    id: "artificial-nails",
    number: "03",
    title: "Artificial Nails",
    intro: "Full sets and fill-ins with acrylic, builder gel, Gel-X, ombre, glitter, and custom design options.",
    image: "/image/services/home-artificial-nails.webp",
    imageAlt: "Luxury artificial nail design",
    groups: [
      {
        title: "Full set",
        items: [
          { name: "Color Acrylic", card: "$61.50+", cash: "$60+" },
          { name: "Color Acrylic + Design", card: "$71.75+", cash: "$70+" },
          { name: "Ombre / Glitter / Pink & White", card: "$71.75+", cash: "$70+" },
          { name: "Ombre / Glitter / Pink & White + Design", card: "$71.75+", cash: "$70+" },
          { name: "Gel Builder", card: "$71.75+", cash: "$70+" },
          { name: "Gel Builder + Design", card: "$71.75+", cash: "$70+" },
          { name: "Gel-X", card: "$66.60+", cash: "$65+" },
          { name: "Gel-X + Design", card: "$71.75+", cash: "$70+" },
        ],
      },
      {
        title: "Fill in",
        note: "Design pricing varies by selected design and is quoted before service.",
        items: [
          { name: "Color Acrylic", card: "$56.38+", cash: "$55+" },
          { name: "Color Acrylic + Design", card: "$71.75+", cash: "$70+" },
          { name: "Gel Acrylic", card: "$56.38+", cash: "$55+" },
          { name: "Ombre / Glitter / Pink & White", card: "$71.75+", cash: "$70+" },
          { name: "Ombre / Glitter / Pink & White + Design", card: "$71.75+", cash: "$70+" },
          { name: "Gel Builder", card: "$61.50+", cash: "$60+" },
          { name: "Gel Builder + Design", card: "$61.50+", cash: "$60+" },
          { name: "Gel-X", card: "$61.50+", cash: "$60+" },
        ],
      },
    ],
  },
  {
    id: "dipping-additional-services",
    number: "04",
    title: "Dipping & Additional Services",
    intro: "Dipping options, polish changes, removals, and a simple menu created especially for younger guests.",
    image: "/image/services/additional-services.webp",
    imageAlt: "Detailed dipping powder nail design",
    groups: [
      {
        title: "Dipping",
        items: [
          { name: "Dipping on Fake Nail", card: "$66.63", cash: "$65" },
          { name: "Dipping on Fake Nail + Design", card: "$76.88+", cash: "$75+" },
          { name: "Dipping on Natural Nail", card: "$61.50", cash: "$60" },
          { name: "Dipping on Natural Nail + Design", card: "$71.75+", cash: "$70+" },
        ],
      },
      {
        title: "Polish change & removal",
        note: "Complimentary cuticle care for artificial nail services $100+.",
        items: [
          { name: "Regular Polish Change - Hands", card: "$15.38", cash: "$15" },
          { name: "Regular Polish Change - Feet", card: "$25.63", cash: "$25" },
          { name: "Gel Color Change - Hands", card: "$30.75", cash: "$30" },
          { name: "Gel Color Change - Feet", card: "$41", cash: "$40" },
          { name: "Gel Removal Only", card: "$10.25", cash: "$10" },
          { name: "Artificial Nail Removal Only", card: "$15.38", cash: "$15" },
        ],
      },
      {
        title: "Kid menu",
        note: "For children under 10 years old.",
        items: [
          { name: "Kid Manicure", duration: "15 mins", card: "$15.38", cash: "$15" },
          { name: "Kid Pedicure", duration: "15 mins", card: "$20.50", cash: "$20" },
        ],
      },
    ],
  },
  {
    id: "facial-relaxing-services",
    number: "05",
    title: "Facial Relaxing Services",
    intro: "Cleansing, exfoliation, hydration, massage, and targeted finishing steps for a refreshed complexion.",
    image: "/image/services/facial-relaxing-new.webp",
    imageAlt: "Relaxing facial and beauty care",
    groups: [{
      title: "Facial treatments",
      items: [
        { name: "Deep Cleanse", duration: "60 mins", card: "$112.75", cash: "$110", details: ["Deep cleanse and gentle exfoliation", "Light extractions and facial massage", "Cooling and soothing hydro jelly mask", "LED therapy, moisturizer and SPF"] },
        { name: "Signature Facial", duration: "45 mins", card: "$61.50", cash: "$60", details: ["Double cleanse and exfoliation", "Steam and light extractions", "Facial massage and moisturizing mask", "Moisturizer and SPF"] },
        { name: "Glow & Hydrate", duration: "50 mins", card: "$61.50", cash: "$60", details: ["Deep cleanse and gentle exfoliation", "Extractions and skin-tightening massage", "Cooling and soothing hydro jelly mask", "LED therapy, facial massage, moisturizer and SPF"] },
      ],
    }],
  },
  {
    id: "waxing-services",
    number: "06",
    title: "Waxing Services",
    intro: "Focused waxing services plus practical nail and massage add-ons to complete your appointment.",
    image: "/image/services/waxing-new.webp",
    imageAlt: "Professional beauty and waxing care",
    groups: [
      {
        title: "Waxing",
        items: [
          { name: "Eyebrows", card: "$20.50+", cash: "$20+" },
          { name: "Lips", card: "$15.38+", cash: "$15+" },
          { name: "Under Arms", card: "$20.50+", cash: "$20+" },
          { name: "Chin", card: "$15.38+", cash: "$15+" },
          { name: "Legs", card: "$61.50+", cash: "$60+" },
          { name: "Upper Legs", card: "$35.88+", cash: "$35+" },
          { name: "Lower Legs", card: "$30.75+", cash: "$30+" },
        ],
      },
      {
        title: "Add-ons",
        items: [
          { name: "10 Min Massage", card: "$15.38", cash: "$15" },
          { name: "20 Min Massage", card: "$30.75", cash: "$30" },
          { name: "Acrylic / Dipping / Gel-X Take-Off", card: "+$10.25", cash: "+$10" },
          { name: "Cuticle Care", card: "+$10.25", cash: "+$10" },
          { name: "Shape & Length", card: "Varies", cash: "Varies" },
          { name: "Dazzle Dry Polish", card: "+$10.25", cash: "+$10" },
        ],
      },
    ],
  },
] as const;

const complimentaryDrinks = [
  {
    name: "Hot Vietnamese Milk Coffee",
    description: "Rich Vietnamese coffee blended with creamy sweetened condensed milk, served hot.",
  },
  {
    name: "Hot Green / Ginger Tea",
    description: "A soothing hot tea infused with refreshing green tea and warming ginger.",
  },
  {
    name: "Sparkling Water",
    description: "Crisp, refreshing carbonated water with a clean, bubbly finish.",
  },
  {
    name: "Bottled Water",
    description: "Chilled purified water for simple, refreshing hydration.",
  },
  {
    name: "Champagne",
    description: "Light, elegant sparkling wine with delicate bubbles and a crisp finish.",
  },
  {
    name: "Mimosa",
    description: "A refreshing blend of champagne and orange juice, bright and lightly bubbly.",
  },
  {
    name: "Orange Juice",
    description: "Fresh, bright orange juice with a naturally sweet, citrus flavor and refreshing finish.",
  },
] as const;

export default function ServicesMenu() {
  return (
    <main className="services-menu" id="main-content">
      <section className="services-menu__hero" aria-labelledby="services-menu-title">
        <p>Our complete menu</p>
        <h1 id="services-menu-title">Services made for<em>your kind of beautiful.</em></h1>
        <span>Explore every treatment, compare timing and pricing, then call our team when you are ready to reserve your appointment.</span>
        <nav aria-label="Service categories">
          {categories.map((category) => <a href={`#${category.id}`} key={category.id}>{category.title}</a>)}
        </nav>
      </section>

      <div className="services-menu__notice">
        <span>Pricing note</span>
        <p>Card prices include a 2.5% processing fee. Prices marked with “+” may vary by length, shape, design, and custom work.</p>
      </div>

      <div className="services-menu__categories">
        {categories.map((category) => (
          <section className="services-menu__category" id={category.id} key={category.id}>
            <header className="services-menu__category-heading">
              <div className="services-menu__category-image">
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(max-width: 900px) 92vw, 46vw"
                />
                <span>{category.number}</span>
              </div>
              <div className="services-menu__category-copy">
                <p>Service category</p>
                <h2>{category.title}</h2>
                <strong>{category.intro}</strong>
                <div className="services-menu__category-meta">
                  <span>
                    <b>{String(category.groups.reduce((total, group) => total + group.items.length, 0)).padStart(2, "0")}</b>
                    <small>Services</small>
                  </span>
                  <i />
                  <span>
                    <b>Card & Cash</b>
                    <small>Clear pricing below</small>
                  </span>
                </div>
                <a href="https://www.lldtek.org/salon/appt/UTBGZk1USTBOVFU9">
                  Book this category
                  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M14 7l5 5-5 5" /></svg>
                </a>
              </div>
            </header>

            <div className="services-menu__groups">
              {category.groups.map((group) => (
                <article className="services-menu__group" key={group.title}>
                  <div className="services-menu__group-title">
                    <h3>{group.title}</h3>
                  </div>
                  <div className="services-menu__items">
                    {group.items.map((item) => (
                      <div className={`services-menu__item${item.details ? " has-details" : ""}`} key={`${group.title}-${item.name}`}>
                        <div className="services-menu__item-line">
                          <div><h4>{item.name}</h4>{item.duration && <small>{item.duration}</small>}</div>
                          <div className="services-menu__prices">
                            <span><small>Card</small><b>{item.card}</b></span>
                            <span className="is-cash"><small>Cash</small><b>{item.cash}</b></span>
                          </div>
                        </div>
                        {item.details && <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
                      </div>
                    ))}
                  </div>
                  {group.note && <p className="services-menu__group-note">{group.note}</p>}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="complimentary-drinks" id="complimentary-drinks" aria-labelledby="complimentary-drinks-title">
        <header className="complimentary-drinks__header">
          <div>
            <p>Included with your visit</p>
            <h2 id="complimentary-drinks-title">Complimentary <em>Drinks</em></h2>
          </div>
          <span>Sit back, relax, and enjoy a refreshment selected to make your salon experience feel even more special.</span>
        </header>

        <div className="complimentary-drinks__list">
          {complimentaryDrinks.map((drink, index) => (
            <article className="complimentary-drinks__item" key={drink.name}>
              <div className="complimentary-drinks__copy">
                <small>{String(index + 1).padStart(2, "0")}</small>
                <h3>{drink.name}</h3>
                <p>{drink.description}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="complimentary-drinks__note">Please ask our team about current availability. Alcoholic beverages are available to guests 21 and over.</p>
      </section>

      <section className="services-menu__cta">
        <div><p>Need help choosing?</p><h2>Let us plan your next visit.</h2><span>Call our team and we will help you select the service that best fits the result you want.</span></div>
        <a href="tel:+14089603611">Call (408) 960-3611</a>
      </section>
    </main>
  );
}
