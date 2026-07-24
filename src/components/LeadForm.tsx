"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { track } from "@/lib/analytics";

const TYPE_OPTIONS = [
  { value: "stockist", label: "입점·제휴 문의", desc: "음식점·바틀샵·유통사" },
  { value: "inquiry", label: "구매·기타 문의", desc: "일반 구매, 행사, 기타" },
] as const;

type Status = "idle" | "sending" | "done" | "error";

export function LeadForm() {
  const [type, setType] = useState<string>("stockist");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setErrorMsg("");

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        name: data.get("name"),
        contact: data.get("contact"),
        message: data.get("message"),
        agree: data.get("agree") === "on",
        website: data.get("website"), // honeypot
      }),
    }).catch(() => null);

    if (res?.ok) {
      setStatus("done");
      track("lead_submit", { lead_type: type });
      form.reset();
    } else {
      setStatus("error");
      try {
        const j = await res?.json();
        setErrorMsg(j?.error ?? "");
      } catch {
        /* noop */
      }
    }
  }

  return (
    <section id="contact" className="relative bg-ink text-paper py-28 md:py-36 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 0%, rgba(201,144,46,0.07), transparent 70%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1 }}
        >
          <p className="font-latin tracking-[0.4em] text-[10px] md:text-xs text-amber mb-4 text-center">
            CONTACT — STOCKIST &amp; PARTNERSHIP
          </p>
          <h2 className="font-display text-3xl md:text-5xl leading-snug mb-4 text-center">
            제비를 들이고 싶다면
          </h2>
          <p className="text-paper-dim text-sm md:text-base font-light leading-relaxed mb-12 text-center">
            입점·제휴, 구매 문의를 남겨주시면 영업일 기준 2일 이내에 연락드립니다.
          </p>

          {status === "done" ? (
            <div
              className="border text-center py-16 px-8"
              style={{ borderColor: "var(--line-dark)" }}
            >
              <p className="font-display text-xl md:text-2xl mb-3 text-amber-2">
                접수되었습니다
              </p>
              <p className="text-paper-dim text-sm font-light">
                남겨주신 연락처로 곧 인사드리겠습니다. 감사합니다.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 문의 유형 */}
              <div className="grid grid-cols-2 gap-3">
                {TYPE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setType(opt.value)}
                    className={`border px-4 py-4 text-left transition-colors duration-200 ${
                      type === opt.value
                        ? "border-amber/70 bg-amber/10"
                        : "hover:border-paper/40"
                    }`}
                    style={type === opt.value ? {} : { borderColor: "var(--line-dark)" }}
                  >
                    <span className="block font-display text-sm md:text-base">
                      {opt.label}
                    </span>
                    <span className="block text-[11px] text-paper-dim mt-1 font-light">
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <label className="block">
                  <span className="font-latin text-[10px] tracking-[0.3em] text-paper-dim block mb-2">
                    NAME / COMPANY *
                  </span>
                  <input
                    name="name"
                    required
                    maxLength={100}
                    placeholder="성함 또는 업체명"
                    className="w-full bg-transparent border px-4 py-3 text-sm placeholder:text-paper-dim/50 focus:border-amber/70 focus:outline-none transition-colors"
                    style={{ borderColor: "var(--line-dark)" }}
                  />
                </label>
                <label className="block">
                  <span className="font-latin text-[10px] tracking-[0.3em] text-paper-dim block mb-2">
                    CONTACT *
                  </span>
                  <input
                    name="contact"
                    required
                    maxLength={200}
                    placeholder="이메일 또는 전화번호"
                    className="w-full bg-transparent border px-4 py-3 text-sm placeholder:text-paper-dim/50 focus:border-amber/70 focus:outline-none transition-colors"
                    style={{ borderColor: "var(--line-dark)" }}
                  />
                </label>
              </div>

              <label className="block">
                <span className="font-latin text-[10px] tracking-[0.3em] text-paper-dim block mb-2">
                  MESSAGE
                </span>
                <textarea
                  name="message"
                  rows={4}
                  maxLength={2000}
                  placeholder="문의 내용을 남겨주세요 (매장 위치, 취급 희망 수량 등)"
                  className="w-full bg-transparent border px-4 py-3 text-sm placeholder:text-paper-dim/50 focus:border-amber/70 focus:outline-none transition-colors resize-none"
                  style={{ borderColor: "var(--line-dark)" }}
                />
              </label>

              {/* honeypot — 사람에게는 보이지 않는 필드 */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
              />

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="agree" required className="mt-1 accent-[#c9902e]" />
                <span className="text-[11px] text-paper-dim font-light leading-relaxed">
                  개인정보 수집·이용에 동의합니다. 수집 항목(성함/업체명, 연락처, 문의
                  내용)은 문의 응대 목적으로만 이용하며, 응대 완료 후 1년 뒤 파기합니다.
                </span>
              </label>

              {status === "error" && (
                <p className="text-[12px] text-red-400/90">
                  {errorMsg || "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-amber text-ink py-4 font-display text-sm tracking-wider hover:bg-amber-2 transition-colors disabled:opacity-60"
              >
                {status === "sending" ? "접수 중…" : "문의 보내기"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
