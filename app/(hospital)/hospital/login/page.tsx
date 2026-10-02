import type { Metadata } from "next"
import Link from "next/link"
import { Activity } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = { title: "Masuk" }

export default function HospitalLoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <span className="mb-2 flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Activity className="size-4" />
          </span>
          <CardTitle>Masuk ke workspace dokter</CardTitle>
          <CardDescription>Gunakan email rumah sakit Anda.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          TODO: form email + password (React Hook Form + Zod) memakai useAuthStore().loginDoctor. Akun demo: rina.kartika@rs-sehat.id
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/hospital/dashboard">Lanjut ke dashboard (demo)</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
