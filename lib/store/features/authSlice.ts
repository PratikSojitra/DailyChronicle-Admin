import { AuthResponse, AuthState, User } from "@/lib/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const getFromStorage = (key: string): string | null => {
    if (typeof window !== 'undefined') return localStorage.getItem(key);
    return null;
};

const getUserFromStorage = (): User | null => {
    if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('user');
        if (!userStr || userStr === 'undefined') return null;
        try {
            return JSON.parse(userStr);
        } catch (error) {
            console.error("Failed to parse user data:", error);
            localStorage.removeItem('user'); // Clean up corrupt data
            return null;
        }
    }
    return null;
};


const initialState: AuthState = {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        initializeAuth: (state) => {
            console.log('Initializing Auth in Slice');
            const token = getFromStorage('token');
            const refreshToken = getFromStorage('refreshToken');
            const user = getUserFromStorage();

            if (token) {
                state.token = token;
                state.refreshToken = refreshToken;
                state.user = user;
                state.isAuthenticated = true;
                // Sync cookie from local storage (if missing)
                if (typeof window !== 'undefined' && refreshToken) {
                    Cookies.set('currentUser', refreshToken, { expires: 7 });
                }
            } else {
                state.token = null;
                state.refreshToken = null;
                state.user = null;
                state.isAuthenticated = false;
            }
            state.isLoading = false; // <--- Loading is done!
        },
        setCredentials: (state, action: PayloadAction<AuthResponse>) => {
            const { user, access_token, refresh_token } = action.payload;

            state.user = user;
            state.token = access_token;
            state.refreshToken = refresh_token;
            state.isAuthenticated = true;
            state.isLoading = false;

            // Persist to LocalStorage
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            localStorage.setItem('token', access_token);
            localStorage.setItem('refreshToken', refresh_token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.isLoading = false;

            // Remove from LocalStorage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            Cookies.remove('currentUser');
        },
        tokenRefreshed: (state, action: PayloadAction<{ access_token: string; refresh_token: string }>) => {
            state.token = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;

            localStorage.setItem('token', action.payload.access_token);
            localStorage.setItem('refreshToken', action.payload.refresh_token);
        },
    }
})

export const { initializeAuth, setCredentials, logout, tokenRefreshed } = authSlice.actions;
export default authSlice.reducer;
