"use client";

import { motion } from "framer-motion";
import { Bottle } from "./Bottle";
import { Swallow } from "./Swallow";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <header className="relative h-[100svh] overflow-hidden bg-ink">
      {/* 은은한 달빛 광원 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 38%, rgba(201,144,46,0.10), transparent 70%), radial-gradient(ellipse 90% 60% at 50% 110%, rgba(242,237,223,0.05), transparent 60%)",
        }}
      />
      {/* 사선 창살 그림자 — 제품 사진의 분위기 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "repeating-linear-gradient(115deg, transparent 0 140px, rgba(0,0,0,0.5) 140px 200px)",
        }}
      />

      {/* 배경 초대형 캘리그래피 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, delay: 0.5, ease }}
        aria-hidden
        className="absolute inset-0 flex items-center justify-center select-none"
      >
        <span
          className="font-brush leading-none text-[46vw] md:text-[34vw] text-transparent"
          style={{ WebkitTextStroke: "1px rgba(242,237,223,0.10)" }}
        >
          제비
        </span>
      </motion.div>

      {/* 상단 내비 */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease }}
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-6"
      >
        <div className="flex items-center gap-3">
          <Swallow className="w-6 h-6 text-paper" />
          <span className="font-latin tracking-[0.35em] text-xs text-paper-dim">
            044 DISTILLERY
          </span>
        </div>
        <a
          href="https://044yangjo.com/"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:block font-latin tracking-[0.25em] text-xs text-paper-dim hover:text-amber transition-colors"
        >
          044YANGJO.COM
        </a>
      </motion.nav>

      {/* 중앙: 병 */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.div
          initial={{ y: 120, opacity: 0, filter: "blur(12px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.9, ease }}
          className="bottle-float"
        >
          <Bottle className="h-[58svh] md:h-[64svh] w-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]" />
        </motion.div>
      </div>

      {/* 좌측 세로 카피 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 1.6, ease }}
        className="absolute left-6 md:left-14 top-[38%] -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-6"
      >
        <div className="v-rule h-20" />
        <p
          className="font-display text-paper-dim text-sm tracking-[0.4em]"
          style={{ writingMode: "vertical-rl" }}
        >
          봄을 물고 온 증류주
        </p>
      </motion.div>

      {/* 우측 세로 스펙 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 1.8, ease }}
        className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-6"
      >
        <p
          className="font-latin text-paper-dim text-xs tracking-[0.5em]"
          style={{ writingMode: "vertical-rl" }}
        >
          ABV 17% · 360ml · 2026
        </p>
        <div className="v-rule h-24" />
      </motion.div>

      {/* 하단: 타이틀 + 스크롤 큐 */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="px-6 md:px-12 pb-20 flex items-end justify-between">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.3, ease }}
          >
            <p className="font-latin tracking-[0.4em] text-[10px] md:text-xs text-amber mb-3">
              GONGSASA BREWERY — NEW ARRIVAL
            </p>
            <h1 className="font-display text-3xl md:text-5xl leading-tight">
              가볍게 들르는 술,
              <br />
              <span className="text-amber-2">제비</span>가 왔습니다
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="hidden md:flex flex-col items-center gap-3"
            aria-hidden
          >
            <span className="font-latin text-[10px] tracking-[0.4em] text-paper-dim">
              SCROLL
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="v-rule h-14"
            />
          </motion.div>
        </div>

        {/* 마퀴 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
          className="border-t py-3 overflow-hidden"
          style={{ borderColor: "var(--line-dark)" }}
        >
          <div className="marquee-track">
            {[0, 1].map((i) => (
              <span
                key={i}
                aria-hidden={i === 1}
                className="font-latin text-xs tracking-[0.45em] text-paper-dim whitespace-nowrap pr-4"
              >
                제비 · JEBI · 일반증류주 · ABV 17% · 360ml · 공사사양조 · 044
                DISTILLERY · 세종 조치원 · 국내산 쌀과 밀 · 봄을 물고 온 증류주 ·{" "}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
}
