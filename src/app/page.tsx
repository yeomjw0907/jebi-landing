import { Hero } from "@/components/Hero";
import { ScrollStage } from "@/components/ScrollStage";
import { Specs } from "@/components/Specs";
import { Serve } from "@/components/Serve";
import { Scenes } from "@/components/Scenes";
import { Distillery } from "@/components/Distillery";
import { LaunchCta } from "@/components/LaunchCta";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { SectionTracker } from "@/components/SectionTracker";

export default function Home() {
  return (
    <main>
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
      <SectionTracker name="launch_cta">
        <LaunchCta />
      </SectionTracker>
      <SectionTracker name="footer">
        <Footer />
      </SectionTracker>
    </main>
  );
}
