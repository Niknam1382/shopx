import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = { matcher: ['/dashboard/:path*'] };

export default function middleware(req: NextRequest) {
  const hasSession = req.cookies.get('session')?.value;
  if (!hasSession && req.nextUrl.pathname.startsWith('/dashboard')) {
    const url = req.nextUrl.clone();
    url.pathname = '/account/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}