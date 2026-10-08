"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { LayoutDashboard, LogOut, RotateCcw, Users, type LucideIcon } from "lucide-react"
import { toast } from "sonner"

import { BrandLogo } from "@/components/brand-logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/features/auth/store"
import { useDoctorContext } from "@/features/auth/use-doctor-context"
import { resetAllStores } from "@/lib/reset-demo"
import { routes } from "@/lib/routes"
import { cn } from "@/lib/utils"

type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { href: routes.hospital.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: routes.hospital.patientList, label: "Pasien", icon: Users },
]

function getInitials(name: string): string {
  return name
    .replace(/^dr\.\s*/i, "")
    .split(",")[0]
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2) ?? ""
}

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
      <div className="flex items-center border-b border-sidebar-border px-5 py-5">
        <BrandLogo caption="Clinician workspace" className="text-sidebar-foreground" />
      </div>

      <nav aria-label="Navigasi dokter" className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
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

      <div className="space-y-3 border-t border-sidebar-border p-4">
        <Button variant="ghost" className="h-10 w-full justify-start px-3 text-sidebar-foreground/75" onClick={handleResetDemo}>
          <RotateCcw />
          Reset demo
        </Button>
        <div className="flex items-center gap-3 px-1">
          <Avatar className="size-9">
            <AvatarFallback className="bg-sidebar-accent text-xs text-sidebar-accent-foreground">
              {doctor ? getInitials(doctor.name) : ""}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium">{doctor?.name}</p>
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
