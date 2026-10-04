import { z } from "zod"

const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Format jam HH:mm")
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal yyyy-MM-dd")

export const medicationItemSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("medication"),
  drug: z.string().trim().min(1, "Nama obat wajib diisi"),
  dose: z.string().trim().min(1, "Dosis wajib diisi"),
  times: z.array(timeSchema).min(1, "Minimal satu jam minum"),
  durationDays: z.number().int().positive("Durasi harus lebih dari 0"),
  instruction: z.string().trim(),
  aiSuggested: z.boolean(),
})

export const dietItemSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("diet"),
  category: z.string().trim().min(1, "Kategori wajib diisi"),
  rule: z.enum(["avoid", "limit", "recommend"]),
  instruction: z.string().trim(),
  aiSuggested: z.boolean(),
})

export const activityItemSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("activity"),
  activity: z.string().trim().min(1, "Aktivitas wajib diisi"),
  frequencyPerWeek: z.number().int().positive(),
  durationMinutes: z.number().int().positive("Durasi harus lebih dari 0"),
  instruction: z.string().trim(),
  aiSuggested: z.boolean(),
})

export const restrictionItemSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("restriction"),
  subject: z.string().trim().min(1, "Subjek wajib diisi"),
  durationDays: z.number().int().positive().nullable(),
  instruction: z.string().trim(),
  aiSuggested: z.boolean(),
})

export const followUpItemSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("followUp"),
  date: dateSchema,
  instruction: z.string().trim(),
  aiSuggested: z.boolean(),
})

export const carePlanItemSchema = z.discriminatedUnion("kind", [
  medicationItemSchema,
  dietItemSchema,
  activityItemSchema,
  restrictionItemSchema,
  followUpItemSchema,
])
