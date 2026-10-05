import type { Metadata } from "next"

import { PageHeader } from "@/components/hospital/page-header"

export const metadata: Metadata = { title: "Care plan baru" }

export default function NewCarePlanPage() {
  return <PageHeader title="Care plan baru" description="Builder care plan dikerjakan setelah alur pasien selesai." />
}
