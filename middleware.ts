import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware — runs on every matched request BEFORE the route handler.
 *
 * Responsibilities:
 * 1. Protect /studio with HTTP Basic Auth (credentials from env vars)
 * 2. Add security headers to all responses
 */

/* ─── Basic Auth for Sanity Studio ─── */
function isStudioAuthenticated(request: NextRequest): boolean {
  const expectedUser = process.env.STUDIO_BASIC_AUTH_USER
  const expectedPass = process.env.STUDIO_BASIC_AUTH_PASS

  // If env vars are not set, allow access (dev mode / not configured yet)
  if (!expectedUser || !expectedPass) return true

  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Basic ')) return false

  try {
    const base64 = authHeader.slice(6)
    // Use TextDecoder for Edge Runtime compatibility (atob can behave differently)
    const bytes = Uint8Array.from(
      globalThis.atob(base64),
      (c) => c.charCodeAt(0)
    )
    const decoded = new TextDecoder().decode(bytes)
    // Split on first ':' only — password may contain ':'
    const colonIdx = decoded.indexOf(':')
    if (colonIdx === -1) return false
    const user = decoded.slice(0, colonIdx)
    const pass = decoded.slice(colonIdx + 1)

    return user === expectedUser && pass === expectedPass
  } catch {
    return false
  }
}

function unauthorizedResponse(): NextResponse {
  return new NextResponse('Acceso restringido. Introduce las credenciales del Studio.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Sanity Studio", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}

/* ─── Additional security headers ─── */
function addSecurityHeaders(response: NextResponse): NextResponse {
  // Prevent cross-origin window access (clickjacking / Spectre mitigations)
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')

  // Restrict how resources can be shared cross-origin
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin')

  // Prevent browsers from inferring MIME types
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Deny embedding in iframes from other origins
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')

  // Disable legacy XSS filter (modern CSP is better)
  response.headers.set('X-XSS-Protection', '0')

  // Don't send Referrer to less-secure destinations
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Restrict powerful browser APIs
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self), interest-cohort=(), payment=(), usb=(), bluetooth=(), serial=()'
  )

  return response
}

/* ─── Middleware handler ─── */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Protect /studio ──
  if (pathname.startsWith('/studio')) {
    // Only enforce auth in production
    if (process.env.NODE_ENV === 'production') {
      if (!isStudioAuthenticated(request)) {
        return unauthorizedResponse()
      }
    }
  }

  // ── Continue with added security headers ──
  const response = NextResponse.next()
  addSecurityHeaders(response)

  return response
}

export const config = {
  // Run middleware on all routes except static assets and _next internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)).*)',
  ],
}
