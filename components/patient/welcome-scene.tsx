"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

import { PetDog } from "@/components/patient/pet-dog"
import { PetMascot } from "@/components/patient/pet-mascot"
import { PetRobot } from "@/components/patient/pet-robot"
import { cn } from "@/lib/utils"

type SceneActor = "dog" | "cat" | "robot"

const HEARTS = [
  { position: "left-[40%] top-[38%]", delay: "[animation-delay:0s]" },
  { position: "left-[54%] top-[34%]", delay: "[animation-delay:1s]" },
  { position: "left-[47%] top-[42%]", delay: "[animation-delay:2s]" },
]

export function WelcomeScene() {
  const [jumpingActor, setJumpingActor] = useState<SceneActor | null>(null)

  function jumpClass(actor: SceneActor): string {
    return jumpingActor === actor ? "animate-[pet-jump_0.6s_ease-out] motion-reduce:animate-none" : ""
  }

  return (
    <div className="relative size-full">
      <button
        type="button"
        aria-label="Robot terbang"
        onClick={() => setJumpingActor("robot")}
        className="pet-pop-in absolute top-[4%] left-[34%] w-[30%] cursor-pointer [animation-delay:0.2s]"
      >
        <div className="pet-fly">
          <div className={jumpClass("robot")} onAnimationEnd={() => setJumpingActor(null)}>
            <PetRobot />
          </div>
        </div>
      </button>

      {HEARTS.map((heart) => (
        <Heart key={heart.position} className={cn("pet-heart absolute size-5 fill-destructive text-destructive opacity-0", heart.position, heart.delay)} aria-hidden="true" />
      ))}

      <span className="absolute inset-x-[4%] bottom-[2%] h-[9%] rounded-full bg-primary-foreground/10" aria-hidden="true" />
      <div className="absolute inset-x-[4%] bottom-[4%] flex items-end justify-center">
        <button
          type="button"
          aria-label="Anjing"
          onClick={() => setJumpingActor("dog")}
          className="pet-pop-in z-0 -mr-3 w-[44%] rotate-2 cursor-pointer [animation-delay:0.6s]"
        >
          <div className={jumpClass("dog")} onAnimationEnd={() => setJumpingActor(null)}>
            <PetDog className="pet-float" />
          </div>
        </button>
        <button
          type="button"
          aria-label="Kucing"
          onClick={() => setJumpingActor("cat")}
          className="pet-pop-in z-10 w-[42%] -rotate-2 cursor-pointer [animation-delay:0.9s]"
        >
          <div className={jumpClass("cat")} onAnimationEnd={() => setJumpingActor(null)}>
            <PetMascot level={4} />
          </div>
        </button>
      </div>
    </div>
  )
}
