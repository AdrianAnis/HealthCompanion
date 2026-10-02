"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ClipboardList, House, LineChart, MessageCircleHeart, UserRound } from "lucide-react"

import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/patient/today", label: "Hari Ini", icon: House },
  { href: "/patient/care-plan", label: "Rencana", icon: ClipboardList },
  { href: "/patient/companion", label: "Teman", icon: MessageCircleHeart },
  { href: "/patient/activity", label: "Aktivitas", icon: LineChart },
  { href: "/patient/profile", label: "Profil", icon: UserRound },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <ul className="grid grid-cols-5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-semibold transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className={cn("rounded-full px-4 py-1 transition-colors", active && "bg-primary/12")}>
                  <Icon className="size-5" strokeWidth={active ? 2.4 : 2} />
                </span>
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
