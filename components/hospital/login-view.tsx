"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Activity, ArrowLeft } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { doctorLoginSchema, type DoctorLoginValues } from "@/features/auth/schema"
import { useAuthStore } from "@/features/auth/store"
import { routes } from "@/lib/routes"
import { mockDoctors } from "@/mocks/patients"

const DEMO_DOCTOR = mockDoctors[0]

export function LoginView() {
  const router = useRouter()
  const loginDoctor = useAuthStore((state) => state.loginDoctor)
  const form = useForm<DoctorLoginValues>({
    resolver: zodResolver(doctorLoginSchema),
    defaultValues: { email: "", password: "" },
  })

  function handleSubmit(values: DoctorLoginValues): void {
    if (!loginDoctor(values.email)) {
      form.setError("email", { message: "Email tidak terdaftar di rumah sakit ini" })
      return
    }
    router.replace(routes.hospital.dashboard)
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <span className="mb-2 flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Activity className="size-5" />
          </span>
          <CardTitle className="text-lg">Masuk ke workspace dokter</CardTitle>
          <CardDescription>Gunakan email rumah sakit Anda.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" placeholder={DEMO_DOCTOR?.email} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kata sandi</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="current-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Masuk
              </Button>
            </form>
          </Form>
          <p className="mt-4 rounded-md bg-muted p-3 text-xs text-muted-foreground">
            Demo: email {DEMO_DOCTOR?.email}, kata sandi bebas.
          </p>
        </CardContent>
      </Card>
      <Link href={routes.hospital.landing} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        Kembali ke beranda
      </Link>
    </main>
  )
}
