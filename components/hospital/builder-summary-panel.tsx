import { CheckCircle2, CircleAlert, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CARE_PLAN_ITEM_KIND_LABEL, CARE_PLAN_KIND_ORDER } from "@/features/care-plan/labels"
import type { CarePlanItemKind } from "@/features/care-plan/types"

type BuilderSummaryPanelProps = {
  versionLabel: string
  counts: Record<CarePlanItemKind, number>
  isValid: boolean
  hasPendingAiItems: boolean
  onSaveDraft: () => void
  onConfirm: () => void
}

export function BuilderSummaryPanel({ versionLabel, counts, isValid, hasPendingAiItems, onSaveDraft, onConfirm }: BuilderSummaryPanelProps) {
  return (
    <Card className="xl:sticky xl:top-4">
      <CardHeader>
        <CardTitle>Care plan {versionLabel}</CardTitle>
        <CardDescription>Ringkasan sebelum dikirim ke pasien.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="space-y-1.5 text-sm">
          {CARE_PLAN_KIND_ORDER.map((kind) => (
            <div key={kind} className="flex justify-between">
              <dt className="text-muted-foreground">{CARE_PLAN_ITEM_KIND_LABEL[kind]}</dt>
              <dd className="font-medium tabular-nums">{counts[kind]}</dd>
            </div>
          ))}
        </dl>

        <p className="flex items-start gap-2 rounded-md bg-muted p-3 text-sm">
          {isValid ? (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
          ) : (
            <CircleAlert className="mt-0.5 size-4 shrink-0 text-warning-foreground" />
          )}
          {isValid
            ? hasPendingAiItems
              ? "Valid. Masih ada item saran AI yang belum Anda tinjau."
              : "Semua isian valid dan siap dikonfirmasi."
            : "Lengkapi isian yang belum valid sebelum konfirmasi."}
        </p>

        <div className="flex flex-col gap-2">
          <Button type="button" disabled={!isValid} onClick={onConfirm}>
            Konfirmasi
          </Button>
          <Button type="button" variant="outline" onClick={onSaveDraft}>
            <Save />
            Simpan draft
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
