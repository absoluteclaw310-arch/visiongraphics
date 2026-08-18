import type { Metadata } from "next";
import Script from "next/script";
import { Michroma, Nunito } from "next/font/google";
import "./globals.css";

const michroma = Michroma({
  weight: "400",
  variable: "--font-michroma",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vision Graphics | Wholesale Sign Supply Distribution | Schenectady, NY",
  description: "Wholesale sign supply distribution warehouse serving Schenectady and the Capital District for over 50 years. Vinyl, banners, substrates, and more.",
  keywords: ["sign supply", "wholesale signs", "vinyl", "banners", "Schenectady", "Capital District", "sign distribution"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${michroma.variable} ${nunito.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Vision Graphics",
              "description": "Wholesale sign supply distribution warehouse serving Schenectady and the Capital District for over 50 years.",
              "url": "https://visiongraphics.vercel.app",
              "telephone": "+1-518-555-0196",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Schenectady",
                "addressRegion": "NY",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 42.8142,
                "longitude": -73.9396
              },
              "areaServed": {
                "@type": "City",
                "name": "Schenectady, NY"
              },
              "priceRange": "$$",
              "openingHours": "Mo-Fr 08:00-17:00"
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-secondary">{children}</body>
    </html>
  );
}
