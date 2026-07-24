import { Hero } from "@/components/Hero";
import { ScrollStage } from "@/components/ScrollStage";
import { Specs } from "@/components/Specs";
import { Serve } from "@/components/Serve";
import { Scenes } from "@/components/Scenes";
import { Distillery } from "@/components/Distillery";
import { LeadForm } from "@/components/LeadForm";
import { LaunchCta } from "@/components/LaunchCta";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { SectionTracker } from "@/components/SectionTracker";

const STORE_URL = process.env.NEXT_PUBLIC_STORE_URL || "https://044yangjo.com/";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "제비",
      alternateName: "JEBI",
      description:
        "공사사양조의 일반증류주. 삭(SAK) 증류원액 베이스의 저도수 라인으로, 조청에서 오는 자연스러운 단맛과 곡물의 풍미. ABV 17%, 360ml.",
      image: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/jebi-studio.png`,
      brand: { "@type": "Brand", name: "공사사양조 (044 DISTILLERY)" },
      category: "일반증류주",
      offers: {
        "@type": "Offer",
        price: "6000",
        priceCurrency: "KRW",
        availability: "https://schema.org/InStock",
        url: STORE_URL,
      },
    },
    {
      "@type": "Organization",
      name: "농업회사법인 주식회사 공사사양조",
      alternateName: "044 DISTILLERY",
      url: "https://044yangjo.com/",
      telephone: "+82-44-905-0440",
      address: {
        "@type": "PostalAddress",
        addressCountry: "KR",
        addressRegion: "세종특별자치시",
        streetAddress: "조치원읍 새내4길 3, 101호",
      },
      sameAs: ["https://www.instagram.com/sak_spirits_044"],
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgeGate />
      <SectionTracker name="hero">
        <Hero />
      </SectionTracker>
      {/* ScrollStage는 자체 chapter_view 이벤트로 추적 (420vh 스티키 구조) */}
      <ScrollStage />
      <SectionTracker name="specs">
        <Specs />
      </SectionTracker>
      <SectionTracker name="serve">
        <Serve />
      </SectionTracker>
      <SectionTracker name="scenes">
        <Scenes />
      </SectionTracker>
      <SectionTracker name="distillery">
        <Distillery />
      </SectionTracker>
      <SectionTracker name="contact">
        <LeadForm />
      </SectionTracker>
      <SectionTracker name="launch_cta">
        <LaunchCta />
      </SectionTracker>
      <SectionTracker name="footer">
        <Footer />
      </SectionTracker>
    </main>
  );
}
