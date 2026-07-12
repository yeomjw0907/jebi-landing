import type { Metadata } from "next";
import {
  Song_Myung,
  Nanum_Brush_Script,
  Noto_Serif_KR,
  Marcellus,
} from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";

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
  title: "제비 — 공사사양조 | 봄을 물고 온 증류주",
  description:
    "공사사양조(044 DISTILLERY)의 새로운 일반증류주, 제비. 국내산 쌀과 밀, 청주의 은은한 단맛. ABV 17% / 360ml. 2026년 4월 출시.",
  openGraph: {
    title: "제비 — 공사사양조",
    description:
      "봄을 물고 온 증류주, 제비. 은은한 단맛과 부드러운 목넘김. ABV 17% / 360ml.",
    locale: "ko_KR",
    type: "website",
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
