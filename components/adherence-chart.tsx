"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import type { AdherenceDay } from "@/features/reminder/selectors"
import { formatDate } from "@/lib/date"

type AdherenceChartProps = {
  days: AdherenceDay[]
}

type AdherenceTooltipProps = {
  active?: boolean
  payload?: { payload: AdherenceDay }[]
}

function AdherenceTooltip({ active, payload }: AdherenceTooltipProps) {
  const day = payload?.[0]?.payload
  if (!active || !day) return null
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md">
      <p className="font-semibold">{formatDate(day.date, "EEEE, d MMM")}</p>
      <p>
        {day.done} dari {day.total} jadwal ditandai
      </p>
    </div>
  )
}

export function AdherenceChart({ days }: AdherenceChartProps) {
  const data = days.map((day) => ({ ...day, label: formatDate(day.date, "EEE") }))

  return (
    <div className="h-64 w-full" role="img" aria-label="Grafik jadwal yang ditandai selesai selama 7 hari terakhir">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -24 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} stroke="var(--muted-foreground)" />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} stroke="var(--muted-foreground)" />
          <Tooltip content={<AdherenceTooltip />} cursor={{ fill: "var(--muted)" }} />
          <Bar dataKey="total" name="Dijadwalkan" fill="var(--border)" radius={4} />
          <Bar dataKey="done" name="Ditandai" fill="var(--chart-1)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
