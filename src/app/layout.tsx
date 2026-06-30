import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sikder Resort & Villas | Luxury Beachfront Resort in Kuakata",
  description:
    "Sikder Resort & Villas, Kuakata — a luxurious beachfront resort & villas with nature. Sophisticated rooms, fine dining, wellness, conference halls & private pool villas on the Bay of Bengal.",
  keywords: [
    "Sikder Resort",
    "Kuakata resort",
    "luxury resort Bangladesh",
    "beachfront resort Kuakata",
    "private pool villa Bangladesh",
    "Sagorkonna Kuakata",
  ],
  authors: [{ name: "Sikder Resort & Villas" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Sikder Resort & Villas | Luxury Beachfront Resort in Kuakata",
    description:
      "A luxuries resort & villas with nature on the Bay of Bengal. Rooms, suites, private pool villas, fine dining & wellness in Kuakata.",
    siteName: "Sikder Resort & Villas",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${jost.variable} font-sans antialiased bg-cream text-ink`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
