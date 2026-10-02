import { MobileShell } from "@/components/patient/mobile-shell"

export default function PatientAppLayout({ children }: { children: React.ReactNode }) {
  return <MobileShell>{children}</MobileShell>
}
