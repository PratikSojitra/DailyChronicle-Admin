'use client';

import AuthGuard from "@/components/auth/AuthGuard";
import { store } from "@/lib/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthGuard>
                        <TooltipProvider>
                            {children}
                        </TooltipProvider>
                    </AuthGuard>
                    <Toaster richColors position="top-right" />
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    );
} 