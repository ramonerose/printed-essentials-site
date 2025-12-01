import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Printed Essentials | Custom Apparel & Screen Printing in Greenville, SC",
  description: "Greenville's premier custom apparel printing service. Screen printing, DTF printing, and embroidery for t-shirts, hoodies, hats & more. Serving Greenville, Simpsonville, Greer, and the Upstate SC area. Fast turnaround, quality guaranteed.",
  keywords: "custom apparel Greenville SC, screen printing Greenville, custom t-shirts Greenville, embroidery Greenville, DTF printing Greenville, custom hoodies Greenville, promotional products Greenville SC, custom hats Greenville, Upstate SC printing, Simpsonville screen printing, Greer custom apparel",
  openGraph: {
    title: "Printed Essentials | Custom Apparel & Screen Printing in Greenville, SC",
    description: "Greenville's premier custom apparel printing service. Screen printing, DTF printing, and embroidery.",
    url: "https://printedessentials.com",
    siteName: "Printed Essentials",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: '/favicon-32.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
