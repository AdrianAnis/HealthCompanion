import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { MobilePageHeader } from "@/components/patient/mobile-shell"

export const metadata: Metadata = { title: "Detail rencana" }

export default async function CarePlanItemPage({ params }: PageProps<"/patient/care-plan/[itemId]">) {
  const { itemId } = await params

  return (
    <>
      <Link href="/patient/care-plan" className="flex items-center gap-1 px-4 pt-6 font-semibold text-primary">
        <ChevronLeft className="size-5" />
        Rencana Perawatan
      </Link>
      <MobilePageHeader title="Detail rencana" subtitle={`Item ${itemId}`} />
      <div className="px-5">
        <p className="rounded-2xl border border-dashed bg-card p-5 text-muted-foreground">
          TODO: detail item (cara minum, alasan, peringatan) dan tombol tanya Teman Sehat.
        </p>
      </div>
    </>
  )
}
