"use client"

import { ClipboardX } from "lucide-react"

import { CompanionPromptCard } from "@/components/patient/companion-prompt-card"
import { DietGuideCard } from "@/components/patient/diet-guide-card"
import { EmptyState } from "@/components/patient/empty-state"
import { FollowUpCard } from "@/components/patient/follow-up-card"
import { NextReminderCard } from "@/components/patient/next-reminder-card"
import { PageSkeleton } from "@/components/patient/page-skeleton"
import { PlanUpdateBanner } from "@/components/patient/plan-update-banner"
import { ReminderTimeline } from "@/components/patient/reminder-timeline"
import { TodayHeader } from "@/components/patient/today-header"
import { selectItemsByKind, selectNextFollowUp } from "@/features/care-plan/selectors"
import { useFeedbackStore } from "@/features/feedback/store"
import { selectFirstName, selectHonorific } from "@/features/patient/selectors"
import { usePatientContext } from "@/features/patient/use-patient-context"
import {
  getTodayReminders,
  selectDailyProgress,
  selectNextReminder,
  selectReminderViews,
} from "@/features/reminder/selectors"
import { toDateKey } from "@/lib/date"
import { useNow } from "@/lib/use-now"

export function TodayView() {
  const { isHydrated, patient, activePlan, activeDoctor } = usePatientContext()
  const completions = useFeedbackStore((state) => state.completions)
  const toggleCompletion = useFeedbackStore((state) => state.toggleCompletion)
  const now = useNow()

  if (!isHydrated || !patient) return <PageSkeleton />

  const reminders = selectReminderViews(getTodayReminders(activePlan, now), completions, now)
  const progress = selectDailyProgress(reminders)

  return (
    <div className="space-y-6">
      <TodayHeader
        now={now}
        honorific={selectHonorific(patient)}
        firstName={selectFirstName(patient)}
        done={progress.done}
        total={progress.total}
      />
      <PlanUpdateBanner />
      {activePlan ? (
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="min-w-0 space-y-6 lg:col-span-7 xl:col-span-8">
            <NextReminderCard reminder={selectNextReminder(reminders)} total={reminders.length} onToggle={toggleCompletion} />
            <section className="space-y-3">
              <h2 className="text-xl font-bold">Jadwal hari ini</h2>
              <ReminderTimeline reminders={reminders} onToggle={toggleCompletion} />
            </section>
          </div>
          <aside className="min-w-0 space-y-6 lg:col-span-5 xl:col-span-4">
            <CompanionPromptCard />
            <DietGuideCard items={selectItemsByKind(activePlan, "diet")} />
            <FollowUpCard followUp={selectNextFollowUp(activePlan, toDateKey(now))} doctor={activeDoctor} />
          </aside>
        </div>
      ) : (
        <EmptyState
          icon={ClipboardX}
          title="Belum ada care plan aktif"
          description="Jadwal obat dan aktivitas akan muncul di sini setelah dokter mengonfirmasi care plan kamu."
        />
      )}
    </div>
  )
}
