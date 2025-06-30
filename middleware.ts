import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function authMiddleware(request: NextRequest) {
  // Check for session cart cookie
  const sessionCartId = request.cookies.get('sessionCartId');
  
  if (!sessionCartId) {
    // Generate new session cart id cookie
    const newSessionCartId = crypto.randomUUID();
    
    // Create new response
    const response = NextResponse.next();
    
    // Set newly generated session cart id in response cookies
    response.cookies.set('sessionCartId', newSessionCartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};