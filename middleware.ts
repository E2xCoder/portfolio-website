import { NextRequest, NextResponse } from 'next/server'

const supportedLangs = ['tr', 'en', 'de']
const defaultLang = 'en'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // API routes ve static dosyaları skip et
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next()
  }
  
  // Eğer zaten bir dil prefix'i varsa, devam et
  const pathnameHasLocale = supportedLangs.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) return NextResponse.next()
  
  // Root path için default dile yönlendir
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLang}`, request.url))
  }
  
  // Diğer path'ler için default dil prefix'i ekle
  return NextResponse.redirect(new URL(`/${defaultLang}${pathname}`, request.url))
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}