import Image from "next/image"

import { SUGGESTION_CARDS } from "@/features/companion/scenarios"
import { ROBOT_IMAGE_BY_DAY_PART } from "@/features/pet/labels"
import { selectDayPart } from "@/features/pet/selectors"
import { useNow } from "@/lib/use-now"

type CompanionEmptyStateProps = {
  firstName: string
  isDisabled: boolean
  onSelect: (question: string) => void
}

export function CompanionEmptyState({ firstName, isDisabled, onSelect }: CompanionEmptyStateProps) {
  const now = useNow()

  return (
    <div className="flex flex-col items-center py-10 text-center md:py-16">
      <span className="flex size-32 items-center justify-center rounded-full bg-primary md:size-40">
        <Image
          src={ROBOT_IMAGE_BY_DAY_PART[selectDayPart(now)]}
          alt=""
          width={112}
          height={112}
          unoptimized
          className="pet-float size-24 object-contain md:size-28"
        />
      </span>
      <p className="mt-4 type-caption">Halo, {firstName}</p>
      <h1 className="mt-1 type-title">Ada yang bisa saya bantu?</h1>

      <ul className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 text-left lg:grid-cols-4">
        {SUGGESTION_CARDS.map((card) => (
          <li key={card.title}>
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(card.question)}
              className="flex h-full min-h-24 w-full flex-col gap-1.5 rounded-2xl border bg-card p-4 text-left transition-colors hover:bg-muted disabled:opacity-50"
            >
              <span className="text-sm font-semibold text-foreground">{card.title}</span>
              <span className="text-xs leading-relaxed text-muted-foreground">{card.description}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
