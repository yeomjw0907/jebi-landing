"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

const src = (i: number) => `/turntable/f${String(i).padStart(3, "0")}.webp`;

/**
 * 스크롤 스크럽 턴테이블 — 스크롤 진행도에 따라 병 회전 프레임을 넘긴다.
 * 프레임 로드 전(또는 실패 시)에는 정지 컷아웃을 보여준다.
 */
export function BottleTurntable({
  progress,
  frameCount,
  className,
}: {
  progress: MotionValue<number>;
  frameCount: number;
  className?: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const lastIdxRef = useRef(-1);
  const [ready, setReady] = useState(false);

  // 프레임 프리로드
  useEffect(() => {
    let alive = true;
    let loaded = 0;
    let failed = false;
    const imgs = Array.from({ length: frameCount }, (_, i) => {
      const im = new window.Image();
      im.onload = () => {
        loaded += 1;
        if (alive && !failed && loaded >= frameCount) setReady(true);
      };
      im.onerror = () => {
        failed = true; // 프레임이 없으면 정지 컷아웃 유지
      };
      im.src = src(i);
      return im;
    });
    return () => {
      alive = false;
      imgs.forEach((im) => (im.onload = im.onerror = null));
    };
  }, [frameCount]);

  useMotionValueEvent(progress, "change", (v) => {
    if (!ready || !imgRef.current) return;
    const idx = Math.max(0, Math.min(frameCount - 1, Math.round(v * (frameCount - 1))));
    if (idx === lastIdxRef.current) return;
    lastIdxRef.current = idx;
    imgRef.current.src = src(idx);
  });

  return (
    <img
      ref={imgRef}
      src={ready ? src(0) : "/bottle-cutout.png"}
      alt="제비 360ml 병"
      className={className}
      draggable={false}
    />
  );
}
