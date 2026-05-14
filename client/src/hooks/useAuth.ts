import { authApi } from "@/apis/auth.api"
import { removeAccessToken, setAccessToken } from "@/services/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const login = useMutation({
        mutationFn: authApi.login,
        onSuccess: (res) => {
            setAccessToken(res.data.accessToken)
            queryClient.invalidateQueries({ queryKey: ["user"] })      
        }
    })

    const register = useMutation({
        mutationFn: authApi.register,
        onSuccess: () => {
            navigate('/login')
        }
    })

    const logout = useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            removeAccessToken()
            queryClient.clear()
            navigate('/login')
        }
    })

    return { login, register, logout }
}