import { NextResponse } from "next/server";
import {submitLead} from "@/lib/jebi-runtime";

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

  const requestId=request.headers.get('Idempotency-Key')||crypto.randomUUID();
  if(!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(requestId))return NextResponse.json({error:'접수 요청을 확인해주세요.'},{status:400});
  try{await submitLead(requestId,{type,name,contact,message});}
  catch(e){if(e instanceof Error&&e.message==='idempotency conflict')return NextResponse.json({error:'문의 내용이 변경되었습니다. 다시 확인해주세요.'},{status:409});console.error('lead intake unavailable');return NextResponse.json({error:'접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'},{status:502});}
  return NextResponse.json({ok:true});
}
