import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: 'Datrix — Automate the Impossible. Scale the Rest.',
  description: 'Datrix turns raw data chaos into intelligent workflows — in real time, at any scale, across every team.',
  keywords: ['AI automation', 'data platform', 'workflow automation', 'enterprise AI', 'datrix'],
  openGraph: {
    title: 'Datrix — Automate the Impossible. Scale the Rest.',
    description: 'Datrix turns raw data chaos into intelligent workflows — in real time, at any scale, across every team.',
    url: 'https://datrix.vercel.app',
    siteName: 'Datrix',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Datrix AI Platform Dashboard' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Datrix — Automate the Impossible. Scale the Rest.',
    description: 'Datrix turns raw data chaos into intelligent workflows — in real time, at any scale, across every team.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://datrix.vercel.app',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico',  type: 'image/x-icon' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jetbrainsMono.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
