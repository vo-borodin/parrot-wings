export interface Alert {
  alertType: string
  message: string
}

export interface AlertState {
  alert?: Alert
}
