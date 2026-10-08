import { Flame, Lock, Trophy } from "lucide-react"

import { PetMascot } from "@/components/patient/pet-mascot"
import { RingOrnament } from "@/components/ring-ornament"
import { ACHIEVEMENT_COPY, PET_MOOD_MESSAGE } from "@/features/pet/labels"
import type { Achievement, ConsistencyLevel, PetMood } from "@/features/pet/types"
import { cn } from "@/lib/utils"

type PetCardProps = {
  mood: PetMood
  level: ConsistencyLevel
  streak: number
  achievements: Achievement[]
}

export function PetCard({ mood, level, streak, achievements }: PetCardProps) {
  return (
    <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      <div className="relative flex items-center gap-5 overflow-hidden bg-primary p-6">
        <RingOrnament />
        <div className="relative w-28 shrink-0 rounded-3xl bg-primary-foreground/15 p-4 backdrop-blur-sm">
          <PetMascot level={level} />
        </div>
        <div className="relative min-w-0 space-y-2">
          <h2 className="text-xl leading-snug font-semibold text-primary-foreground">Teman kamu</h2>
          <p className="text-sm leading-normal text-primary-foreground">{PET_MOOD_MESSAGE[mood]}</p>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/20 px-3 py-1 text-xs font-medium text-primary-foreground">
            <Flame className="size-3.5" />
            {streak} hari beruntun
          </p>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <h3 className="type-subheading">Pencapaian</h3>
        <ul className="space-y-3">
          {achievements.map((achievement) => {
            const copy = ACHIEVEMENT_COPY[achievement.id]
            const Icon = achievement.isUnlocked ? Trophy : Lock
            return (
              <li key={achievement.id} className="flex items-start gap-3">
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-xl",
                    achievement.isUnlocked ? "bg-success/15 text-success" : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <div className={cn("min-w-0", !achievement.isUnlocked && "opacity-60")}>
                  <p className="type-body font-medium">{copy.title}</p>
                  <p className="type-caption">{copy.description}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
