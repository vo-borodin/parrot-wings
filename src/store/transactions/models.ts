export interface Transaction {
  id: number
  date: Date
  username: string
  amount: number
  balance: number
}

export interface TransactionsState {
  transactions: Transaction[]
  transactionsLoading: boolean
}
