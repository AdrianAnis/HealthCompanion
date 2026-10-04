export const routes = {
  home: "/",
  patientDashboard: "/dashboard",
  hospitalDashboard: "/hospital",
  carePlanList: "/hospital/care-plans",
  carePlanDetail: (id: string) => `/hospital/care-plans/${id}`,
  patientList: "/hospital/patients",
  patientDetail: (id: string) => `/hospital/patients/${id}`,
}
