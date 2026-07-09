"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export function Specs() {
  return (
    <section className="relative bg-paper text-ink py-28 md:py-40 overflow-hidden">
      {/* 한지 위 은은한 얼룩 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 85% 10%, rgba(201,144,46,0.10), transparent 70%), radial-gradient(ellipse 50% 40% at 5% 90%, rgba(13,12,10,0.05), transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <motion.div {...fadeUp} transition={{ duration: 1 }}>
          <p className="font-latin tracking-[0.4em] text-[10px] md:text-xs text-amber mb-4">
            SPECIFICATIONS
          </p>
          <h2 className="font-display text-3xl md:text-5xl leading-snug mb-16 md:mb-24">
            숫자로 읽는 <span className="font-brush text-4xl md:text-6xl">제비</span>
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 border-t border-l"
          style={{ borderColor: "var(--line-paper)" }}
        >
          {[
            {
              big: <CountUp to={17} suffix="%" />,
              label: "알코올 도수",
              sub: "증류주의 깊이는 지키고, 부담은 덜어낸 도수",
            },
            {
              big: <CountUp to={360} />,
              label: "용량 (ml)",
              sub: "식탁 위에 익숙하게 놓이는 한 병",
            },
            {
              big: "2026.04",
              label: "출시",
              sub: "봄, 제비가 돌아오는 계절에 맞춰",
            },
            {
              big: "044",
              label: "세종 조치원",
              sub: "공사사양조 — 지역번호를 이름에 새긴 양조장",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              {...fadeUp}
              transition={{ duration: 0.9, delay: i * 0.12 }}
              className="border-r border-b p-6 md:p-10 group hover:bg-ink hover:text-paper transition-colors duration-500"
              style={{ borderColor: "var(--line-paper)" }}
            >
              <div className="font-display text-4xl md:text-6xl mb-6 text-amber group-hover:text-amber-2 transition-colors">
                {item.big}
              </div>
              <div className="font-display text-sm md:text-base mb-2">
                {item.label}
              </div>
              <p className="text-xs md:text-sm opacity-60 leading-relaxed font-light">
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 text-xs md:text-sm opacity-50 font-light"
        >
          식품유형 일반증류주 · 원재료 정제수, 일반증류주 원액(쌀·밀 : 국내산), 주정
        </motion.p>
      </div>
    </section>
  );
}
