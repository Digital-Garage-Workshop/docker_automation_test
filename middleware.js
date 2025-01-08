import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ 
    req,
    secret: process.env.NEXTAUTH_SECRET 
  });

  const protectedRoutes = ['/profile'];
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    const redirectUrl = new URL('/', req.url);
    // redirectUrl.searchParams.set('/', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*']
}