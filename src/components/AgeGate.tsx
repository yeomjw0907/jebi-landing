"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Swallow } from "./Swallow";

const KEY = "jebi-age-verified";

export function AgeGate() {
  const [open, setOpen] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY) !== "1") setOpen(true);
  }, []);

  const confirm = () => {
    sessionStorage.setItem(KEY, "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          role="dialog"
          aria-modal="true"
          aria-label="성인 인증"
        >
          {/* 다크 무드샷 배경 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/jebi-dark.png"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover blur-md scale-110 brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-ink/70" />
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ y: -20, opacity: 0 }}
            className="relative max-w-md w-full text-center border border-white/10 bg-black/70 backdrop-blur-sm px-8 py-12"
          >
            {/* 라벨 모서리 장식 */}
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
            <Swallow className="w-10 h-10 text-amber mx-auto mb-6" />
            <p className="font-latin tracking-[0.4em] text-[10px] text-paper-dim mb-3">
              044 DISTILLERY
            </p>
            <h2 className="font-display text-2xl mb-3">
              만 19세 이상이신가요?
            </h2>
            <p className="text-xs text-paper-dim font-light leading-relaxed mb-10">
              이 페이지는 주류 정보를 담고 있습니다.
              <br />
              19세 미만 청소년에게는 판매하지 않습니다.
            </p>

            {denied ? (
              <p className="text-sm text-amber-2 font-light">
                아직 만날 수 없어요. 봄이 오면 다시 찾아와 주세요. 🐦
              </p>
            ) : (
              <div className="flex gap-3 justify-center">
                <button
                  onClick={confirm}
                  className="bg-amber text-ink px-8 py-3 font-display text-sm tracking-wider hover:bg-amber-2 transition-colors cursor-pointer"
                >
                  네, 성인입니다
                </button>
                <button
                  onClick={() => setDenied(true)}
                  className="border border-white/20 px-8 py-3 font-display text-sm tracking-wider text-paper-dim hover:border-white/50 transition-colors cursor-pointer"
                >
                  아니요
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
