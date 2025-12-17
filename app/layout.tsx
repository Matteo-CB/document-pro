import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://document-pro.fr"),
  title: {
    default: "Générateur de Documents Pro Gratuit | Devis, Factures, CV",
    template: "%s | Document Pro",
  },
  description:
    "Créez des documents professionnels PDF gratuitement en quelques secondes. Générateur de Devis, Factures, CV, Lettres de motivation. Sans inscription, 100% privé et sécurisé.",
  keywords: [
    "générateur de devis gratuit",
    "créer facture en ligne",
    "cv builder gratuit",
    "modèle lettre motivation pdf",
    "éditeur pdf en ligne",
    "document pro",
    "logiciel facturation gratuit",
  ],
  authors: [{ name: "HiddenLab", url: "https://hiddenlab.fr" }],
  creator: "HiddenLab",
  publisher: "HiddenLab",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://document-pro.fr",
    siteName: "Document Pro",
    title: "Générateur de Documents Professionnels Gratuit",
    description:
      "La suite d'outils ultime pour générer vos documents administratifs et commerciaux. Rapide, gratuit et élégant.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Document Pro",
    description: "Créez vos Devis, CV et Factures en un clic.",
    creator: "@HiddenLab",
  },
  alternates: {
    canonical: "./",
  },
  // other: {
  //   "google-adsense-account": "ca-pub-9989627034003305",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Document Pro",
    url: "https://document-pro.fr",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    author: {
      "@type": "Organization",
      name: "HiddenLab",
      url: "https://hiddenlab.fr",
      sameAs: [
        "https://twitter.com/hiddenlab",
        "https://linkedin.com/company/hiddenlab",
      ],
    },
    featureList: "Génération PDF, Devis, Factures, CV, Lettres, Attestations",
  };

  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased text-secondary bg-background min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary`}
      >
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <GoogleAnalytics gaId="G-B34BZR4K7W" />

        {/* CORRECTION : Chargement manuel optimisé de Google AdSense
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9989627034003305"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        /> */}
      </body>
    </html>
  );
}
