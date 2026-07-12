/**
 * GA4 + Meta Pixel 공용 트래킹 헬퍼.
 * 컴포넌트에서는 이 파일의 함수만 호출한다 — gtag/fbq를 직접 만지지 않는다.
 *
 * 로딩 전략: gtag/fbq의 "큐 스텁"을 첫 호출 시점에 JS로 직접 만들고
 * (js → config → event 순서 보장), 실제 라이브러리는 <Analytics/>가
 * afterInteractive로 늦게 로드한다. 라이브러리가 도착하면 큐를 순서대로
 * 처리하므로 하이드레이션 직후 발사되는 age_gate_view 같은 초기 이벤트도
 * 유실되지 않는다.
 *
 * 이벤트 설계 (퍼널 순서):
 *   age_gate_view → age_gate_confirm / age_gate_deny
 *   section_view  { section_name }        — 섹션 최초 노출
 *   section_dwell { section_name, dwell_seconds } — 후킹 판단용 체류시간
 *   chapter_view  { chapter } / story_complete    — ScrollStage 진행
 *   cta_click     { cta_name, destination, section } — 전환(키 이벤트)
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type Params = Record<string, string | number | boolean | undefined>;

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** gtag 큐 스텁 생성 — 라이브러리 로드 전에도 이벤트가 큐에 쌓인다 */
function ensureGtag(): ((...args: unknown[]) => void) | null {
  if (typeof window === "undefined" || !GA_ID) return null;
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js는 배열이 아니라 arguments 객체를 기대한다
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }
  return window.gtag;
}

/** fbq 큐 스텁 생성 (Meta 공식 스니펫과 동일한 동작) */
function ensureFbq(): Fbq | null {
  if (typeof window === "undefined" || !PIXEL_ID) return null;
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
  }
  return window.fbq;
}

/** <Analytics/>가 마운트 시 호출 — 이벤트가 없어도 config/PageView는 보장 */
export function initAnalytics() {
  ensureGtag();
  ensureFbq();
}

/** GA4 이벤트 전송 (미설정 환경에서는 조용히 무시) */
export function track(event: string, params?: Params) {
  ensureGtag()?.("event", event, params);
}

/** Meta Pixel 표준 이벤트 */
function pixelTrack(event: string, params?: Params) {
  ensureFbq()?.("track", event, params);
}

/** Meta Pixel 커스텀 이벤트 */
function pixelTrackCustom(event: string, params?: Params) {
  ensureFbq()?.("trackCustom", event, params);
}

/**
 * CTA 클릭 — GA4 cta_click + Meta Pixel 매핑을 한 번에 발사.
 * cta_name 별 픽셀 매핑:
 *   store             → InitiateCheckout (추후 스토어 링크용, 광고 최적화 신호)
 *   instagram_follow  → Lead
 *   그 외             → trackCustom CtaClick
 */
export function trackCta(
  ctaName: string,
  destination: string,
  section: string
) {
  track("cta_click", {
    cta_name: ctaName,
    destination,
    section,
  });

  if (ctaName === "store") {
    pixelTrack("InitiateCheckout", { content_name: "jebi" });
  } else if (ctaName === "instagram_follow") {
    pixelTrack("Lead", { content_name: "instagram_follow" });
  } else {
    pixelTrackCustom("CtaClick", { cta_name: ctaName, section });
  }
}

/** 성인 인증 게이트 — 광고 유입 후 첫 이탈 지점 측정 */
export function trackAgeGate(action: "view" | "confirm" | "deny") {
  track(`age_gate_${action}`);
  if (action === "confirm") {
    // 게이트 통과 = 실질적 랜딩 성공, 픽셀에도 신호를 준다
    pixelTrack("ViewContent", { content_name: "jebi_landing" });
  }
}
