export const routes = {
  home: "/",
  hospital: {
    landing: "/hospital",
    login: "/hospital/login",
    dashboard: "/hospital/dashboard",
    patientList: "/hospital/patients",
    patientDetail: (patientId: string) => `/hospital/patients/${patientId}`,
    carePlanNew: (patientId: string) => `/hospital/patients/${patientId}/care-plan/new`,
    carePlanHistory: (patientId: string) => `/hospital/patients/${patientId}/care-plan/history`,
    monitoring: (patientId: string) => `/hospital/patients/${patientId}/monitoring`,
  },
  patient: {
    landing: "/patient",
    login: "/patient/login",
    today: "/patient/today",
    carePlan: "/patient/care-plan",
    carePlanItem: (itemId: string) => `/patient/care-plan/${itemId}`,
    companion: "/patient/companion",
    report: "/patient/profile?tab=aktivitas#lapor-keluhan",
    profile: "/patient/profile",
  },
} as const
