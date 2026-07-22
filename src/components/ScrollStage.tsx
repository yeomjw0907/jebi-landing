"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { BottleTurntable } from "./BottleTurntable";
import { track } from "@/lib/analytics";

const CHAPTERS = [
  {
    no: "壹",
    latin: "CHAPTER ONE — THE BIRD",
    title: "처마 밑에\n봄이 들듯",
    body: "세종의 옛 이름 연기군(燕岐郡) — 그 '연'은 제비 연(燕)입니다. 봄을 물고 오는 새, 제비. 대표 브랜드 삭(SAK)의 결은 그대로, 부담은 덜어냈습니다. 매일의 식탁에 가볍게 내려앉는 증류주.",
    align: "left" as const,
  },
  {
    no: "貳",
    latin: "CHAPTER TWO — THE GRAIN",
    title: "국내산 쌀과 밀,\n그리고 조청",
    body: "조청을 활용한 양조 방식으로 자연스러운 단맛과 곡물의 풍미를 담았습니다. 인위적인 단맛 대신, 쌀과 엿기름이 빚은 천연의 은은함.",
    align: "right" as const,
  },
  {
    no: "參",
    latin: "CHAPTER THREE — THE FINISH",
    title: "부드럽게 넘기고,\n담백하게 맺는다",
    body: "부드러운 목넘김과 깔끔한 피니시. 증류주가 처음이어도 좋습니다. 식사와 함께, 혹은 하루의 끝에 스트레이트 한 잔.",
    align: "right" as const,
  },
];

function Chapter({
  chapter,
  progress,
  range,
}: {
  chapter: (typeof CHAPTERS)[number];
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const [start, end] = range;
  const span = end - start;
  const opacity = useTransform(
    progress,
    [start, start + span * 0.25, end - span * 0.25, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, end], [60, -60]);

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 md:px-16 flex ${
        chapter.align === "left" ? "justify-start" : "justify-end"
      }`}
    >
      <div className="max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-brush text-4xl text-amber">{chapter.no}</span>
          <span className="font-latin text-[10px] tracking-[0.4em] text-paper-dim">
            {chapter.latin}
          </span>
        </div>
        <h2 className="font-display text-3xl md:text-5xl leading-snug whitespace-pre-line mb-6">
          {chapter.title}
        </h2>
        <p className="text-paper-dim leading-relaxed text-sm md:text-base font-light">
          {chapter.body}
        </p>
      </div>
    </motion.div>
  );
}

export function ScrollStage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 챕터 도달 추적 — 어느 챕터에서 스토리를 떠나는지 본다
  const seenChapters = useRef(new Set<number>());
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v <= 0) return;
      const chapter = v >= 0.98 ? 4 : Math.min(Math.floor(v * 3) + 1, 3);
      if (seenChapters.current.has(chapter)) return;
      seenChapters.current.add(chapter);
      if (chapter === 4) {
        track("story_complete");
      } else {
        track("chapter_view", { chapter });
      }
    });
  }, [scrollYProgress]);

  // 병의 여정: 중앙 → 우측 → 좌측 → 다시 중앙 크게 (회전은 턴테이블 프레임이 담당)
  const x = useTransform(
    scrollYProgress,
    [0, 0.3, 0.62, 1],
    reduced ? ["0vw", "0vw", "0vw", "0vw"] : ["0vw", "22vw", "-22vw", "0vw"]
  );
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.62, 1], [1, 0.9, 0.9, 1.06]);

  // 광원도 병을 따라간다
  const glowX = useTransform(scrollYProgress, [0, 0.3, 0.62, 1], ["50%", "72%", "28%", "50%"]);
  const glowBg = useTransform(
    glowX,
    (v) =>
      `radial-gradient(ellipse 46% 42% at ${v} 50%, rgba(201,144,46,0.13), transparent 70%)`
  );

  return (
    <section ref={ref} className="relative h-[420vh] bg-ink" aria-label="제비 이야기">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 따라다니는 광원 */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: glowBg }}
        />

        {/* 병 — 스크롤 스크럽 턴테이블 (프레임 없으면 정지 컷아웃 폴백) */}
        <motion.div
          style={{ x, scale }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <BottleTurntable
            progress={scrollYProgress}
            frameCount={64}
            className="h-[56svh] md:h-[62svh] w-auto drop-shadow-[0_40px_70px_rgba(0,0,0,0.85)] [filter:brightness(0.96)_contrast(1.04)_drop-shadow(0_40px_70px_rgba(0,0,0,0.85))]"
          />
        </motion.div>

        {/* 챕터 텍스트 */}
        <div className="absolute inset-0 z-20">
          {CHAPTERS.map((c, i) => (
            <Chapter
              key={c.no}
              chapter={c}
              progress={scrollYProgress}
              range={[i / 3, (i + 1) / 3]}
            />
          ))}
        </div>

        {/* 진행 표시 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-40 h-px bg-white/10">
          <motion.div
            className="h-full bg-amber origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  );
}
