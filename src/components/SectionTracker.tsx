"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/**
 * 섹션 노출/체류 추적 래퍼.
 * 섹션이 화면 중앙 밴드(상하 40% 제외한 가운데 20%)에 걸리면 "보고 있다"로 판단 —
 * 뷰포트보다 큰 섹션도 안정적으로 잡힌다.
 *
 *   section_view  — 최초 1회
 *   section_dwell — 섹션을 벗어날 때 1회, 1초 이상 머문 경우만 (후킹 포인트 판단용)
 */
export function SectionTracker({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const viewed = useRef(false);
  const dwellSent = useRef(false);
  const visibleSince = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSince.current = performance.now();
            if (!viewed.current) {
              viewed.current = true;
              track("section_view", { section_name: name });
            }
          } else if (visibleSince.current !== null) {
            const seconds =
              (performance.now() - visibleSince.current) / 1000;
            visibleSince.current = null;
            if (!dwellSent.current && seconds >= 1) {
              dwellSent.current = true;
              track("section_dwell", {
                section_name: name,
                dwell_seconds: Math.min(Math.round(seconds), 300),
              });
            }
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [name]);

  return (
    <div ref={ref} id={name} data-section={name}>
      {children}
    </div>
  );
}
