"use client"

import Image from "next/image"

import { PET_PEEK_FACE_SRC } from "@/features/pet/labels"
import { usePetStore } from "@/features/pet/store"

export function PeekingPet() {
  const kind = usePetStore((state) => state.kind)

  return (
    <div className="pointer-events-none absolute right-4 bottom-0 w-28 md:right-10" aria-hidden="true">
      <div className="pet-peek-edge">
        <Image src={PET_PEEK_FACE_SRC[kind]} alt="" width={112} height={112} unoptimized className="pet-sway h-auto w-full origin-bottom" />
      </div>
    </div>
  )
}
