import { Hero } from "@/components/Hero";
import { ScrollStage } from "@/components/ScrollStage";
import { Specs } from "@/components/Specs";
import { Serve } from "@/components/Serve";
import { Distillery } from "@/components/Distillery";
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
      <Distillery />
      <Footer />
    </main>
  );
}
