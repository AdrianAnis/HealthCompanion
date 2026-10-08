import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { PetKind } from "@/features/pet/types"

const PET_STORAGE_KEY = "hc:pet"
const DEFAULT_PET_KIND: PetKind = "cat"

type PetState = {
  kind: PetKind
  setKind: (kind: PetKind) => void
  resetDemo: () => void
}

export const usePetStore = create<PetState>()(
  persist(
    (set) => ({
      kind: DEFAULT_PET_KIND,
      setKind: (kind) => set({ kind }),
      resetDemo: () => set({ kind: DEFAULT_PET_KIND }),
    }),
    {
      name: PET_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ kind: state.kind }),
      skipHydration: true,
    },
  ),
)
