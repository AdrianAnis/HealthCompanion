"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, HeartHandshake, LineChart, LogOut, RotateCcw, UserRound } from "lucide-react"

import { PATIENT_NAV_ITEMS } from "@/components/patient/nav-items"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePatientActions } from "@/features/patient/use-patient-actions"
import { usePatientContext } from "@/features/patient/use-patient-context"
import { routes } from "@/lib/routes"
import { cn } from "@/lib/utils"

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
}

export function TopNav() {
  const pathname = usePathname()
  const { patient, activeDoctor } = usePatientContext()
  const { logout, resetDemo } = usePatientActions()

  return (
    <header className="fixed inset-x-0 top-0 z-40 hidden h-16 border-b bg-card/95 backdrop-blur md:block">
      <nav aria-label="Navigasi utama" className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-8">
        <Link href={routes.patient.today} className="flex items-center gap-2 font-semibold text-primary">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HeartHandshake className="size-5" />
          </span>
          Health Companion
        </Link>

        <ul className="flex h-full items-center gap-1">
          {PATIENT_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <li key={href} className="h-full">
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex h-full items-center gap-2 px-4 text-sm font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                  {isActive ? <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-t-full bg-primary" /> : null}
                </Link>
              </li>
            )
          })}
        </ul>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex min-h-11 items-center gap-3 rounded-full py-1 pr-2 pl-3 outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">
            <span className="text-sm font-medium">{patient?.name}</span>
            <Avatar>
              <AvatarFallback className="bg-primary/10 font-semibold text-primary">{patient ? getInitials(patient.name) : ""}</AvatarFallback>
            </Avatar>
            <ChevronDown className="size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">{patient?.name}</p>
              <p className="text-xs font-normal text-muted-foreground">{patient?.mrn}</p>
              {activeDoctor ? <p className="text-xs font-normal text-muted-foreground">{activeDoctor.hospital}</p> : null}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="min-h-11">
              <Link href={routes.patient.profile}>
                <UserRound />
                Lihat profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="min-h-11">
              <Link href={routes.patient.activity}>
                <LineChart />
                Aktivitas
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="min-h-11" onSelect={resetDemo}>
              <RotateCcw />
              Reset demo
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" className="min-h-11" onSelect={logout}>
              <LogOut />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  )
}
