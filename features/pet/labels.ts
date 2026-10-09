import type { AchievementId, DayPart, PetKind } from "@/features/pet/types"

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

export const PET_KIND_LABEL: Record<PetKind, string> = {
  cat: "Kucing",
  dog: "Anjing",
}

export const PET_HAPPY_FACE_SRC: Record<PetKind, string> = {
  cat: "/grafis/face-happy-b.svg",
  dog: "/grafis/face-happy-a.svg",
}

export const PET_RUN_FRAMES: Record<PetKind, [string, string]> = {
  cat: ["/grafis/cat-walk-3.svg", "/grafis/cat-walk-4.svg"],
  dog: ["/grafis/cat-walk-1.svg", "/grafis/cat-walk-2.svg"],
}

export const PET_PEEK_FACE_SRC: Record<PetKind, string> = {
  cat: "/grafis/face-neutral-a.svg",
  dog: "/grafis/face-neutral-b.svg",
}
