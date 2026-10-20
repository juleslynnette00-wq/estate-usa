import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EstateUSA · American Homes for Rent or Sale",
  description:
    "Browse 320+ verified home listings for rent or sale across all 50 U.S. states. Connect with licensed local agents, request private tours, and find your next home on EstateUSA.",
  keywords: [
    "real estate",
    "homes for sale",
    "homes for rent",
    "American real estate",
    "buy a house",
    "rent a house",
    "U.S. property listings",
    "EstateUSA",
  ],
  authors: [{ name: "EstateUSA Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "EstateUSA · American Homes for Rent or Sale",
    description:
      "Browse 320+ verified home listings for rent or sale across all 50 U.S. states.",
    url: "https://estateusa.com",
    siteName: "EstateUSA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EstateUSA · American Homes for Rent or Sale",
    description:
      "Browse 320+ verified home listings for rent or sale across all 50 U.S. states.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
