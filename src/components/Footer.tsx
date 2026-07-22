"use client";

/* eslint-disable @next/next/no-img-element */
import { trackCta } from "@/lib/analytics";

export function Footer() {
  return (
    <footer
      className="relative bg-black text-paper border-t overflow-hidden"
      style={{ borderColor: "var(--line-dark)" }}
    >
      {/* 붓글씨 고스트 워터마크 */}
      <span
        aria-hidden
        className="font-brush absolute -right-6 -bottom-14 text-[11rem] md:text-[16rem] leading-none text-paper/[0.03] select-none pointer-events-none"
      >
        제비
      </span>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img src="/logo-white.png" alt="044 DISTILLERY" className="h-12 w-auto" />
              <div>
                <div className="font-display text-lg">공사사양조</div>
                <div className="font-latin text-[10px] tracking-[0.35em] text-paper-dim">
                  044 DISTILLERY
                </div>
              </div>
            </div>
            <p className="text-xs text-paper-dim leading-relaxed font-light">
              봄을 물고 온 증류주, 제비.
              <br />
              국내산 쌀과 밀, 조청의 결.
            </p>
          </div>

          {/* 연락처 */}
          <div className="text-xs text-paper-dim font-light leading-relaxed">
            <div className="font-latin text-[10px] tracking-[0.3em] text-paper/70 mb-4">
              CONTACT
            </div>
            <p>
              농업회사법인 주식회사 공사사양조
              <br />
              세종특별자치시 조치원읍 새내4길 3
              <br />
              고객상담 044-905-0440
            </p>
            <div className="flex gap-5 mt-4">
              <a
                href="https://044yangjo.com/"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackCta("yangjo_site", "044yangjo", "footer")}
                className="font-latin tracking-[0.2em] text-[11px] hover:text-amber-2 transition-colors"
              >
                044YANGJO.COM
              </a>
              <a
                href="https://www.instagram.com/sak_spirits_044"
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackCta("instagram_follow", "instagram", "footer")
                }
                className="font-latin tracking-[0.2em] text-[11px] hover:text-amber-2 transition-colors"
              >
                INSTAGRAM
              </a>
            </div>
          </div>

          {/* 제품 표기 */}
          <div className="text-xs text-paper-dim font-light leading-relaxed md:text-right">
            <div className="font-latin text-[10px] tracking-[0.3em] text-paper/70 mb-4">
              JEBI — GENERAL DISTILLED SPIRITS
            </div>
            <p>
              ABV 17% · 360ml
              <br />
              원재료 정제수, 증류원액(쌀·밀 : 국내산), 주정
              <br />
              품목보고번호 202400285774
              <br />
              보관 : 고온·냉동 및 직사광선을 피해 서늘한 곳에
            </p>
          </div>
        </div>

        <div
          className="mt-14 pt-8 border-t space-y-3"
          style={{ borderColor: "var(--line-dark)" }}
        >
          <p className="text-[11px] leading-relaxed text-paper-dim/80 font-light">
            경고 : 지나친 음주는 뇌졸중, 기억력 손상이나 치매를 유발합니다.
            임신 중 음주는 기형아 출생 위험을 높입니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <p className="text-[11px] font-medium text-paper/90">
              19세 미만 청소년에게 판매 금지
            </p>
            <p className="text-[11px] text-paper-dim/60 font-light">
              © 2026 GONGSASA BREWERY CO., LTD. — 부정불량식품 신고 국번없이 1399
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
