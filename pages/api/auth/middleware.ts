import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Exclude NextAuth API routes
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Your custom middleware logic
  // For example, redirect if the user is not authenticated
  const token = request.cookies.get('next-auth.session-token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

// Specify the paths that should be matched by the middleware
export const config = {
  matcher: ['/protected-route/:path*', '/another-protected-route/:path*'],
};