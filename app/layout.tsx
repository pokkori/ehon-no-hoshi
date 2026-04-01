import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const SITE_URL = "https://ehon-no-hoshi.vercel.app";
const TITLE = "えほんのほし｜AIが作る、世界にひとつだけの絵本";
const DESC = "お子さんの名前・好き・テーマを入力するだけ。AIが世界にひとつだけのオリジナル絵本を作り、ご自宅に郵送します。誕生日・入園・卒業の特別なプレゼントに。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'></text></svg>",
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "えほんのほし",
    locale: "ja_JP",
    type: "website",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "えほんのほし" }],
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
        {
          "@type": "Question",
          name: "何歳のお子さんに向いていますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "0歳〜8歳のお子さんに特におすすめです。ひらがな中心のやさしい文章で作成するため、読み聞かせから自分で読む練習まで幅広くお使いいただけます。年齢に合わせた文量に調整することも可能です。",
          },
        },
        {
          "@type": "Question",
          name: "テーマは自由に選べますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、自由にテーマを入力できます。「恐竜の冒険」「宇宙探検」「おかし屋さんごっこ」など、お子さんの好きなテーマでオリジナルのストーリーを作成します。",
          },
        },
        {
          "@type": "Question",
          name: "絵本の品質はどうですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "上質なマット用紙にフルカラー印刷し、A5サイズの製本で仕上げます。表紙はオリジナルイラスト付きで、市販の絵本と同等の品質をお届けします。",
          },
        },
        {
          "@type": "Question",
          name: "プレゼント用の包装はありますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、ギフトラッピングオプションをご用意しています。誕生日・入園・卒業などのお祝いシーンに合わせたラッピングで、そのままプレゼントとしてお渡しいただけます。",
          },
        },
        {
          "@type": "Question",
          name: "内容を確認してから注文できますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、注文前にAIが生成したストーリーのプレビューをご確認いただけます。内容が気に入らない場合は修正リクエストを送ることができます。満足いただいてから印刷・発送します。",
          },
        },
        {
          "@type": "Question",
          name: "複数冊まとめて注文できますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、複数冊の同時注文に対応しています。兄弟姉妹それぞれのオリジナル絵本を作ったり、クラスの友達へのプレゼントにもご利用いただけます。",
          },
        },
        {
          "@type": "Question",
          name: "返品・交換はできますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "印刷物の性質上、プレビュー確認後の内容に関する返品はお受けできません。ただし、印刷不良や配送中の破損があった場合は無償で交換対応いたします。",
          },
        },
        {
          "@type": "Question",
          name: "子供の個人情報は安全ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "お子さんのお名前や情報はオリジナル絵本の生成のみに使用します。第三者への提供や広告目的での利用は一切行いません。SSL暗号化通信で安全に保護しています。",
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
        {(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? 'ca-pub-XXXXXXXX') !== 'ca-pub-XXXXXXXX' && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
