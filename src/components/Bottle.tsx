import { useId } from "react";
import { SWALLOW_PATH } from "./Swallow";

/**
 * 제비 소주병 — 투명 유리 + 은색 캡 + 먹색 라벨을 SVG로 재현.
 * 어두운 배경 위에서 유리의 하이라이트가 살아나도록 설계.
 */
export function Bottle({ className }: { className?: string }) {
  const uid = useId().replace(/[:]/g, "");
  const glass = `glass-${uid}`;
  const cap = `cap-${uid}`;
  const liquid = `liquid-${uid}`;
  const shine = `shine-${uid}`;

  return (
    <svg
      viewBox="0 0 220 640"
      className={className}
      aria-label="제비 360ml 병"
      role="img"
    >
      <defs>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="0.18" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.01" />
          <stop offset="0.82" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={cap} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6f6f6d" />
          <stop offset="0.2" stopColor="#d9d9d7" />
          <stop offset="0.45" stopColor="#f4f4f2" />
          <stop offset="0.7" stopColor="#b9b9b7" />
          <stop offset="1" stopColor="#5f5f5d" />
        </linearGradient>
        <linearGradient id={liquid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfe8ea" stopOpacity="0.10" />
          <stop offset="1" stopColor="#cfdadd" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id={shine} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 바닥 그림자 */}
      <ellipse cx="110" cy="616" rx="72" ry="10" fill="#000" opacity="0.5" />

      {/* 병 몸체 (유리) — 짧은 목, 완만한 어깨의 소주병 */}
      <path
        d="M92 88 L92 148 C92 186 54 202 54 246 L54 556 Q54 592 92 594 L128 594 Q166 592 166 556 L166 246 C166 202 128 186 128 148 L128 88 Z"
        fill={`url(#${glass})`}
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.4"
      />

      {/* 술 (액체) — 병목 아래부터 */}
      <path
        d="M95 152 L95 166 C95 196 58 210 58 248 L58 552 Q58 588 92 590 L128 590 Q162 588 162 552 L162 248 C162 210 125 196 125 166 L125 152 Z"
        fill={`url(#${liquid})`}
      />
      {/* 수면 라인 */}
      <ellipse
        cx="110"
        cy="150"
        rx="15"
        ry="3"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
      />

      {/* 유리 하이라이트 */}
      <rect x="65" y="260" width="7" height="280" rx="3.5" fill={`url(#${shine})`} opacity="0.5" />
      <rect x="151" y="270" width="3.5" height="250" rx="1.75" fill={`url(#${shine})`} opacity="0.35" />
      <rect x="96" y="95" width="4" height="90" rx="2" fill={`url(#${shine})`} opacity="0.5" />

      {/* 캡 */}
      <rect x="86" y="30" width="48" height="58" rx="4" fill={`url(#${cap})`} />
      <ellipse cx="110" cy="30" rx="24" ry="4.5" fill="#e8e8e6" />
      {[38, 46, 54, 62, 70, 78].map((y) => (
        <line
          key={y}
          x1="87"
          y1={y}
          x2="133"
          y2={y}
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="1"
        />
      ))}

      {/* 라벨 */}
      <g>
        <rect
          x="64"
          y="318"
          width="92"
          height="206"
          rx="2"
          fill="#0a0a0a"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="0.8"
        />
        {/* 제 */}
        <text
          x="88"
          y="392"
          textAnchor="middle"
          fill="#f2eddf"
          fontSize="46"
          style={{ fontFamily: "var(--font-nanum-brush)" }}
        >
          제
        </text>
        {/* 비 */}
        <text
          x="128"
          y="434"
          textAnchor="middle"
          fill="#f2eddf"
          fontSize="54"
          style={{ fontFamily: "var(--font-nanum-brush)" }}
        >
          비
        </text>
        {/* 제비 실루엣 */}
        <g transform="translate(70 428) scale(0.36)">
          <path d={SWALLOW_PATH} fill="#f2eddf" />
        </g>
        {/* 스펙 */}
        <text
          x="110"
          y="508"
          textAnchor="middle"
          fill="rgba(242,237,223,0.75)"
          fontSize="9"
          letterSpacing="1.5"
          style={{ fontFamily: "var(--font-marcellus)" }}
        >
          ABV 17% / 360ml
        </text>
      </g>
    </svg>
  );
}
