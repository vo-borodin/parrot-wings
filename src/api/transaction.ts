import { authHeader } from '../helpers/auth-header'
import { baseUrl, handleResponse } from './shared'

export const commitTransaction = async (name: string, amount: number) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: authHeader()
    },
    body: JSON.stringify({ name, amount })
  }

  const response = await fetch(
    `${baseUrl}/api/protected/transactions`,
    requestOptions
  )
  const resp = await handleResponse(response)
  return resp.trans_token.balance
}

export const fetchTransactions = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: authHeader()
    }
  }

  const response = await fetch(
    `${baseUrl}/api/protected/transactions`,
    requestOptions
  )
  const resp = await handleResponse(response)
  return resp.trans_token
}
