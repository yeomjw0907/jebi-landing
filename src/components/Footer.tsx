
export function Footer() {
  return (
    <footer className="bg-black text-paper border-t" style={{ borderColor: "var(--line-dark)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <div className="flex items-center gap-4 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-white.png" alt="044 DISTILLERY" className="h-12 w-auto" />
              <div>
                <div className="font-display text-lg">공사사양조</div>
                <div className="font-latin text-[10px] tracking-[0.35em] text-paper-dim">
                  044 DISTILLERY
                </div>
              </div>
            </div>
            <p className="text-xs text-paper-dim leading-relaxed font-light max-w-sm">
              농업회사법인 주식회사 공사사양조
              <br />
              세종특별자치시 조치원읍 새내4길 3
              <br />
              고객상담 044-905-0440 · 품목보고번호 202400285774
            </p>
          </div>

          <div className="text-xs text-paper-dim font-light space-y-2 md:text-right">
            <p className="font-latin tracking-[0.25em]">
              JEBI — GENERAL DISTILLED SPIRITS
            </p>
            <p>ABV 17% · 360ml · 원재료 정제수, 증류원액(쌀·밀 : 국내산), 주정</p>
            <p>보관 : 고온·냉동 및 직사광선을 피해 서늘한 곳에</p>
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
