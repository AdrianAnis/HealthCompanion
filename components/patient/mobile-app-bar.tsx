"use client"

import Link from "next/link"
import { HeartHandshake } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { usePatientContext } from "@/features/patient/use-patient-context"
import { routes } from "@/lib/routes"

export function MobileAppBar() {
  const { patient } = usePatientContext()
  const initials = patient?.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-card/95 px-4 pt-[env(safe-area-inset-top)] backdrop-blur md:hidden">
      <Link href={routes.patient.today} className="flex items-center gap-2 font-bold text-primary">
        <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <HeartHandshake className="size-4" />
        </span>
        Health Companion
      </Link>
      <Link href={routes.patient.profile} aria-label="Buka profil">
        <Avatar>
          <AvatarFallback className="bg-primary/10 font-bold text-primary">{initials}</AvatarFallback>
        </Avatar>
      </Link>
    </header>
  )
}
