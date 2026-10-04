import type { CarePlan } from "@/features/care-plan/types"
import { daysFromToday, toDateKey } from "@/lib/date"

export const DEMO_DRAFT_PLAN_ID = "cp-001-v2"

export const mockCarePlans: CarePlan[] = [
  {
    id: "cp-001-v1",
    patientId: "p-001",
    version: 1,
    status: "active",
    sourceText: "Terapi awal hipertensi.",
    createdBy: "d-001",
    createdAt: daysFromToday(-30, "10:00"),
    confirmedAt: daysFromToday(-30, "09:00"),
    items: [
      { id: "cp-001-v1-m1", kind: "medication", drug: "Amlodipin", dose: "5 mg", times: ["07:00"], durationDays: 90, instruction: "Diminum setelah sarapan", aiSuggested: false },
      { id: "cp-001-v1-d1", kind: "diet", category: "Garam", rule: "limit", instruction: "Maksimal 1 sendok teh garam per hari.", aiSuggested: false },
      { id: "cp-001-v1-a1", kind: "activity", activity: "Jalan kaki pagi", frequencyPerWeek: 7, durationMinutes: 20, instruction: "Pagi hari", aiSuggested: false },
      { id: "cp-001-v1-f1", kind: "followUp", date: toDateKey(daysFromToday(30)), instruction: "Kontrol tekanan darah.", aiSuggested: false },
    ],
  },
  {
    id: DEMO_DRAFT_PLAN_ID,
    patientId: "p-001",
    version: 2,
    status: "draft",
    sourceText: "Tekanan darah masih tinggi, dosis amlodipin dinaikkan 10mg.",
    createdBy: "d-001",
    createdAt: daysFromToday(0, "09:30"),
    confirmedAt: null,
    items: [
      { id: "cp-001-v2-m1", kind: "medication", drug: "Amlodipin", dose: "10 mg", times: ["07:00"], durationDays: 90, instruction: "Diminum setelah sarapan", aiSuggested: false },
      { id: "cp-001-v2-d1", kind: "diet", category: "Ikan Asin", rule: "avoid", instruction: "Kandungan natrium sangat tinggi.", aiSuggested: true },
    ],
  },
  {
    id: "cp-002-v1",
    patientId: "p-002",
    version: 1,
    status: "active",
    sourceText: "Terapi awal diabetes.",
    createdBy: "d-001",
    createdAt: daysFromToday(-45, "08:40"),
    confirmedAt: daysFromToday(-45, "09:00"),
    items: [
      { id: "cp-002-v1-m1", kind: "medication", drug: "Metformin", dose: "500 mg", times: ["07:00", "13:00", "19:00"], durationDays: 90, instruction: "Diminum bersama makan", aiSuggested: false },
      { id: "cp-002-v1-d1", kind: "diet", category: "Minuman manis", rule: "avoid", instruction: "Teh manis, es jeruk, sirup.", aiSuggested: false },
      { id: "cp-002-v1-a1", kind: "activity", activity: "Jalan kaki sore", frequencyPerWeek: 7, durationMinutes: 30, instruction: "Bawa permen", aiSuggested: false },
    ],
  },
  {
    id: "cp-003-v1",
    patientId: "p-003",
    version: 1,
    status: "active",
    sourceText: "Pemulihan luka operasi apendektomi.",
    createdBy: "d-001",
    createdAt: daysFromToday(-3, "10:30"),
    confirmedAt: daysFromToday(-3, "10:45"),
    items: [
      { id: "cp-003-v1-m1", kind: "medication", drug: "Parasetamol", dose: "500 mg", times: ["07:00", "13:00", "19:00"], durationDays: 7, instruction: "Diminum setelah makan, boleh dilewati jika tidak nyeri", aiSuggested: false },
      { id: "cp-003-v1-r1", kind: "restriction", subject: "Angkat beban", durationDays: 30, instruction: "Hindari angkat beban lebih dari 5 kg", aiSuggested: false },
    ],
  },
]
