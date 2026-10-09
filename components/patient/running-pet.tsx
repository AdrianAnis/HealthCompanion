import Image from "next/image"

import { PET_RUN_FRAMES } from "@/features/pet/labels"
import type { PetKind } from "@/features/pet/types"

type RunningPetProps = {
  kind: PetKind
}

export function RunningPet({ kind }: RunningPetProps) {
  const [firstFrame, secondFrame] = PET_RUN_FRAMES[kind]

  return (
    <div className="pet-run absolute inset-x-[6%] bottom-[16%]">
      <div className="pet-gait relative">
        <Image src={firstFrame} alt="" width={160} height={140} unoptimized className="pet-frame-a h-auto w-full" />
        <Image src={secondFrame} alt="" width={160} height={140} unoptimized className="pet-frame-b absolute inset-x-0 bottom-0 h-auto w-full" />
      </div>
    </div>
  )
}
