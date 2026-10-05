import { Badge } from "@/components/ui/badge"
import { HEALTH_HISTORY_TYPE_LABEL } from "@/features/patient/labels"
import type { HealthHistoryEntry } from "@/features/patient/types"
import { formatDate } from "@/lib/date"

type PatientHistoryTimelineProps = {
  entries: HealthHistoryEntry[]
}

export function PatientHistoryTimeline({ entries }: PatientHistoryTimelineProps) {
  if (entries.length === 0) return <p className="text-sm text-muted-foreground">Belum ada riwayat.</p>

  return (
    <ol className="space-y-4 border-l pl-4">
      {entries.map((entry) => (
        <li key={entry.id} className="relative">
          <span className="absolute top-1.5 -left-5 size-2 rounded-full bg-primary" aria-hidden="true" />
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{HEALTH_HISTORY_TYPE_LABEL[entry.type]}</Badge>
            <span className="text-xs text-muted-foreground">{formatDate(entry.date)}</span>
          </div>
          <p className="mt-1 text-sm font-medium">{entry.title}</p>
          {entry.value ? <p className="text-sm font-semibold text-primary">{entry.value}</p> : null}
          <p className="text-sm text-muted-foreground">{entry.notes}</p>
        </li>
      ))}
    </ol>
  )
}
