import api from "../axios";
import { AuthResponse, LoginInputs, SignupInputs } from "../types/auth";

export const authApi = {
    login: async (credentials: LoginInputs): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>('/auth/admin-login', credentials);
        return data;
    },
    forgotPassword: async (email: string): Promise<void> => {
        await api.post('/auth/forgot-password', { email });
    },
    resetPassword: async (data: any): Promise<void> => {
        await api.post('/auth/reset-password', data);
    },
    logout: async (): Promise<void> => {
        await api.post('/auth/logout');
    }
}