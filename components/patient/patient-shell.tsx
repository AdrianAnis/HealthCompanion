import { BottomNav } from "@/components/patient/bottom-nav"
import { MobileAppBar } from "@/components/patient/mobile-app-bar"
import { PatientSessionGate } from "@/components/patient/patient-session-gate"
import { PlanUpdateToast } from "@/components/patient/plan-update-toast"
import { TopNav } from "@/components/patient/top-nav"

type PatientShellProps = {
  children: React.ReactNode
}

export function PatientShell({ children }: PatientShellProps) {
  return (
    <div className="min-h-dvh bg-background">
      <TopNav />
      <MobileAppBar />
      <PlanUpdateToast />
      <main className="mx-auto w-full max-w-6xl px-4 pt-5 pb-24 md:px-8 md:pt-24 md:pb-10">
        <PatientSessionGate>{children}</PatientSessionGate>
      </main>
      <BottomNav />
    </div>
  )
}
