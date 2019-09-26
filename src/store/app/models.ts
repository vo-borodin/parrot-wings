export interface User {
  email: string
  username: string
}

export interface AppState {
  balance: number
  currentUser?: User
  transactionCommiting: boolean
  users: User[]
  usersLoading: boolean
}
