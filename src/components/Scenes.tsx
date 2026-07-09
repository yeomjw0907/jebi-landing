"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { VideoLoop } from "./VideoLoop";

/**
 * 장면들 — 실사 라이프스타일 컷의 풀블리드 패럴랙스 에디토리얼.
 * scene-loop.mp4가 준비되면 자동으로 시네마그래프로 업그레이드.
 */
export function Scenes() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative h-[110svh] overflow-hidden bg-ink"
      aria-label="장면들"
    >
      {/* 패럴랙스 배경 */}
      <motion.div style={{ y }} className="absolute -inset-y-[14%] inset-x-0">
        <VideoLoop
          src="/scene-loop.mp4"
          poster="/jebi-outdoor.png"
          className="absolute inset-0"
        />
      </motion.div>

      {/* 오버레이 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(13,12,10,0.92) 0%, rgba(13,12,10,0.25) 35%, rgba(13,12,10,0.1) 60%, rgba(13,12,10,0.55) 100%)",
        }}
      />

      {/* 카피 */}
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="font-latin tracking-[0.4em] text-[10px] md:text-xs text-amber-2 mb-4">
            SCENES — IN THE CITY
          </p>
          <h2 className="font-display text-3xl md:text-5xl leading-snug text-paper mb-5">
            도심의 틈,
            <br />한 잔의 봄
          </h2>
          <p className="text-paper-dim text-sm md:text-base leading-relaxed font-light">
            거창한 자리가 아니어도 좋습니다. 잠깐 걸터앉은 콘크리트 위,
            해 좋은 오후 — 제비는 그런 틈에 내려앉는 술입니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
