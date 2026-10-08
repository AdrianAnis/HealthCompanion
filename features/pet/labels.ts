import type { AchievementId, DayPart, PetMood } from "@/features/pet/types"

export const PET_MOOD_MESSAGE: Record<PetMood, string> = {
  happy: "Semua jadwal hari ini sudah kamu tandai. Mantap!",
  neutral: "Aku temani kamu menjalankan jadwal hari ini.",
  sleepy: "Sudah malam. Istirahat yang cukup ya.",
}

export const ACHIEVEMENT_COPY: Record<AchievementId, { title: string; description: string }> = {
  "first-complete-day": {
    title: "Hari lengkap pertama",
    description: "Semua jadwal dalam satu hari sudah kamu tandai.",
  },
  "three-day-streak": {
    title: "Tiga hari beruntun",
    description: "Tiga hari berturut-turut dengan jadwal lengkap.",
  },
  "steady-week": {
    title: "Seminggu konsisten",
    description: "Lebih dari 80% jadwal ditandai dalam 7 hari terakhir.",
  },
}

export const ROBOT_IMAGE_BY_DAY_PART: Record<DayPart, string> = {
  morning: "/grafis/robot-morning.svg",
  day: "/grafis/robot-companion.svg",
  night: "/grafis/robot-night.svg",
}
