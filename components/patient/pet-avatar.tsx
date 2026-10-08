import { PetDog } from "@/components/patient/pet-dog"
import { PetMascot } from "@/components/patient/pet-mascot"
import type { ConsistencyLevel, PetKind } from "@/features/pet/types"

type PetAvatarProps = {
  kind: PetKind
  level: ConsistencyLevel
  className?: string
}

export function PetAvatar({ kind, level, className }: PetAvatarProps) {
  return kind === "dog" ? <PetDog level={level} className={className} /> : <PetMascot level={level} className={className} />
}
