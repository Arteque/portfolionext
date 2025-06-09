import { NextResponse, NextRequest } from "next/server";
import acceptLanguage from "accept-language";
let locales = ["en", "fr", "de"];
const defaultLocale = "de";
// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): string {
  acceptLanguage.languages(locales);
  return (
    acceptLanguage.get(request.headers.get("accept-language") || "") ||
    defaultLocale
  );
}

export function middleware(request: NextRequest): NextResponse | void {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale: boolean = locales.some(
    (locale: string) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale: string = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
