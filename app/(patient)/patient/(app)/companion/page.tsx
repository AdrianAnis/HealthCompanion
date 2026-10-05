import type { Metadata } from "next"

import { CompanionView } from "@/components/patient/companion-view"

export const metadata: Metadata = { title: "Companion" }

export default function CompanionPage() {
  return <CompanionView />
}
