export type Gender = "male" | "female"

export type Patient = {
  id: string
  mrn: string
  name: string
  gender: Gender
  birthDate: string
  phone: string
  address: string
  primaryDiagnosis: string
  conditions: string[]
  allergies: string[]
  assignedDoctorId: string
}

export type HealthHistoryType = "diagnosis" | "visit" | "lab" | "procedure" | "vital"

export type HealthHistoryEntry = {
  id: string
  patientId: string
  date: string
  type: HealthHistoryType
  title: string
  notes: string
  value?: string
}

export type Doctor = {
  id: string
  name: string
  specialty: string
  email: string
}
