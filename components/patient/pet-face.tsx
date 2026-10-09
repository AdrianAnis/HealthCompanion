import Image from "next/image"

import { PET_HAPPY_FACE_SRC } from "@/features/pet/labels"
import type { PetKind } from "@/features/pet/types"
import { cn } from "@/lib/utils"

type PetFaceProps = {
  kind: PetKind
  className?: string
}

export function PetFace({ kind, className }: PetFaceProps) {
  return (
    <Image
      src={PET_HAPPY_FACE_SRC[kind]}
      alt=""
      width={96}
      height={96}
      unoptimized
      className={cn("shrink-0 rounded-full bg-primary object-contain p-1", className)}
    />
  )
}
