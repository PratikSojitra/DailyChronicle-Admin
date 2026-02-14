import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    console.log('Proxying request:', request.nextUrl.pathname);
    // 1. Get the token from cookies
    const token = request.cookies.get('currentUser')?.value;

    // 2. Get current path
    const { pathname } = request.nextUrl;

    // 3. Define protected routes (e.g., anything starting with /dashboard)
    const isProtectedRoute = pathname.startsWith('/dashboard');

    // 4. Define auth routes (Login/Signup)
    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');

    // --- LOGIC ---

    // SCENARIO A: Unauthenticated User tries to access Dashboard
    if (isProtectedRoute && !token) {
        // Redirect to Login
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // SCENARIO B: Logged-in User tries to access Login Page
    if (isAuthRoute && token) {
        console.log('Redirecting to dashboard (Already logged in)');
        // Redirect to Dashboard (They are already logged in!)
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Allow request to continue
    return NextResponse.next();
}

// Configuration: Apply this middleware to specific paths
export const config = {
    matcher: [
        '/dashboard/:path*', // Protect all dashboard routes
        '/login',            // Redirect logged-in users away from here
        '/signup'
    ],
};
