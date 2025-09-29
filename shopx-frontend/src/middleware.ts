import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/orders", "/account", "/checkout"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (protectedPaths.some(p => pathname.startsWith(p))) {
    const token = req.cookies.get("token")?.value; // اگر خواستی توکن را در کوکی نگه داری
    // فعلاً بدون کوکی: رد کن و بفرست به لاگین
    if (!token) {
      const url = new URL("/login", req.url);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
export const config = { matcher: ["/orders/:path*", "/account/:path*", "/checkout"] };