import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'de']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Skip if pathname already includes a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return NextResponse.next()

    // Redirect `/` to default locale
    if (pathname === '/') {
        request.nextUrl.pathname = `/${defaultLocale}`
        return NextResponse.redirect(request.nextUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next).*)'], // apply to all paths except internal
}
