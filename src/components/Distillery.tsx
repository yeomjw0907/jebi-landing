"use client";

import { motion } from "framer-motion";

export function Distillery() {
  return (
    <section className="bg-ink text-paper py-28 md:py-40 relative overflow-hidden">
      {/* 창살 그림자 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "repeating-linear-gradient(65deg, transparent 0 160px, rgba(0,0,0,0.6) 160px 230px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 20% 20%, rgba(201,144,46,0.08), transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1 }}
        >
          <p className="font-latin tracking-[0.4em] text-[10px] md:text-xs text-amber mb-4">
            THE DISTILLERY
          </p>
          <h2 className="font-display text-3xl md:text-5xl leading-snug mb-8">
            공사사양조,
            <br />
            세종 조치원에서
          </h2>
          <div className="space-y-5 text-paper-dim text-sm md:text-base leading-relaxed font-light">
            <p>
              공사사양조(044 DISTILLERY)는 세종특별자치시 조치원읍의
              농업회사법인 양조장입니다. 지역번호 044를 이름에 새기고, 지역의
              쌀과 밀로 술을 빚습니다.
            </p>
            <p>
              대표 브랜드 <span className="text-amber-2">삭(SAK)</span>은 청주
              효모를 활용한 프리미엄 증류주 라인입니다. 제비는 그 결을 이어받아
              — 더 가볍게, 더 자주 — 일상의 식탁으로 내려앉은 술입니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="https://044yangjo.com/"
              target="_blank"
              rel="noreferrer"
              className="border border-amber/60 text-amber-2 px-6 py-3 font-latin text-xs tracking-[0.25em] hover:bg-amber hover:text-ink transition-colors duration-300"
            >
              044YANGJO.COM
            </a>
            <a
              href="https://www.instagram.com/sak_spirits_044"
              target="_blank"
              rel="noreferrer"
              className="border px-6 py-3 font-latin text-xs tracking-[0.25em] text-paper-dim hover:border-paper hover:text-paper transition-colors duration-300"
              style={{ borderColor: "var(--line-dark)" }}
            >
              INSTAGRAM @SAK_SPIRITS_044
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2 }}
          className="relative flex items-center justify-center"
        >
          {/* 실제 라벨 원화 */}
          <div className="relative bg-black border border-white/10 w-64 md:w-80 aspect-[3/4] flex flex-col items-center justify-center p-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/label-front.png"
              alt="제비 라벨 붓글씨 원화"
              className="w-44 md:w-56 h-auto"
            />
            <span className="font-latin text-[10px] tracking-[0.3em] text-paper-dim mt-8">
              ABV 17% / 360ml
            </span>
            {/* 모서리 장식 */}
            {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map(
              (pos) => (
                <div
                  key={pos}
                  className={`absolute ${pos} w-2 h-2 border-amber/60`}
                  style={{
                    borderTopWidth: pos.includes("top") ? 1 : 0,
                    borderBottomWidth: pos.includes("bottom") ? 1 : 0,
                    borderLeftWidth: pos.includes("left") ? 1 : 0,
                    borderRightWidth: pos.includes("right") ? 1 : 0,
                  }}
                />
              )
            )}
          </div>
          {/* 후광 */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,144,46,0.12), transparent 70%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
