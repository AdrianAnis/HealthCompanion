"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Activity, LayoutDashboard, LogOut, RotateCcw, Users, type LucideIcon } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/features/auth/store"
import { useDoctorContext } from "@/features/auth/use-doctor-context"
import { resetAllStores } from "@/lib/reset-demo"
import { routes } from "@/lib/routes"
import { cn, getInitials } from "@/lib/utils"

type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { href: routes.hospital.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: routes.hospital.patientList, label: "Pasien", icon: Users },
]


type SidebarContentProps = {
  onNavigate?: () => void
}

export function SidebarContent({ onNavigate }: SidebarContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { doctor } = useDoctorContext()
  const logout = useAuthStore((state) => state.logout)

  function handleLogout(): void {
    logout("doctor")
    router.replace(routes.hospital.login)
  }

  function handleResetDemo(): void {
    resetAllStores()
    toast.success("Data demo dikembalikan ke kondisi awal")
  }

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <span className="flex size-7 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
          <Activity className="size-4" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold">Health Companion</p>
          <p className="text-xs text-sidebar-foreground/60">Clinician workspace</p>
        </div>
      </div>

      <nav aria-label="Navigasi dokter" className="flex flex-1 flex-col gap-0.5 p-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
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

      <div className="space-y-2 border-t border-sidebar-border p-3">
        <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground/75" onClick={handleResetDemo}>
          <RotateCcw />
          Reset demo
        </Button>
        <div className="flex items-center gap-2.5">
          <Avatar className="size-8">
            <AvatarFallback className="bg-sidebar-accent text-xs text-sidebar-accent-foreground">
              {doctor ? getInitials(doctor.name) : ""}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium" title={doctor?.name}>{doctor?.name}</p>
            <p className="truncate text-xs text-sidebar-foreground/60">{doctor?.specialty}</p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Keluar" onClick={handleLogout}>
            <LogOut />
          </Button>
        </div>
      </div>
    </div>
  )
}
