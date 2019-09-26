import { logout } from './auth'

export const baseUrl = 'http://193.124.114.46:3001'

export const handleResponse = async (response: Response) => {
  const text = await response.text()
  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logout()
    }
    const error = text
    return Promise.reject(error)
  }
  const data = text && JSON.parse(text)
  return data
}
