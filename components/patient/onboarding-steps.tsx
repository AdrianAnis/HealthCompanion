"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { HeartHandshake } from "lucide-react"

import { Button } from "@/components/ui/button"
import { routes } from "@/lib/routes"
import { cn } from "@/lib/utils"

type OnboardingStep = {
  image: string
  title: string
  description: string
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    image: "/step-1.svg",
    title: "Selamat datang di aplikasi Health Companion!",
    description: "Platform pendamping harian untuk membantu Anda merencanakan pemulihan dan aktivitas dengan lebih aman.",
  },
  {
    image: "/step-2.svg",
    title: "Rencanakan dan taklukkan jadwal Anda",
    description: "Health Companion membantu Anda merencanakan, mempersiapkan, dan memantau kepatuhan dalam satu aplikasi.",
  },
  {
    image: "/step-3.svg",
    title: "Terhubung dengan dokter secara langsung",
    description: "Health Companion menyinkronkan data kesehatan Anda langsung dengan rumah sakit secara real-time.",
  },
]

const LAST_STEP_INDEX = ONBOARDING_STEPS.length - 1

type StepIndicatorProps = {
  activeIndex: number
  className?: string
}

function StepIndicator({ activeIndex, className }: StepIndicatorProps) {
  return (
    <div className={cn("flex gap-2", className)} aria-hidden="true">
      {ONBOARDING_STEPS.map((step, index) => (
        <span
          key={step.title}
          className={cn("h-2 flex-1 rounded-full transition-all duration-300", index <= activeIndex ? "bg-primary" : "bg-primary/20")}
        />
      ))}
    </div>
  )
}

export function OnboardingSteps() {
  const router = useRouter()
  const [stepIndex, setStepIndex] = useState(0)
  const step = ONBOARDING_STEPS[stepIndex] ?? ONBOARDING_STEPS[0]

  if (!step) return null

  function handleNext(): void {
    if (stepIndex < LAST_STEP_INDEX) setStepIndex(stepIndex + 1)
    else router.push(routes.patient.login)
  }

  function handleBack(): void {
    setStepIndex(Math.max(0, stepIndex - 1))
  }

  return (
    <div className="flex min-h-dvh flex-col bg-card">
      <header className="border-b bg-card/90 px-6 py-4 backdrop-blur md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="flex items-center gap-2 type-heading tracking-tight text-primary">
            <HeartHandshake className="size-6" />
            Health Companion
          </span>
          <StepIndicator activeIndex={stepIndex} className="hidden w-64 md:flex" />
        </div>
      </header>

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-10">
        <div className="pointer-events-none absolute top-0 right-0 size-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-10 md:flex-row md:gap-24">
          <div className="flex w-full flex-1 items-center justify-center">
            <Image
              key={step.image}
              src={step.image}
              alt=""
              width={400}
              height={400}
              unoptimized
              priority
              className="aspect-square w-full max-w-72 animate-float object-contain duration-700 animate-in fade-in slide-in-from-left-8 md:max-w-md"
            />
          </div>

          <div className="flex w-full max-w-md flex-1 flex-col text-center md:text-left">
            <h1 key={step.title} className="mb-4 type-display duration-700 animate-in fade-in slide-in-from-right-8">
              {step.title}
            </h1>
            <p className="mb-10 text-base leading-relaxed text-muted-foreground md:text-lg">{step.description}</p>

            <div className="mx-auto flex w-full max-w-sm flex-col gap-3 md:mx-0">
              <Button size="lg" className="h-14 w-full rounded-full text-base font-semibold shadow-xl shadow-primary/25" onClick={handleNext}>
                {stepIndex === LAST_STEP_INDEX ? "Mulai" : "Lanjut"}
              </Button>
              <Button variant="ghost" size="lg" className={cn("h-12 w-full rounded-full text-muted-foreground", stepIndex === 0 && "invisible")} onClick={handleBack}>
                Kembali
              </Button>
            </div>

            <StepIndicator activeIndex={stepIndex} className="mt-8 px-12 md:hidden" />
          </div>
        </div>
      </main>
    </div>
  )
}
