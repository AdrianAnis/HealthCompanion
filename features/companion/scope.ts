import type { CompanionTopic, QuestionScope } from "@/features/companion/types"

const URGENT_KEYWORDS = [
  "nyeri dada",
  "dada sakit",
  "sesak napas",
  "sesak nafas",
  "sulit bernapas",
  "pingsan",
  "tidak sadar",
  "kejang",
  "pendarahan",
  "perdarahan",
  "muntah darah",
  "bab hitam",
  "lumpuh",
  "mati rasa",
  "bicara pelo",
  "wajah mencong",
  "stroke",
  "bunuh diri",
  "overdosis",
  "demam tinggi",
  "luka bernanah",
  "chest pain",
  "can't breathe",
]

const TOPIC_KEYWORDS: Record<Exclude<CompanionTopic, "general">, string[]> = {
  "missed-dose": ["lupa minum", "lupa obat", "terlewat", "kelewatan", "telat minum"],
  medication: ["obat", "minum", "dosis", "tablet", "pil", "efek samping", "jam berapa"],
  diet: ["makan", "makanan", "minuman", "diet", "pantangan", "boleh makan", "gula", "garam", "kopi", "buah", "sayur"],
  activity: ["olahraga", "jalan", "aktivitas", "senam", "angkat", "lari", "berenang", "kerja"],
  "follow-up": ["kontrol", "jadwal dokter", "periksa", "cek lab", "kunjungan", "follow up"],
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim()
}

export function detectTopic(question: string): CompanionTopic | null {
  const text = normalize(question)
  const topics = Object.keys(TOPIC_KEYWORDS) as Exclude<CompanionTopic, "general">[]
  return topics.find((topic) => TOPIC_KEYWORDS[topic].some((keyword) => text.includes(keyword))) ?? null
}

export function classifyQuestion(question: string): QuestionScope {
  const text = normalize(question)
  if (URGENT_KEYWORDS.some((keyword) => text.includes(keyword))) return "urgent"
  return detectTopic(text) ? "in-scope" : "out-of-scope"
}
