"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * 포스터(정지컷) 위에 비디오가 준비되면 페이드인.
 * 비디오 파일이 아직 없으면(404) 조용히 포스터만 유지 —
 * 힉스필드 영상이 도착하면 파일만 넣으면 자동 업그레이드된다.
 */
export function VideoLoop({
  src,
  poster,
  className,
  imgClassName,
}: {
  src: string;
  poster: string;
  className?: string;
  imgClassName?: string;
}) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName ?? ""}`}
      />
      {!failed && (
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          muted
          loop
          playsInline
          autoPlay
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
