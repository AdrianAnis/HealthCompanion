import { OUT_OF_SCOPE_MESSAGE } from "@/features/companion/scenarios"
import type { ChatMessage } from "@/features/companion/types"
import { daysFromToday } from "@/lib/date"

export const mockCompanionThreads: Record<string, ChatMessage[]> = {
  "p-003": [
    {
      id: "msg-seed-p-003-q1",
      role: "patient",
      content: "Boleh minum jamu atau suplemen herbal biar lukanya cepat sembuh?",
      createdAt: daysFromToday(-1, "20:10"),
      scope: "out-of-scope",
      source: null,
      isReported: false,
    },
    {
      id: "msg-seed-p-003-a1",
      role: "companion",
      content: OUT_OF_SCOPE_MESSAGE,
      createdAt: daysFromToday(-1, "20:10"),
      scope: "out-of-scope",
      source: null,
      isReported: false,
    },
  ],
}
