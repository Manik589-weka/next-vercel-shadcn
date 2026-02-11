import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Footer8 } from "@/components/pro-blocks/landing-page/footers/footer-8";
import { LpNavbar3 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-3";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WEKA",
  description: "WEKA Sanity + Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <LpNavbar3 />
        <main className="flex-1">{children}</main>
        <Footer8 />
      </body>
    </html>
  );
}
