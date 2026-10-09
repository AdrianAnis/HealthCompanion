"use client"

import { useState } from "react"

import { PetRobot } from "@/components/patient/pet-robot"
import { cn } from "@/lib/utils"

type WavingRobotProps = {
  className?: string
}

export function WavingRobot({ className }: WavingRobotProps) {
  const [isJumping, setIsJumping] = useState(false)

  return (
    <button
      type="button"
      aria-label="Sapa robot"
      onClick={() => setIsJumping(true)}
      onAnimationEnd={(event) => (event.target === event.currentTarget ? setIsJumping(false) : undefined)}
      className={cn("cursor-pointer", isJumping && "animate-[pet-jump_0.6s_ease-out] motion-reduce:animate-none", className)}
    >
      <PetRobot className="pet-float" />
    </button>
  )
}
