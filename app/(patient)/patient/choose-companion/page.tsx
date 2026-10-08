import type { Metadata } from "next"

import { ChooseCompanionView } from "@/components/patient/choose-companion-view"

export const metadata: Metadata = { title: "Pilih teman" }

export default function ChooseCompanionPage() {
  return <ChooseCompanionView />
}
