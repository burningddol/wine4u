import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/myprofile", "/wines/"];
const AUTH_ROUTES = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (/\.\w+$/.test(pathname)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const hasValidSession = accessToken || refreshToken;

  //프로필페이지 접근 밤지(미 인증시)
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !hasValidSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  //auth페이지 접근 방지(이미 인증시)
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route);

  if (isAuthRoute && hasValidSession) {
    const redirectTo = request.nextUrl.searchParams.get("redirect") || "/wines";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/myprofile/:path*", "/login", "/signup", "/wines/:path+"],
};
