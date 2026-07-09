"use client";

import { motion } from "framer-motion";
import { VideoLoop } from "./VideoLoop";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <header className="relative h-[100svh] overflow-hidden bg-ink">
      {/* 배경: 다크 무드 실사 (hero-loop.mp4 준비 시 시네마그래프로 자동 업그레이드) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.6, ease }}
        className="absolute inset-0"
      >
        <VideoLoop src="/hero-loop.mp4" poster="/jebi-dark.png" className="absolute inset-0" />
      </motion.div>

      {/* 가독성 오버레이 — 사진의 무드는 살리고 가장자리만 가라앉힘 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(13,12,10,0.95) 0%, rgba(13,12,10,0.35) 26%, rgba(13,12,10,0.05) 55%, rgba(13,12,10,0.5) 100%), radial-gradient(ellipse 130% 90% at 50% 45%, transparent 55%, rgba(13,12,10,0.55) 100%)",
        }}
      />

      {/* 상단 내비 */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4, ease }}
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-6"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-white.png" alt="044 DISTILLERY" className="h-9 md:h-11 w-auto" />
        <a
          href="https://044yangjo.com/"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:block font-latin tracking-[0.25em] text-xs text-paper-dim hover:text-amber transition-colors"
        >
          044YANGJO.COM
        </a>
      </motion.nav>

      {/* 좌측 세로 카피 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 1.2, ease }}
        className="absolute left-6 md:left-14 top-[38%] -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-6"
      >
        <div className="v-rule h-20" />
        <p
          className="font-display text-paper text-sm tracking-[0.4em] [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]"
          style={{ writingMode: "vertical-rl" }}
        >
          봄을 물고 온 증류주
        </p>
      </motion.div>

      {/* 우측 세로 스펙 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 1.4, ease }}
        className="absolute right-6 md:right-14 top-[38%] -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-6"
      >
        <p
          className="font-latin text-paper-dim text-xs tracking-[0.5em] [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]"
          style={{ writingMode: "vertical-rl" }}
        >
          ABV 17% · 360ml · 2026
        </p>
        <div className="v-rule h-20" />
      </motion.div>

      {/* 하단: 타이틀 + 스크롤 큐 */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="px-6 md:px-12 pb-16 md:pb-20 flex items-end justify-between">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.9, ease }}
          >
            <p className="font-latin tracking-[0.4em] text-[10px] md:text-xs text-amber-2 mb-3">
              GONGSASA BREWERY — NEW ARRIVAL
            </p>
            <h1 className="font-display text-3xl md:text-5xl leading-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.7)]">
              가볍게 들르는 술,
              <br />
              <span className="text-amber-2">제비</span>가 왔습니다
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
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
          transition={{ duration: 1.2, delay: 1.8 }}
          className="border-t py-3 overflow-hidden backdrop-blur-[2px]"
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
