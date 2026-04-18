import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Sintergia Studio — Bots y automatizaciones para su negocio",
  description:
    "Chatbots de WhatsApp, automatizaciones y páginas web para profesionales y negocios locales. Ahorre tiempo, atienda mejor, venda más.",
  openGraph: {
    title: "Sintergia Studio — Bots y automatizaciones para su negocio",
    description:
      "Chatbots de WhatsApp, automatizaciones y páginas web para profesionales y negocios locales.",
    type: "website",
    locale: "es_AR",
  },
};

import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
