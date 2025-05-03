import { API_BASE_URL } from '@/shared/constants/api-base-url'
import { LoginFormSchemaType } from '@/shared/schemas/login-form.schema'

class AuthService {
  async login(loginSchema: LoginFormSchemaType) {
    const res = await fetch(API_BASE_URL + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(loginSchema),
    })
    const data = await res.json()

    if (!res.ok) {
      throw data
    }

    return data
  }

  async logout() {
    const res = await fetch(API_BASE_URL + 'auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!res.ok) {
      throw new Error("Logout failed")
    }
  }
}

export const authService = new AuthService()
