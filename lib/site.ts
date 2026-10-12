import type { Metadata } from "next";

export const siteConfig = {
  name: "Miu Miu Nail Design",
  url: "https://miumiunaildesign.com",
  description:
    "A welcoming nail and beauty salon in Menlo Park offering manicures, pedicures, nail enhancements, facials, and waxing services.",
  phone: "+14089603611",
  displayPhone: "(408) 960-3611",
  address: {
    streetAddress: "1150 El Camino Real",
    addressLocality: "Menlo Park",
    addressRegion: "CA",
    postalCode: "94025",
    addressCountry: "US",
  },
  logo: "/image/clear-logo.webp",
  socialImage: "/image/banner/banner-main.webp",
  sameAs: [
    "https://www.facebook.com/miumiunaildesign/",
    "https://www.instagram.com/miumiunaildesign/",
    "https://www.yelp.com/biz/miu-miu-nail-design-menlo-park-2",
  ],
} as const;

export const searchRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    robots: searchRobots,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: siteConfig.socialImage,
          alt: "A manicure created at Miu Miu Nail Design",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [siteConfig.socialImage],
    },
  };
}

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#salon` },
      inLanguage: "en-US",
    },
    {
      "@type": "NailSalon",
      "@id": `${siteConfig.url}/#salon`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      telephone: siteConfig.phone,
      logo: `${siteConfig.url}${siteConfig.logo}`,
      image: `${siteConfig.url}${siteConfig.socialImage}`,
      address: {
        "@type": "PostalAddress",
        ...siteConfig.address,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "09:30",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday", "Saturday"],
          opens: "09:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "09:30",
          closes: "18:00",
        },
      ],
      sameAs: siteConfig.sameAs,
    },
  ],
};
