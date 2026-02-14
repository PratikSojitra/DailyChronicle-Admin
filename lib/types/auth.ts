import { z } from 'zod';

export interface User {
    id: string;
    email: string;
    name?: string;
    role: 'admin' | 'user' | 'editor';
    avatar?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading?: boolean;
}

export interface AuthResponse {
    user: User;
    access_token: string;
    refresh_token: string;
}

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
    name: z.string().min(2, 'Name is too short'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInputs = z.infer<typeof loginSchema>;
export type SignupInputs = z.infer<typeof signupSchema>;