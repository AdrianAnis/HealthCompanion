import type { Doctor, Patient } from "@/features/patient/types"

export const mockDoctors: Doctor[] = [
  {
    id: "d-001",
    name: "dr. Rina Kartika, Sp.PD",
    specialty: "Penyakit Dalam",
    email: "rina.kartika@rs-sehat.id",
  },
]

export const DEMO_DOCTOR_ID = "d-001"

export const DEMO_PATIENT_ID = "p-001"

export const DEMO_OTP = "123456"

export const mockPatients: Patient[] = [
  {
    id: "p-001",
    mrn: "RM-2024-00187",
    name: "Budi Santoso",
    gender: "male",
    birthDate: "1967-04-12",
    phone: "081234567801",
    address: "Jl. Kenanga No. 14, Depok, Jawa Barat",
    primaryDiagnosis: "Hipertensi esensial (I10)",
    conditions: ["Hipertensi", "Dislipidemia"],
    allergies: ["Sulfa"],
    assignedDoctorId: "d-001",
  },
  {
    id: "p-002",
    mrn: "RM-2023-01452",
    name: "Siti Rahmawati",
    gender: "female",
    birthDate: "1973-09-03",
    phone: "081234567802",
    address: "Jl. Melati Raya No. 7, Bekasi, Jawa Barat",
    primaryDiagnosis: "Diabetes melitus tipe 2 (E11)",
    conditions: ["Diabetes melitus tipe 2", "Obesitas derajat I"],
    allergies: [],
    assignedDoctorId: "d-001",
  },
  {
    id: "p-003",
    mrn: "RM-2025-00932",
    name: "Andi Pratama",
    gender: "male",
    birthDate: "1991-12-21",
    phone: "081234567803",
    address: "Jl. Cempaka Putih No. 22, Jakarta Pusat",
    primaryDiagnosis: "Pasca apendektomi laparoskopi (Z48.8)",
    conditions: ["Apendisitis akut, pasca operasi"],
    allergies: ["Amoksisilin"],
    assignedDoctorId: "d-001",
  },
]
