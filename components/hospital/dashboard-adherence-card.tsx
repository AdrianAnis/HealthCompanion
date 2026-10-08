import Link from "next/link"

import { routes } from "@/lib/routes"

export type AdherenceRow = {
  patientId: string
  name: string
  ratio: number | null
}

type DashboardAdherenceCardProps = {
  rows: AdherenceRow[]
}

export function DashboardAdherenceCard({ rows }: DashboardAdherenceCardProps) {
  return (
    <section className="rounded-2xl border bg-card">
      <header className="border-b px-5 py-4">
        <h2 className="type-subheading">Jadwal ditandai pasien</h2>
        <p className="type-caption">7 hari terakhir. Data perilaku, bukan indikator kesembuhan.</p>
      </header>
      <ul className="divide-y">
        {rows.map((row) => {
          const percentage = row.ratio === null ? 0 : Math.round(row.ratio * 100)
          return (
            <li key={row.patientId} className="space-y-2 px-5 py-4">
              <div className="flex items-baseline justify-between gap-3">
                <Link href={routes.hospital.monitoring(row.patientId)} className="text-sm font-medium hover:text-primary">
                  {row.name}
                </Link>
                <span className="text-sm text-muted-foreground tabular-nums">{row.ratio === null ? "Belum ada data" : `${percentage}%`}</span>
              </div>
              <div
                role="progressbar"
                aria-label={`Jadwal ditandai ${row.name}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percentage}
                className="h-1.5 overflow-hidden rounded-full bg-muted"
              >
                <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
