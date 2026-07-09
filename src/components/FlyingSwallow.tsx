"use client";

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Swallow } from "./Swallow";

/**
 * 페이지 전체 스크롤에 맞춰 화면을 가로질러 나는 제비.
 * 물결치듯 두 번 왕복하며, 방향에 따라 좌우가 뒤집힌다.
 */
export function FlyingSwallow() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const x = useTransform(
    p,
    [0, 0.18, 0.38, 0.55, 0.75, 0.92, 1],
    ["-12vw", "30vw", "108vw", "70vw", "-12vw", "40vw", "112vw"]
  );
  const y = useTransform(
    p,
    [0, 0.18, 0.38, 0.55, 0.75, 0.92, 1],
    ["18vh", "9vh", "22vh", "12vh", "26vh", "8vh", "16vh"]
  );
  // 이동 방향에 맞춰 뒤집기
  const scaleX = useTransform(
    p,
    [0, 0.38, 0.381, 0.75, 0.751, 1],
    [1, 1, -1, -1, 1, 1]
  );
  const opacity = useTransform(p, [0, 0.05, 0.95, 1], [0, 0.8, 0.8, 0]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-40 pointer-events-none text-paper/70 mix-blend-difference"
      style={{ x, y, opacity }}
    >
      <motion.div
        style={{ scaleX }}
        animate={{ y: [0, -6, 0, 4, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Swallow className="w-8 h-8 md:w-11 md:h-11 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]" />
      </motion.div>
    </motion.div>
  );
}
