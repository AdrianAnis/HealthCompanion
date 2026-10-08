import { History, LineChart, PawPrint, UserRound, type LucideIcon } from "lucide-react"

export type ProfileSectionValue = "data" | "teman" | "aktivitas" | "riwayat"

export type ProfileSection = {
  value: ProfileSectionValue
  label: string
  icon: LucideIcon
}

export const PROFILE_SECTIONS: ProfileSection[] = [
  { value: "data", label: "Data diri", icon: UserRound },
  { value: "teman", label: "Teman kamu", icon: PawPrint },
  { value: "aktivitas", label: "Aktivitas", icon: LineChart },
  { value: "riwayat", label: "Riwayat care plan", icon: History },
]

export const DEFAULT_PROFILE_SECTION: ProfileSectionValue = "data"
