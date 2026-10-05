import type { CarePlanItem } from "@/features/care-plan/types"
import { daysFromToday, toDateKey } from "@/lib/date"
import { DEMO_DRAFT_PLAN_ID, mockCarePlans } from "@/mocks/care-plans"

export type AiDraftTemplate = {
  keywords: string[]
  items: CarePlanItem[]
}

const demoDraftItems = mockCarePlans.find((plan) => plan.id === DEMO_DRAFT_PLAN_ID)?.items ?? []

export const mockAiDraftTemplates: AiDraftTemplate[] = [
  {
    keywords: ["amlodipin", "10 mg"],
    items: demoDraftItems,
  },
  {
    keywords: ["amlodipin", "5 mg", "jalan kaki"],
    items: [
      { id: "tpl-m1", kind: "medication", drug: "Amlodipin", dose: "5 mg", times: ["07:00"], durationDays: 30, instruction: "Diminum setiap pagi setelah sarapan.", aiSuggested: true },
      { id: "tpl-d1", kind: "diet", category: "Makanan tinggi garam", rule: "avoid", instruction: "Ikan asin, mi instan, kerupuk, dan makanan kemasan.", aiSuggested: true },
      { id: "tpl-a1", kind: "activity", activity: "Jalan kaki", frequencyPerWeek: 5, durationMinutes: 30, instruction: "Jalan santai, hentikan bila pusing atau nyeri dada.", aiSuggested: true },
      { id: "tpl-f1", kind: "followUp", date: toDateKey(daysFromToday(14)), instruction: "Kontrol tekanan darah dua minggu lagi.", aiSuggested: true },
    ],
  },
]
