import { useRouter } from "next/navigation";
import { useAppDispatch } from "../store/hooks"
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { setCredentials, logout as logoutAction } from "../store/features/authSlice";
import { LoginInputs, SignupInputs } from "../types/auth";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useLogin = () => {
    const dispatch = useAppDispatch()
    const router = useRouter();

    return useMutation({
        mutationFn: (credentials: LoginInputs) => authApi.login(credentials),
        onSuccess: (data) => {
            dispatch(setCredentials(data))
            Cookies.set('currentUser', data.refresh_token, { expires: 7 });
            toast.success('Login Successful', {
                description: 'Redirecting to dashboard...',
            });
            // Using window.location.href instead of router.push for auth to ensure cookies are settled
            window.location.href = '/dashboard';
        },
        onError: (error) => {
            const message = (error as any)?.response?.data?.message || 'Invalid email or password. Please try again.';
            toast.error('Login Failed', {
                description: message,
            });
        }
    })
}


export const useLogout = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    return useMutation({
        mutationFn: authApi.logout,
        onSettled: () => {
            dispatch(logoutAction());
            Cookies.remove('currentUser');
            router.push('/login');
        },
    });
};