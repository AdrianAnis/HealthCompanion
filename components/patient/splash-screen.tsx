import { HeartHandshake } from "lucide-react"

export function SplashScreen() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-primary text-primary-foreground">
      <span className="flex size-24 animate-in items-center justify-center rounded-3xl bg-primary-foreground/15 duration-700 zoom-in-50 fade-in">
        <HeartHandshake className="size-12" />
      </span>
      <div className="animate-in text-center delay-300 duration-700 fade-in slide-in-from-bottom-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Health Companion</h1>
        <p className="mt-1 text-primary-foreground/80">Teman pemulihanmu setiap hari</p>
      </div>
    </div>
  )
}
