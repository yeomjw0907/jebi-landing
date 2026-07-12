"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GA_ID, PIXEL_ID, initAnalytics } from "@/lib/analytics";

/**
 * GA4 + Meta Pixel 로더.
 * 큐 스텁과 config는 initAnalytics()(및 각 track 호출)가 JS로 즉시 만들고,
 * 여기서는 실제 라이브러리만 늦게 로드한다. ID가 없는 환경(로컬 개발 등)
 * 에서는 아무것도 싣지 않는다. ID는 .env의 NEXT_PUBLIC_GA_ID /
 * NEXT_PUBLIC_META_PIXEL_ID 로 주입.
 */
export function Analytics() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <>
      {GA_ID && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
      )}

      {PIXEL_ID && (
        <>
          <Script
            src="https://connect.facebook.net/en_US/fbevents.js"
            strategy="afterInteractive"
          />
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
    </>
  );
}
