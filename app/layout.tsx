import type { Metadata } from "next";
import { Forum, Jost } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
  metadataBase: new URL("https://miumiunaildesign.com"),
  title: "Miu Miu Nail Design | Menlo Park, CA",
  description: "Miu Miu Nail Design in Menlo Park, California.",
  alternates: {
    canonical: "/",
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
        <Footer />
      </body>
    </html>
  );
}
