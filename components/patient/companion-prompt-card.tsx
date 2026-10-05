import Link from "next/link"
import { MessageCircleHeart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { routes } from "@/lib/routes"

export function CompanionPromptCard() {
  return (
    <section className="rounded-3xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <MessageCircleHeart className="size-5" />
        </span>
        <div>
          <h2 className="type-subheading">Tanya Companion</h2>
          <p className="type-caption">Penjelasan mudah dari care plan kamu</p>
        </div>
      </div>
      <Button asChild className="mt-4 h-11 w-full text-base">
        <Link href={routes.patient.companion}>Mulai bertanya</Link>
      </Button>
    </section>
  )
}
