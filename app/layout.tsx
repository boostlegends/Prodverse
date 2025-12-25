import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#7FD149",
};

export const metadata: Metadata = {
  // Base URL for resolving relative URLs
  metadataBase: new URL('https://prodverse.co'),

  // Basic SEO
  title: {
    default: "Prodverse - AI-Powered Music Creation Platform",
    template: "%s | Prodverse",
  },
  description:
    "Create, collaborate, and share your music with AI-powered tools. Generate beats, create music videos, collaborate with artists worldwide, and earn from your creations. Join the future of music production.",
  keywords: [
    "music production",
    "AI music generator",
    "music collaboration",
    "beat maker",
    "AI beats",
    "music platform",
    "producer tools",
    "music video creator",
    "AI music",
    "music social network",
    "stem separation",
    "music creators",
    "producer collaboration",
    "music sharing",
    "AI mastering",
    "music community",
    "beat production",
    "music generation",
    "artist collaboration",
    "music revenue sharing",
  ],
  authors: [{ name: "Prodverse", url: "https://prodverse.co" }],
  creator: "Prodverse",
  publisher: "Prodverse",
  applicationName: "Prodverse",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/logo.png",
  },

  // Manifest
  manifest: "/manifest.json",

  // Open Graph (Facebook, LinkedIn, etc.)
  // Note: OG images are generated dynamically via app/opengraph-image.tsx
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prodverse.co",
    siteName: "Prodverse",
    title: "Prodverse - AI-Powered Music Creation Platform",
    description:
      "Create, collaborate, and share your music with AI-powered tools. Generate beats, create music videos, and earn from your creations.",
  },

  // Twitter Card
  // Note: Twitter images are generated dynamically via app/twitter-image.tsx
  twitter: {
    card: "summary_large_image",
    site: "@prodverse",
    creator: "@prodverse",
    title: "Prodverse - AI-Powered Music Creation Platform",
    description:
      "Create, collaborate, and share your music with AI-powered tools. Generate beats, create music videos, and earn from your creations.",
  },

  // Verification (add your actual verification codes)
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },

  // Alternate URLs and languages
  alternates: {
    canonical: "https://prodverse.co",
    languages: {
      "en-US": "https://prodverse.co",
    },
  },
  other: {
    "alternate-domain": "https://prodverse.net",
  },

  // Category
  category: "music",

  // Classification
  classification: "Music Production Software",

  // Other
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Prodverse",
  description:
    "AI-powered music creation platform for producers and artists to create, collaborate, and share music.",
  url: "https://prodverse.co",
  applicationCategory: "MusicApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free tier available",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "10000",
    bestRating: "5",
    worstRating: "1",
  },
  creator: {
    "@type": "Organization",
    name: "Prodverse",
    url: "https://prodverse.co",
    logo: "https://prodverse.co/logo.png",
    sameAs: [
      "https://prodverse.net",
      "https://twitter.com/prodverse",
      "https://instagram.com/prodverse",
      "https://github.com/boostlegends/Prodverse",
    ],
  },
  featureList: [
    "AI Music Generation",
    "AI Music Video Creator",
    "Collaboration Tools",
    "Revenue Sharing",
    "Social Music Feed",
    "Stem Separation",
    "AI Mixing & Mastering",
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Prodverse",
  url: "https://prodverse.co",
  logo: "https://prodverse.co/logo.png",
  description:
    "AI-powered music creation platform for producers and artists.",
  foundingDate: "2024",
  sameAs: [
    "https://prodverse.net",
    "https://twitter.com/prodverse",
    "https://instagram.com/prodverse",
    "https://github.com/boostlegends/Prodverse",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@prodverse.co",
    contactType: "customer service",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Theme initialization - prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  } else if (!theme) {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (!prefersDark) {
                      document.documentElement.classList.add('light');
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TF6QT94RGJ" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TF6QT94RGJ');
            `,
          }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
