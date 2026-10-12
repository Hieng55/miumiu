import type { Metadata } from "next";
import { Forum, Jost } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { siteConfig } from "@/lib/site";
import "../styles.css";

const forum = Forum({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-forum",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Miu Miu Nail Design | Nail Salon in Menlo Park",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "beauty",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: siteConfig.logo, type: "image/webp" }],
    apple: [{ url: "/image/clear%20logo%20Miu%20Miu.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title: "Miu Miu Nail Design | Nail Salon in Menlo Park",
    description: siteConfig.description,
    images: [{
      url: siteConfig.socialImage,
      alt: "A manicure created at Miu Miu Nail Design",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miu Miu Nail Design | Nail Salon in Menlo Park",
    description: siteConfig.description,
    images: [siteConfig.socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${forum.variable} ${jost.variable}`}>
        <Header />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
