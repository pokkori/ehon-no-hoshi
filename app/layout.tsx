import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const SITE_URL = "https://ehon-no-hoshi.vercel.app";
const TITLE = "えほんのほし｜AIが作る、世界にひとつだけの絵本";
const DESC = "お子さんの名前・好き・テーマを入力するだけ。AIが世界にひとつだけのオリジナル絵本を作り、ご自宅に郵送します。誕生日・入園・卒業の特別なプレゼントに。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📖</text></svg>",
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "えほんのほし",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
  metadataBase: new URL(SITE_URL),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "えほんのほし",
      url: SITE_URL,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "3480",
        priceCurrency: "JPY",
        description: "オリジナル絵本 1冊 ¥3,480",
      },
      description: DESC,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "どんな絵本が届きますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "お子さんの名前・好き・テーマをもとにAIが12ページのオリジナルストーリーを作成。表紙イラスト付きでA5サイズの絵本をお届けします。",
          },
        },
        {
          "@type": "Question",
          name: "いつ届きますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ご注文から7〜10営業日を目安にお届けします。発送時にメールでお知らせします。",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
