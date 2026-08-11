import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RIZEEWEB — Premium Web Development",
  description:
    "Custom-coded, blazing-fast websites for architects and modern brands. Built with Next.js for maximum performance.",
  keywords: [
    "website developer",
    "next.js developer",
    "architect websites",
    "premium websites",
    "custom websites",
    "India",
  ],
  openGraph: {
    title: "RIZEEWEB — Premium Web Development",
    description:
      "Custom-coded websites for architects and modern brands. Fast, responsive, designed to convert.",
    type: "website",
    url: "https://rizeeweb.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SmoothScroll>
          <CustomCursor />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
