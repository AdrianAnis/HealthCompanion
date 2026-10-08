import { Check } from "lucide-react"

import { PetAvatar } from "@/components/patient/pet-avatar"
import { PET_KIND_LABEL } from "@/features/pet/labels"
import type { PetKind } from "@/features/pet/types"
import { cn } from "@/lib/utils"

type CompanionChoiceProps = {
  value: PetKind
  onChange: (kind: PetKind) => void
}

const PET_KINDS: PetKind[] = ["cat", "dog"]

export function CompanionChoice({ value, onChange }: CompanionChoiceProps) {
  return (
    <div role="radiogroup" aria-label="Pilih teman" className="grid grid-cols-2 gap-4">
      {PET_KINDS.map((kind) => {
        const isSelected = kind === value
        return (
          <button
            key={kind}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(kind)}
            className={cn(
              "relative flex flex-col items-center gap-3 rounded-3xl bg-primary p-5 text-primary-foreground transition-all duration-300",
              isSelected ? "scale-100 ring-4 ring-primary/30 ring-offset-2" : "scale-95 opacity-70 hover:opacity-100",
            )}
          >
            {isSelected ? (
              <span className="absolute top-3 right-3 flex size-6 items-center justify-center rounded-full bg-primary-foreground text-primary">
                <Check className="size-4" />
              </span>
            ) : null}
            <span className="flex h-36 items-end">
              <PetAvatar kind={kind} level={4} className="h-36 w-auto" />
            </span>
            <span className="text-lg font-semibold">{PET_KIND_LABEL[kind]}</span>
          </button>
        )
      })}
    </div>
  )
}
