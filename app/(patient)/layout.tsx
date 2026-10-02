import type { Metadata, Viewport } from "next"
import { Nunito } from "next/font/google"

import "../globals.css"

import { StoreSync } from "@/components/store-sync"
import { Toaster } from "@/components/ui/sonner"

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Health Companion",
    template: "%s · Health Companion",
  },
  description: "Teman pemulihan Anda: pengingat obat, anjuran makan, dan aktivitas sesuai rencana dokter.",
}

export const viewport: Viewport = {
  themeColor: "#f6efe4",
  width: "device-width",
  initialScale: 1,
}

export default function PatientRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={nunito.variable}>
      <body className="theme-patient min-h-dvh">
        <StoreSync />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
