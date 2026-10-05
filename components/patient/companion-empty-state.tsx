import { MessageCircleHeart } from "lucide-react"

import { SUGGESTION_CARDS } from "@/features/companion/scenarios"

type CompanionEmptyStateProps = {
  firstName: string
  isDisabled: boolean
  onSelect: (question: string) => void
}

export function CompanionEmptyState({ firstName, isDisabled, onSelect }: CompanionEmptyStateProps) {
  return (
    <div className="flex flex-col items-center py-10 text-center md:py-16">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MessageCircleHeart className="size-7" />
      </span>
      <p className="mt-6 type-caption">Halo, {firstName}</p>
      <h1 className="mt-1 type-title">Ada yang bisa saya bantu?</h1>

      <ul className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 text-left lg:grid-cols-4">
        {SUGGESTION_CARDS.map((card) => (
          <li key={card.title}>
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(card.question)}
              className="flex h-full min-h-28 w-full flex-col gap-1 rounded-2xl border bg-card p-4 text-left transition-colors hover:bg-muted disabled:opacity-50"
            >
              <span className="type-subheading">{card.title}</span>
              <span className="type-caption">{card.description}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
