import { authHeader } from '../helpers/auth-header'
import { baseUrl, handleResponse } from './shared'

export const login = async (email: string, password: string) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ email, password })
  }

  const response = await fetch(`${baseUrl}/sessions/create`, requestOptions)

  const resp = await handleResponse(response)
  if (resp.id_token) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('jwtToken', resp.id_token)
  }
  return resp
}

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  }

  const response = await fetch(`${baseUrl}/users`, requestOptions)
  return handleResponse(response)
}

export const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('jwtToken')
}

export const getUserInfo = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: authHeader()
    }
  }

  const response = await fetch(
    `${baseUrl}/api/protected/user-info`,
    requestOptions
  )
  const resp = await handleResponse(response)
  return {
    username: resp.user_info_token.name,
    email: resp.user_info_token.email,
    balance: resp.user_info_token.balance
  }
}

export const getAll = async () => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: authHeader()
    },
    body: JSON.stringify({ filter: ' ' })
  }

  const response = await fetch(
    `${baseUrl}/api/protected/users/list`,
    requestOptions
  )
  return handleResponse(response)
}
