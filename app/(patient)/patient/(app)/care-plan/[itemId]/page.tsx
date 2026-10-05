import type { Metadata } from "next"

import { CarePlanItemView } from "@/components/patient/care-plan-item-view"

export const metadata: Metadata = { title: "Detail Instruksi" }

export default async function CarePlanItemPage({ params }: PageProps<"/patient/care-plan/[itemId]">) {
  const { itemId } = await params
  return <CarePlanItemView itemId={itemId} />
}
