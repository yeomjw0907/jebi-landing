"use client";

/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { Swallow } from "./Swallow";

/** 출시 CTA — 라벨 붓글씨를 중심에 둔 마감 인사 */
export function LaunchCta() {
  return (
    <section className="relative bg-black text-paper py-28 md:py-40 overflow-hidden text-center">
      {/* 은은한 후광 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 50% 45%, rgba(201,144,46,0.13), transparent 70%)",
        }}
      />
      {/* 좌우로 스치는 제비들 */}
      <motion.div
        aria-hidden
        initial={{ x: "-10vw", opacity: 0 }}
        whileInView={{ x: "6vw", opacity: 0.25 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute left-0 top-16 text-paper"
      >
        <Swallow className="w-10 h-10" />
      </motion.div>
      <motion.div
        aria-hidden
        initial={{ x: "10vw", opacity: 0 }}
        whileInView={{ x: "-8vw", opacity: 0.15 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, delay: 0.3, ease: "easeOut" }}
        className="absolute right-0 bottom-24 text-paper -scale-x-100"
      >
        <Swallow className="w-7 h-7" />
      </motion.div>

      <div className="relative max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="v-rule h-16" />
            <img
              src="/label-front.png"
              alt="제비"
              className="w-40 md:w-56 h-auto drop-shadow-[0_10px_40px_rgba(201,144,46,0.15)]"
            />
            <div className="v-rule h-16" />
          </div>

          <p className="font-latin tracking-[0.4em] text-[10px] md:text-xs text-amber-2 mb-4">
            SPRING 2026 — COMING SOON
          </p>
          <h2 className="font-display text-3xl md:text-5xl leading-snug mb-6">
            2026년 4월,
            <br />
            제비가 날아듭니다
          </h2>
          <p className="text-paper-dim text-sm md:text-base font-light leading-relaxed mb-12">
            출시 소식과 입점처 안내는 인스타그램에서 가장 먼저 전해드립니다.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.instagram.com/sak_spirits_044"
              target="_blank"
              rel="noreferrer"
              className="bg-amber text-ink px-8 py-4 font-display text-sm tracking-wider hover:bg-amber-2 transition-colors"
            >
              출시 소식 받기
            </a>
            <a
              href="https://044yangjo.com/"
              target="_blank"
              rel="noreferrer"
              className="border px-8 py-4 font-display text-sm tracking-wider text-paper-dim hover:border-paper hover:text-paper transition-colors"
              style={{ borderColor: "var(--line-dark)" }}
            >
              양조장 더 보기
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
