"use client";

import { motion } from "framer-motion";
import { Swallow } from "./Swallow";

const SERVES = [
  {
    latin: "NEAT — 차게, 그대로",
    title: "스트레이트",
    desc: "냉장고에서 꺼내 잔에 그대로. 조청이 남긴 은은한 단맛과 곡물의 향이 가장 또렷하게 열립니다.",
    ratio: [{ label: "제비", parts: 1, filled: true }],
    chips: ["4°C 차게", "소주잔", "담백한 한식"],
    glass: (
      /* 소주잔 */
      <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20" aria-hidden>
        <path
          d="M22 20 L26 62 Q27 68 33 68 L47 68 Q53 68 54 62 L58 20 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M25.5 34 L54.5 34 L53 50 L27 50 Z" fill="currentColor" opacity="0.15" />
        <line x1="26" y1="34" x2="54" y2="34" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    latin: "HIGHBALL — 가볍게, 길게",
    title: "제비 하이볼",
    desc: "제비 1에 탄산수 3, 얼음 가득, 레몬 한 조각. 17도의 부드러움이 탄산을 만나 더 가벼워집니다.",
    ratio: [
      { label: "제비", parts: 1, filled: true },
      { label: "탄산수", parts: 3, filled: false },
    ],
    chips: ["얼음 가득", "하이볼 잔", "레몬 한 조각"],
    glass: (
      /* 하이볼 잔 */
      <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20" aria-hidden>
        <path
          d="M26 10 L26 64 Q26 70 32 70 L48 70 Q54 70 54 64 L54 10 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M28 26 L52 26 L52 62 Q52 66 48 66 L32 66 Q28 66 28 62 Z" fill="currentColor" opacity="0.15" />
        <circle cx="35" cy="34" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <circle cx="45" cy="46" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <circle cx="37" cy="57" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <line x1="28" y1="26" x2="52" y2="26" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

function RatioBar({ ratio }: { ratio: (typeof SERVES)[number]["ratio"] }) {
  const total = ratio.reduce((s, r) => s + r.parts, 0);
  return (
    <div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full">
        {ratio.map((r, i) =>
          Array.from({ length: r.parts }).map((_, j) => (
            <motion.div
              key={`${i}-${j}`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + (i * 2 + j) * 0.12 }}
              className={`h-full origin-left border-r-2 border-paper-2 last:border-r-0 ${
                r.filled ? "bg-amber" : "bg-ink/15"
              }`}
              style={{ width: `${100 / total}%` }}
            />
          ))
        )}
      </div>
      <div className="mt-2 flex justify-between font-latin text-[10px] tracking-[0.2em] text-ink/50">
        {ratio.map((r) => (
          <span key={r.label}>
            {r.label} {r.parts}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Serve() {
  return (
    <section className="bg-paper-2 text-ink py-28 md:py-40 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-24 flex items-end justify-between gap-8"
        >
          <div>
            <p className="font-latin tracking-[0.4em] text-[10px] md:text-xs text-amber mb-4">
              HOW TO SERVE
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-snug">
              마시는 법은
              <br />두 가지면 충분합니다
            </h2>
          </div>
          <Swallow className="w-14 h-14 md:w-20 md:h-20 text-ink/20 shrink-0 -scale-x-100" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {SERVES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative bg-paper border p-8 md:p-12 overflow-hidden"
              style={{ borderColor: "var(--line-paper)" }}
            >
              {/* hover 시 호박색 워시 */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber/0 to-amber/0 group-hover:from-amber/10 group-hover:to-transparent transition-all duration-700" />
              {/* hover 시 제비가 카드 위를 가로지른다 */}
              <div className="absolute top-6 -left-16 group-hover:left-[calc(100%+2rem)] transition-all duration-[1400ms] ease-in-out text-amber/60">
                <Swallow className="w-10 h-10" />
              </div>

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="text-amber mb-8 drop-shadow-sm">{s.glass}</div>
                  <span className="font-brush text-3xl text-ink/15 group-hover:text-amber/50 transition-colors">
                    {i === 0 ? "壹" : "貳"}
                  </span>
                </div>
                <p className="font-latin tracking-[0.3em] text-[10px] text-ink/50 mb-3">
                  {s.latin}
                </p>
                <h3 className="font-display text-2xl md:text-3xl mb-5">{s.title}</h3>
                <p className="text-sm md:text-base leading-relaxed opacity-70 font-light mb-8">
                  {s.desc}
                </p>

                <RatioBar ratio={s.ratio} />

                <div className="mt-7 flex flex-wrap gap-2">
                  {s.chips.map((c) => (
                    <span
                      key={c}
                      className="border px-3 py-1.5 text-[11px] md:text-xs text-ink/70 group-hover:border-amber/50 transition-colors"
                      style={{ borderColor: "var(--line-paper)" }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
