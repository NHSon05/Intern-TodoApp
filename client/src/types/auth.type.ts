export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    userId: number;
    accessToken: string;
}

export interface LoginErrors {
    email?: string;
    password?: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export interface LoginResponse {
    message: string;
    userId: number;
    accessToken: string;
}

export interface RegisterResponse {
    id: number;
    name: string;
    email: string;
    role: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}