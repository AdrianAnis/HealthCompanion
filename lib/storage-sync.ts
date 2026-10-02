"use client"

import { useEffect, useSyncExternalStore } from "react"

import { useAuthStore } from "@/features/auth/store"
import { useCarePlanStore } from "@/features/care-plan/store"
import { useCompanionStore } from "@/features/companion/store"
import { useFeedbackStore } from "@/features/feedback/store"
import { usePatientStore } from "@/features/patient/store"

type PersistedStore = {
  persist: {
    getOptions: () => { name?: string }
    rehydrate: () => Promise<void> | void
    hasHydrated: () => boolean
    onFinishHydration: (listener: () => void) => () => void
  }
}

export const persistedStores: PersistedStore[] = [
  useAuthStore,
  useCarePlanStore,
  usePatientStore,
  useFeedbackStore,
  useCompanionStore,
]

export function rehydrateStores(stores: PersistedStore[] = persistedStores): Promise<void[]> {
  return Promise.all(stores.map((store) => Promise.resolve(store.persist.rehydrate())))
}

export function subscribeStorageSync(stores: PersistedStore[] = persistedStores): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.storageArea !== window.localStorage) return
    stores
      .filter((store) => event.key === null || event.key === store.persist.getOptions().name)
      .forEach((store) => void store.persist.rehydrate())
  }

  window.addEventListener("storage", handleStorage)
  return () => window.removeEventListener("storage", handleStorage)
}

export function useStorageSync(): void {
  useEffect(() => {
    void rehydrateStores()
    return subscribeStorageSync()
  }, [])
}

function subscribeHydration(listener: () => void): () => void {
  const unsubscribers = persistedStores.map((store) => store.persist.onFinishHydration(listener))
  return () => unsubscribers.forEach((unsubscribe) => unsubscribe())
}

function getHydrated(): boolean {
  return persistedStores.every((store) => store.persist.hasHydrated())
}

export function useStoresHydrated(): boolean {
  return useSyncExternalStore(subscribeHydration, getHydrated, () => false)
}
