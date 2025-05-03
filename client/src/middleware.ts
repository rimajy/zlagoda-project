import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn = !!request.cookies.get('access_token')
  const currentPath = request.nextUrl.pathname

  if (currentPath.startsWith('/login') && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (currentPath.startsWith('/dashboard') && !isLoggedIn) {
    return NextResponse.rewrite(new URL('/404', request.url))
  }
}