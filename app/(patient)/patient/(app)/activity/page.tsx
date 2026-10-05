import type { Metadata } from "next"

import { ActivityView } from "@/components/patient/activity-view"

export const metadata: Metadata = { title: "Aktivitas" }

export default function ActivityPage() {
  return <ActivityView />
}
