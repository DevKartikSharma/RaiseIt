import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard', '/artists', '/signup/register'];

  // Only protect these routes
  if (protectedRoutes.some((path) => pathname.startsWith(path))) {
    // Check for next-auth session token cookie
    const token = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

    if (!token) {
      // No session token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Token exists, allow access (Note: This doesn't verify the token's validity)
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/artists/:path*', '/register'],
};
