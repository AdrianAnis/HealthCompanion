"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, LayoutDashboard, LogOut, Users } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuthStore } from "@/features/auth/store"
import { cn } from "@/lib/utils"
import { DEMO_DOCTOR_ID, mockDoctors } from "@/mocks/patients"

const NAV_ITEMS = [
  { href: "/hospital/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/hospital/patients", label: "Pasien", icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()
  const doctorId = useAuthStore((state) => state.doctor?.doctorId ?? DEMO_DOCTOR_ID)
  const logout = useAuthStore((state) => state.logout)
  const doctor = mockDoctors.find((item) => item.id === doctorId)
  const initials = (doctor?.name ?? "")
    .replace(/^dr\.\s*/i, "")
    .split(",")[0]
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)

  return (
    <aside className="sticky top-0 flex h-dvh w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex size-7 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
          <Activity className="size-4" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold">Health Companion</p>
          <p className="text-xs text-sidebar-foreground/60">Clinician workspace</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center gap-2.5 border-t border-sidebar-border p-3">
        <Avatar className="size-8">
          <AvatarFallback className="bg-sidebar-accent text-xs text-sidebar-accent-foreground">{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-medium">{doctor?.name}</p>
          <p className="truncate text-xs text-sidebar-foreground/60">{doctor?.specialty}</p>
        </div>
        <Link
          href="/hospital/login"
          onClick={() => logout("doctor")}
          aria-label="Keluar"
          className="rounded-md p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="size-4" />
        </Link>
      </div>
    </aside>
  )
}
