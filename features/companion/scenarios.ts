import { getItemsByKind, getNextFollowUp } from "@/features/care-plan/selectors"
import type { CarePlan, DietType } from "@/features/care-plan/types"
import { classifyQuestion, detectTopic } from "@/features/companion/scope"
import type { CompanionAnswer, CompanionTopic } from "@/features/companion/types"
import { formatDate, todayKey } from "@/lib/date"

export const URGENT_MESSAGE =
  "Keluhan yang Anda sebutkan bisa menjadi tanda kondisi darurat. Segera hubungi 119 atau datang ke IGD terdekat. Tim dokter Anda juga sudah kami beri tahu."

export const OUT_OF_SCOPE_MESSAGE =
  "Maaf, pertanyaan ini di luar rencana perawatan Anda, jadi saya tidak bisa menjawabnya. Silakan tanyakan langsung ke dokter Anda saat kontrol, atau hubungi rumah sakit."

export const NO_PLAN_MESSAGE =
  "Belum ada rencana perawatan aktif dari dokter Anda. Setelah dokter mengonfirmasi rencana, saya bisa membantu menjawab pertanyaan seputar obat, makanan, dan aktivitas."

const DIET_LABEL: Record<DietType, string> = {
  avoid: "Hindari",
  limit: "Batasi",
  recommend: "Dianjurkan",
}

function answerMedication(plan: CarePlan): string {
  const items = getItemsByKind(plan, "medication")
  if (items.length === 0) return "Rencana perawatan Anda saat ini tidak berisi obat."
  const lines = items.map(
    (item) => `• ${item.drug} ${item.dose}, ${item.frequency} (jam ${item.times.join(", ")})${item.instructions ? ` — ${item.instructions}` : ""}`,
  )
  return ["Obat Anda sesuai rencana perawatan terbaru:", ...lines].join("\n")
}

function answerMissedDose(plan: CarePlan): string {
  const names = getItemsByKind(plan, "medication").map((item) => item.drug).join(", ")
  return [
    `Jika Anda lupa minum obat (${names || "sesuai rencana"}):`,
    "• Minum segera saat ingat, kecuali sudah dekat dengan jadwal berikutnya.",
    "• Jangan menggandakan dosis untuk mengganti dosis yang terlewat.",
    "• Tandai di halaman Hari Ini agar dokter bisa memantau.",
  ].join("\n")
}

function answerDiet(plan: CarePlan): string {
  const items = getItemsByKind(plan, "diet")
  if (items.length === 0) return "Dokter belum menetapkan anjuran makanan khusus untuk Anda."
  const lines = items.map((item) => `• ${DIET_LABEL[item.type]}: ${item.category}${item.notes ? ` — ${item.notes}` : ""}`)
  return ["Anjuran makanan dari dokter Anda:", ...lines].join("\n")
}

function answerActivity(plan: CarePlan): string {
  const items = getItemsByKind(plan, "activity")
  if (items.length === 0) return "Dokter belum menetapkan aktivitas khusus untuk Anda."
  const lines = items.map(
    (item) => `• ${item.activity}, ${item.durationMinutes} menit (jam ${item.time})${item.restriction ? ` — Perhatian: ${item.restriction}` : ""}`,
  )
  return ["Aktivitas yang dianjurkan:", ...lines].join("\n")
}

function answerFollowUp(plan: CarePlan): string {
  const next = getNextFollowUp(plan, todayKey())
  if (!next) return "Belum ada jadwal kontrol berikutnya di rencana perawatan Anda."
  return `Jadwal kontrol berikutnya: ${formatDate(next.date, "EEEE, d MMMM yyyy")}. ${next.notes}`
}

const TOPIC_ANSWERS: Record<CompanionTopic, (plan: CarePlan) => string> = {
  medication: answerMedication,
  "missed-dose": answerMissedDose,
  diet: answerDiet,
  activity: answerActivity,
  "follow-up": answerFollowUp,
  general: answerMedication,
}

export function answerQuestion(question: string, activePlan: CarePlan | undefined): CompanionAnswer {
  const scope = classifyQuestion(question)

  if (scope === "urgent") return { scope, topic: "general", content: URGENT_MESSAGE, escalated: true }
  if (scope === "out-of-scope") return { scope, topic: "general", content: OUT_OF_SCOPE_MESSAGE, escalated: true }

  const topic = detectTopic(question) ?? "general"
  if (!activePlan) return { scope, topic, content: NO_PLAN_MESSAGE, escalated: false }

  return { scope, topic, content: TOPIC_ANSWERS[topic](activePlan), escalated: false }
}

export const SUGGESTED_QUESTIONS = [
  "Obat apa saja yang harus saya minum hari ini?",
  "Saya lupa minum obat pagi, harus bagaimana?",
  "Makanan apa yang harus saya hindari?",
  "Olahraga apa yang boleh saya lakukan?",
  "Kapan jadwal kontrol berikutnya?",
]
