import type { Metadata } from "next";
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
  title: "Vision Graphics - Sign Supply Distribution",
  description:
    "Wholesale sign supply distribution warehouse serving the capital district for over 50 years.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${michroma.variable} ${nunito.variable} antialiased`}
    >
      <body className="font-secondary">{children}</body>
    </html>
  );
}
