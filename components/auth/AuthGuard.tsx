"use client";

import { ReactNode } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "@/lib/store/features/authSlice";
import { FullPageLoader } from "@/components/ui/loader";

interface AuthGuardProps {
    children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated && pathname !== '/login') {
            console.log('Redirecting to /login because user is not authenticated.');
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, pathname, router]);

    if (isLoading) {
        return <FullPageLoader label="Authenticating..." />;
    }

    if (isAuthenticated && pathname === '/login') {
        router.push('/dashboard');
        return null;
    }

    if (!isAuthenticated && pathname !== '/login') {
        // Optional: Render nothing while redirecting
        return null;
    }

    return <>{children}</>;
}