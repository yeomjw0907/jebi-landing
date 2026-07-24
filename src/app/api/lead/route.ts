import { NextResponse } from "next/server";

/**
 * 리드 수집 API — 입점·제휴 문의 / 출시 소식 알림
 * Supabase REST(PostgREST)로 직접 INSERT. RLS는 anon INSERT-only로 제한되어 있어
 * 이 키로는 조회·수정·삭제가 불가능하다.
 */

const TYPES = ["stockist", "inquiry"] as const;
type LeadType = (typeof TYPES)[number];

interface LeadBody {
  type?: string;
  name?: string;
  contact?: string;
  message?: string;
  agree?: boolean;
  website?: string; // honeypot — 봇이 채우는 가짜 필드
}

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // honeypot: 숨김 필드가 채워져 있으면 봇으로 간주하고 조용히 성공 응답
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const type = TYPES.includes(body.type as LeadType) ? (body.type as LeadType) : null;
  const name = body.name?.trim().slice(0, 100);
  const contact = body.contact?.trim().slice(0, 200);
  const message = body.message?.trim().slice(0, 2000) || null;

  if (!type || !name || !contact) {
    return NextResponse.json(
      { error: "문의 유형, 성함(업체명), 연락처는 필수입니다." },
      { status: 400 }
    );
  }
  if (!body.agree) {
    return NextResponse.json(
      { error: "개인정보 수집·이용에 동의해 주세요." },
      { status: 400 }
    );
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "접수 시스템 점검 중입니다. 인스타그램 DM으로 문의해 주세요." },
      { status: 503 }
    );
  }

  const res = await fetch(`${url}/rest/v1/jebi_leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ type, name, contact, message }),
  });

  if (!res.ok) {
    console.error("lead insert failed:", res.status, await res.text());
    return NextResponse.json(
      { error: "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
