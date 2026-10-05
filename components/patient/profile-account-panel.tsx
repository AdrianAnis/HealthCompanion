import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { selectPatientAge } from "@/features/patient/selectors"
import type { Doctor, Patient } from "@/features/patient/types"

type ProfileAccountPanelProps = {
  patient: Patient
  doctor: Doctor | undefined
  now: Date
}

type ReadOnlyFieldProps = {
  id: string
  label: string
  value: string
}

function ReadOnlyField({ id, label, value }: ReadOnlyFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-muted-foreground">
        {label}
      </Label>
      <Input id={id} readOnly value={value} className="border-transparent bg-muted text-sm focus-visible:ring-0" />
    </div>
  )
}

export function ProfileAccountPanel({ patient, doctor, now }: ProfileAccountPanelProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <ReadOnlyField id="profile-name" label="Nama lengkap" value={patient.name} />
      <ReadOnlyField id="profile-mrn" label="Nomor rekam medis" value={patient.mrn} />
      <ReadOnlyField id="profile-age" label="Usia" value={`${selectPatientAge(patient, now)} tahun`} />
      <ReadOnlyField id="profile-phone" label="Nomor HP" value={patient.phone} />
      <ReadOnlyField id="profile-allergies" label="Alergi" value={patient.allergies.length > 0 ? patient.allergies.join(", ") : "Tidak ada"} />
      <ReadOnlyField id="profile-conditions" label="Kondisi" value={patient.conditions.join(", ")} />
      <ReadOnlyField id="profile-hospital" label="Rumah sakit" value={doctor?.hospital ?? "-"} />
      <ReadOnlyField id="profile-doctor" label="Dokter penanggung jawab" value={doctor?.name ?? "-"} />
    </div>
  )
}
