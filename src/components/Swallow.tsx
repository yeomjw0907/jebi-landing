// 제비 실루엣 — 라벨의 붓터치 제비를 SVG로 재현
export const SWALLOW_PATH =
  "M4 32 C18 20 34 22 45 34 C54 18 70 10 86 14 C76 22 68 30 63 40 C71 46 77 54 80 64 L66 56 C64 68 58 78 48 84 C52 74 52 64 48 56 C40 46 28 42 16 42 C11 40 6 36 4 32 Z";

export function Swallow({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d={SWALLOW_PATH} />
    </svg>
  );
}
