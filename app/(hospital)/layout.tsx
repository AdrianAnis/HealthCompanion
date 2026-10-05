import type { Metadata } from "next"
import { Poppins } from "next/font/google"

import "../globals.css"

import { StoreSync } from "@/components/store-sync"
import { Toaster } from "@/components/ui/sonner"

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: {
    default: "Health Companion for Clinicians",
    template: "%s · HC Clinician",
  },
  description: "Care plan workspace for doctors: build, confirm, and monitor patient care plans.",
}

export default function HospitalRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="theme-hospital min-h-dvh">
        <StoreSync />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
