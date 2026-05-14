import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../types/auth.type"
import http from "../utils/http"

export const authApi = {
    login: (data: LoginRequest) => {
        return http.post<LoginResponse>('/auth/login', data)
    },
    register: (data: RegisterRequest) => {
        return http.post<RegisterResponse>('/auth/register', data)
    },
    logout: () => {
        return http.post('/auth/logout')
    }
}