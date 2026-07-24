import type { Metadata } from "next";
import {
  Song_Myung,
  Nanum_Brush_Script,
  Noto_Serif_KR,
  Marcellus,
} from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const songMyung = Song_Myung({
  weight: "400",
  variable: "--font-song-myung",
  display: "swap",

});

const nanumBrush = Nanum_Brush_Script({
  weight: "400",
  variable: "--font-nanum-brush",
  display: "swap",

});

const notoSerifKR = Noto_Serif_KR({
  weight: ["300", "400", "500", "600"],
  variable: "--font-noto-serif-kr",
  display: "swap",

});

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "제비 — 공사사양조 | 봄을 물고 온 증류주",
  description:
    "공사사양조(044 DISTILLERY)의 새로운 일반증류주, 제비. 국내산 쌀과 밀, 조청의 은은한 단맛. ABV 17% / 360ml. 2026년 4월 출시.",
  keywords: [
    "제비",
    "제비 소주",
    "증류주",
    "증류식 소주",
    "데일리 증류주",
    "부드러운 술",
    "증류주 추천",
    "증류주 입문",
    "소주 대신",
    "조청 발효",
    "공사사양조",
    "044양조",
    "삭",
    "SAK",
    "세종 전통주",
    "혼술",
    "홈파티 술",
    "전통주 선물",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "제비 — 공사사양조",
    description:
      "봄을 물고 온 증류주, 제비. 조청의 은은한 단맛과 부드러운 목넘김. ABV 17% / 360ml.",
    locale: "ko_KR",
    type: "website",
    url: "/",
    siteName: "제비 — 044 DISTILLERY",
    images: [{ url: "/jebi-studio.png", width: 1200, height: 630, alt: "제비 — 봄을 물고 온 증류주" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "제비 — 공사사양조",
    description:
      "봄을 물고 온 증류주, 제비. 조청의 은은한 단맛과 부드러운 목넘김. ABV 17% / 360ml.",
    images: ["/jebi-studio.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${songMyung.variable} ${nanumBrush.variable} ${notoSerifKR.variable} ${marcellus.variable} antialiased`}
    >
      <body className="bg-ink text-paper font-body grain">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
