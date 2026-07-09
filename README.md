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
