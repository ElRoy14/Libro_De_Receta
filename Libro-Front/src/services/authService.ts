const API_URL = 'http://localhost:3000'

export interface SignupPayload {
  first: string
  last: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupResponse {
  message: string
  email: string
}

export interface LoginResponse {
  message: string
  user: string
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message = data?.errors?.[0]?.message ?? data?.message ?? 'No se pudo crear la cuenta'
    throw new ApiError(message, response.status)
  }

  return data
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok){
    const message = data?.errors?.[0]?.message ?? data?.message ?? 'No se pudo iniciar sesión'
    throw new ApiError(message, response.status)
  }

  return data
}