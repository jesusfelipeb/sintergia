import type { Metadata } from "next";
import {
  Fraunces,
  Plus_Jakarta_Sans,
  Inter_Tight,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

import FloatingControls from "@/components/ui/FloatingControls";
import { SEO_DEFAULTS, SITE_URL, buildJsonLd } from "@/lib/seo";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_DEFAULTS.title,
    template: `%s · ${SEO_DEFAULTS.siteName}`,
  },
  description: SEO_DEFAULTS.description,
  applicationName: SEO_DEFAULTS.siteName,
  keywords: [
    "chatbot WhatsApp",
    "bot WhatsApp",
    "agente IA",
    "automatización WhatsApp",
    "Sintergia",
    "agencia IA Argentina",
    "bots para negocios",
    "automatización pymes",
    "consultorio bot",
    "agenda automática WhatsApp",
  ],
  authors: [{ name: SEO_DEFAULTS.siteName, url: SITE_URL }],
  creator: SEO_DEFAULTS.siteName,
  publisher: SEO_DEFAULTS.siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    url: SITE_URL,
    siteName: SEO_DEFAULTS.siteName,
    type: "website",
    locale: SEO_DEFAULTS.locale,
    alternateLocale: [...SEO_DEFAULTS.alternateLocales],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = [
    fraunces.variable,
    jakarta.variable,
    interTight.variable,
    jetbrainsMono.variable,
  ].join(" ");

  const jsonLd = buildJsonLd();

  return (
    <html lang="es" className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-body">
        {children}
        <FloatingControls />

        {/* JSON-LD structured data (Organization + WebSite + ProfessionalService) */}
        <script
          type="application/ld+json"
          // Schema.org structured data, inyectado server-side
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
