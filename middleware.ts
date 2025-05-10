import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        
        // Public routes that don't require authentication
        if (path.startsWith('/api/services') || 
            path === '/api/auth/login' || 
            path === '/api/auth/register' ||
            path === '/auth/login' ||
            path === '/auth/register' ||
            path === '/' ||
            path.startsWith('/services/')) {
          return true;
        }        // All protected routes just need authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/appointments/:path*',
    '/booking/:path*',
    '/api/appointments/:path*',
    '/profile/:path*',
    '/dashboard/:path*',
    '/api/dashboard/:path*',
  ]
}
