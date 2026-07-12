# 제비 (JEBI) — 공사사양조 랜딩페이지

> 봄을 물고 온 증류주. 공사사양조(044 DISTILLERY)의 신제품 **제비** 프로모션 랜딩페이지.

![ABV 17%](https://img.shields.io/badge/ABV-17%25-c9902e) ![360ml](https://img.shields.io/badge/Volume-360ml-0d0c0a) ![2026.04](https://img.shields.io/badge/Launch-2026.04-f2eddf)

## 컨셉

**"먹과 한지 (Ink & Rice Paper)"** — 깊은 먹색 바탕 위 붓글씨 캘리그래피, 은은한 호박색 액센트. 화려하지만 정갈한 에디토리얼 무드.

- 스크롤에 맞춰 병이 좌우로 여행하는 420vh 스티키 스테이지 (3개 챕터)
- 페이지 전체를 가로질러 나는 제비 (스크롤 연동, `mix-blend-difference`)
- SVG로 재현한 소주병 + 먹색 라벨 + 제비 실루엣
- 필름 그레인 오버레이, 창살 사선 그림자, 마퀴
- 성인 인증 게이트 (만 19세)
- `prefers-reduced-motion` 대응

## 기술 스택

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** — CSS 변수 기반 디자인 토큰
- **Framer Motion 12** — `useScroll` / `useTransform` 스크롤 연출
- 폰트: Song Myung(명조 디스플레이) · Nanum Brush Script(붓글씨) · Noto Serif KR(본문) · Marcellus(라틴 캡션)

## 실행

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 프로덕션 빌드
```

## 트래킹 (GA4 + Meta Pixel)

메타 광고 → 랜딩 → 구매(스토어 링크) 퍼널 분석용. `.env`에 ID를 넣으면 활성화된다:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX        # GA4 측정 ID
NEXT_PUBLIC_META_PIXEL_ID=            # Meta Pixel ID
```

| 이벤트 | 발생 시점 | 용도 |
|--------|----------|------|
| `age_gate_view` / `age_gate_confirm` / `age_gate_deny` | 성인 인증 게이트 | 광고 유입 후 첫 이탈 지점 |
| `section_view` `{section_name}` | 섹션이 화면 중앙에 진입 (최초 1회) | 섹션별 도달률 → 이탈 위치 |
| `section_dwell` `{section_name, dwell_seconds}` | 섹션 이탈 시 (1초 이상 머문 경우) | 후킹 포인트 판단 |
| `chapter_view` `{chapter}` / `story_complete` | 스크롤 스테이지 챕터 도달 | 스토리 완주율 |
| `cta_click` `{cta_name, destination, section}` | CTA 클릭 | **전환 — GA4 키 이벤트로 지정할 것** |

- 픽셀 매핑: 게이트 통과 → `ViewContent`, 인스타 클릭 → `Lead`, 스토어 클릭(`cta_name: "store"`) → `InitiateCheckout`
- 스토어 링크 추가 시: `trackCta("store", "스토어명", "섹션명")` 호출하면 픽셀 매핑까지 자동
- GA4 쪽 설정: 관리 > 키 이벤트에 `cta_click` 등록, 탐색 > 유입경로 탐색으로 `age_gate_confirm → section_view → cta_click` 퍼널 구성
- 광고 URL에는 UTM 필수: `?utm_source=meta&utm_medium=paid_social&utm_campaign=...`

## 제품 정보

| 항목 | 내용 |
|------|------|
| 제품명 | 제비 (일반증류주) |
| 도수/용량 | 17% / 360ml |
| 원재료 | 정제수, 일반증류주 원액(쌀·밀: 국내산), 주정 |
| 제조 | 농업회사법인 (주)공사사양조 — 세종특별자치시 조치원읍 |
| 링크 | [044yangjo.com](https://044yangjo.com/) · [@sak_spirits_044](https://www.instagram.com/sak_spirits_044) |

---

*지나친 음주는 뇌졸중, 기억력 손상이나 치매를 유발합니다. 19세 미만 청소년에게 판매 금지.*
