import { Hero } from "@/components/Hero";
import { ScrollStage } from "@/components/ScrollStage";
import { Specs } from "@/components/Specs";
import { Serve } from "@/components/Serve";
import { Scenes } from "@/components/Scenes";
import { Distillery } from "@/components/Distillery";
import { LaunchCta } from "@/components/LaunchCta";
import { Footer } from "@/components/Footer";
import { FlyingSwallow } from "@/components/FlyingSwallow";
import { AgeGate } from "@/components/AgeGate";

export default function Home() {
  return (
    <main>
      <AgeGate />
      <FlyingSwallow />
      <Hero />
      <ScrollStage />
      <Specs />
      <Serve />
      <Scenes />
      <Distillery />
      <LaunchCta />
      <Footer />
    </main>
  );
}
