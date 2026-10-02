import { z } from "zod"

const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Format jam HH:mm")

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal yyyy-MM-dd")

export const medicationItemSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("medication"),
  drug: z.string().trim().min(1, "Nama obat wajib diisi"),
  dose: z.string().trim().min(1, "Dosis wajib diisi"),
  frequency: z.string().trim().min(1, "Frekuensi wajib diisi"),
  times: z.array(timeSchema).min(1, "Minimal satu jam minum"),
  durationDays: z.number().int().positive("Durasi harus lebih dari 0"),
  instructions: z.string().trim().optional(),
})

export const dietItemSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("diet"),
  category: z.string().trim().min(1, "Kategori wajib diisi"),
  type: z.enum(["avoid", "limit", "recommend"]),
  notes: z.string().trim(),
})

export const activityItemSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("activity"),
  activity: z.string().trim().min(1, "Aktivitas wajib diisi"),
  frequency: z.enum(["daily", "3x-weekly", "weekly"]),
  durationMinutes: z.number().int().positive("Durasi harus lebih dari 0"),
  time: timeSchema,
  restriction: z.string().trim().optional(),
})

export const followUpItemSchema = z.object({
  id: z.string().min(1),
  kind: z.literal("followUp"),
  date: dateSchema,
  notes: z.string().trim(),
})

export const carePlanItemSchema = z.discriminatedUnion("kind", [
  medicationItemSchema,
  dietItemSchema,
  activityItemSchema,
  followUpItemSchema,
])

export const carePlanDraftSchema = z.object({
  patientId: z.string().min(1),
  summary: z.string().trim().optional(),
  items: z.array(carePlanItemSchema).min(1, "Rencana perawatan minimal berisi satu item"),
})

export type CarePlanItemInput = z.infer<typeof carePlanItemSchema>

export type CarePlanDraftInput = z.infer<typeof carePlanDraftSchema>
