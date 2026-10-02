import { BottomNav } from "@/components/patient/bottom-nav"
import { cn } from "@/lib/utils"

type MobileShellProps = {
  children: React.ReactNode
  withNav?: boolean
  className?: string
}

export function MobileShell({ children, withNav = true, className }: MobileShellProps) {
  return (
    <div className="min-h-dvh bg-muted/60">
      <div
        className={cn(
          "relative mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background shadow-sm",
          withNav && "pb-20",
          className,
        )}
      >
        {children}
      </div>
      {withNav ? <BottomNav /> : null}
    </div>
  )
}

export function MobilePageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="px-5 pt-8 pb-4">
      <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
      {subtitle ? <p className="mt-1 text-muted-foreground">{subtitle}</p> : null}
    </header>
  )
}
