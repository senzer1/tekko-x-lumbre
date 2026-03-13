import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'

/* ─── Rate limiter (in-memory, per-IP) ─── */
const RATE_LIMIT_WINDOW = 60_000 // 1 minute
const RATE_LIMIT_MAX = 3 // max 3 requests per window
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

// Periodic cleanup to prevent memory leaks
setInterval(() => {
  const now = Date.now()
  rateLimitMap.forEach((entry, ip) => {
    if (now > entry.resetAt) rateLimitMap.delete(ip)
  })
}, 60_000)

/* ─── HTML sanitizer — escape all special chars ─── */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/* ─── Validation helpers ─── */
const MAX_FIELD_LENGTH = 500
const MAX_MESSAGE_LENGTH = 2000
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[\d\s+\-().]{6,20}$/
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const TIME_REGEX = /^\d{2}:\d{2}$/

function validateField(value: unknown, name: string, maxLen = MAX_FIELD_LENGTH): string | null {
  if (typeof value !== 'string') return `${name}: tipo no válido`
  if (!value.trim()) return `${name}: campo obligatorio`
  if (value.length > maxLen) return `${name}: demasiado largo (máx ${maxLen} caracteres)`
  return null
}

/* ─── Allowed origins ─── */
const VERCEL_PROJECT_SLUG = 'tekko-x-lumbre'

function getAllowedOrigins(): string[] {
  return [
    'https://lumbre.es',
    'https://www.lumbre.es',
    `https://${VERCEL_PROJECT_SLUG}.vercel.app`,
    process.env.NEXT_PUBLIC_SITE_URL,
  ].filter(Boolean) as string[]
}

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')

  // Allow in development
  if (process.env.NODE_ENV === 'development') return true

  // Must have an origin or referer header
  if (!origin && !referer) return false

  const allowed = getAllowedOrigins()

  // Allow Vercel preview deployments scoped to this project only
  if (
    origin?.endsWith('.vercel.app') &&
    origin.includes(VERCEL_PROJECT_SLUG)
  ) return true
  if (
    referer?.includes('.vercel.app') &&
    referer.includes(VERCEL_PROJECT_SLUG)
  ) return true

  return allowed.some(
    (url) => origin === url || referer?.startsWith(url)
  )
}

/* ─── CORS headers for allowed origins ─── */
function corsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get('origin') || ''
  const allowed = getAllowedOrigins()
  const isVercelPreview =
    origin.endsWith('.vercel.app') && origin.includes(VERCEL_PROJECT_SLUG)

  if (allowed.includes(origin) || isVercelPreview) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400', // 24 h preflight cache
    }
  }

  return {}
}

/* ─── Resend client (singleton) ─── */
let resendInstance: Resend | null = null
function getResend(): Resend {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY)
  }
  return resendInstance
}

/* ─── OPTIONS handler — CORS preflight ─── */
export function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request),
  })
}

/* ─── POST handler ─── */
interface ReservationBody {
  nombre: string
  email: string
  telefono: string
  fecha: string
  hora: string
  comensales: number
  mensaje?: string
  _hp?: string // honeypot field
}

export async function POST(request: NextRequest) {
  try {
    // CSRF: check origin
    if (!isAllowedOrigin(request)) {
      return NextResponse.json(
        { error: 'Origen no autorizado.' },
        { status: 403, headers: corsHeaders(request) }
      )
    }

    // Rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Inténtalo de nuevo en un minuto.' },
        { status: 429, headers: { 'Retry-After': '60', ...corsHeaders(request) } }
      )
    }

    // Parse body with size limit check
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 10_000) {
      return NextResponse.json(
        { error: 'Payload demasiado grande.' },
        { status: 413, headers: corsHeaders(request) }
      )
    }

    const body = (await request.json()) as ReservationBody
    const { nombre, email, telefono, fecha, hora, comensales, mensaje, _hp } = body

    // Honeypot check — bots fill hidden fields, humans never do
    // Return success to fool the bot, but don't actually send emails
    if (_hp) {
      return NextResponse.json({ success: true }, { headers: corsHeaders(request) })
    }

    // Validate required fields
    const errors: string[] = []

    const nameErr = validateField(nombre, 'Nombre')
    if (nameErr) errors.push(nameErr)

    const emailErr = validateField(email, 'Email')
    if (emailErr) errors.push(emailErr)
    else if (!EMAIL_REGEX.test(email)) errors.push('Formato de email no válido')

    const phoneErr = validateField(telefono, 'Teléfono', 20)
    if (phoneErr) errors.push(phoneErr)
    else if (!PHONE_REGEX.test(telefono)) errors.push('Formato de teléfono no válido')

    const dateErr = validateField(fecha, 'Fecha', 10)
    if (dateErr) errors.push(dateErr)
    else if (!DATE_REGEX.test(fecha)) errors.push('Formato de fecha no válido')

    const timeErr = validateField(hora, 'Hora', 5)
    if (timeErr) errors.push(timeErr)
    else if (!TIME_REGEX.test(hora)) errors.push('Formato de hora no válido')

    if (typeof comensales !== 'number' || !Number.isFinite(comensales) || !Number.isInteger(comensales) || comensales < 1 || comensales > 20) {
      errors.push('Número de comensales no válido (1-20)')
    }

    if (mensaje && typeof mensaje === 'string' && mensaje.length > MAX_MESSAGE_LENGTH) {
      errors.push(`Mensaje demasiado largo (máx ${MAX_MESSAGE_LENGTH} caracteres)`)
    }

    // Date must be today or in the future
    if (fecha && DATE_REGEX.test(fecha)) {
      const reservationDate = new Date(fecha)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (reservationDate < today) {
        errors.push('La fecha no puede ser en el pasado')
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: errors[0] },
        { status: 400, headers: corsHeaders(request) }
      )
    }

    // Sanitize all user inputs for HTML rendering
    const safe = {
      nombre: escapeHtml(nombre.trim()),
      email: escapeHtml(email.trim()),
      telefono: escapeHtml(telefono.trim()),
      fecha: escapeHtml(fecha),
      hora: escapeHtml(hora),
      comensales: Math.floor(comensales),
      mensaje: mensaje ? escapeHtml(mensaje.trim()) : '',
    }

    const restaurantEmail = process.env.RESERVATION_EMAIL || 'reservas@lumbre.es'

    // Email to restaurant
    await getResend().emails.send({
      from: 'LUMBRE Reservas <onboarding@resend.dev>',
      to: [restaurantEmail],
      subject: `Nueva reserva — ${safe.nombre} · ${safe.fecha} · ${safe.hora}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 30px;background:#0D0B09;color:#F5EFE4;">
          <h1 style="font-style:italic;font-weight:300;font-size:28px;color:#F5EFE4;margin-bottom:30px;">Nueva reserva</h1>
          <table style="width:100%;border-collapse:collapse;font-size:15px;">
            <tr><td style="padding:10px 0;color:#A89880;border-bottom:1px solid #1A1008;">Nombre</td><td style="padding:10px 0;color:#F5EFE4;border-bottom:1px solid #1A1008;">${safe.nombre}</td></tr>
            <tr><td style="padding:10px 0;color:#A89880;border-bottom:1px solid #1A1008;">Email</td><td style="padding:10px 0;color:#F5EFE4;border-bottom:1px solid #1A1008;"><a href="mailto:${safe.email}" style="color:#E8521A;">${safe.email}</a></td></tr>
            <tr><td style="padding:10px 0;color:#A89880;border-bottom:1px solid #1A1008;">Teléfono</td><td style="padding:10px 0;color:#F5EFE4;border-bottom:1px solid #1A1008;"><a href="tel:${safe.telefono}" style="color:#E8521A;">${safe.telefono}</a></td></tr>
            <tr><td style="padding:10px 0;color:#A89880;border-bottom:1px solid #1A1008;">Fecha</td><td style="padding:10px 0;color:#F5EFE4;border-bottom:1px solid #1A1008;">${safe.fecha}</td></tr>
            <tr><td style="padding:10px 0;color:#A89880;border-bottom:1px solid #1A1008;">Hora</td><td style="padding:10px 0;color:#F5EFE4;border-bottom:1px solid #1A1008;">${safe.hora}</td></tr>
            <tr><td style="padding:10px 0;color:#A89880;border-bottom:1px solid #1A1008;">Comensales</td><td style="padding:10px 0;color:#F5EFE4;border-bottom:1px solid #1A1008;">${safe.comensales}</td></tr>
            ${safe.mensaje ? `<tr><td style="padding:10px 0;color:#A89880;">Mensaje</td><td style="padding:10px 0;color:#F5EFE4;">${safe.mensaje}</td></tr>` : ''}
          </table>
        </div>
      `,
    })

    // Confirmation to customer
    await getResend().emails.send({
      from: 'LUMBRE <onboarding@resend.dev>',
      to: [email.trim()],
      subject: 'Confirmación de reserva — LUMBRE',
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 30px;background:#0D0B09;color:#F5EFE4;">
          <h1 style="font-style:italic;font-weight:300;font-size:28px;color:#F5EFE4;margin-bottom:20px;">Gracias, ${safe.nombre}</h1>
          <p style="font-size:15px;color:#A89880;line-height:1.6;">Hemos recibido tu solicitud de reserva. Te confirmaremos a la mayor brevedad.</p>
          <div style="margin:30px 0;padding:20px;border:1px solid #1A1008;border-radius:4px;">
            <p style="margin:0;font-size:15px;color:#F5EFE4;"><strong>Fecha:</strong> ${safe.fecha}</p>
            <p style="margin:8px 0 0;font-size:15px;color:#F5EFE4;"><strong>Hora:</strong> ${safe.hora}</p>
            <p style="margin:8px 0 0;font-size:15px;color:#F5EFE4;"><strong>Comensales:</strong> ${safe.comensales}</p>
          </div>
          <p style="font-size:13px;color:#A89880;">Si necesitas modificar tu reserva, llámanos o responde a este email.</p>
          <p style="margin-top:30px;font-style:italic;color:#C9A84C;font-size:14px;">— El equipo de LUMBRE</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true }, { headers: corsHeaders(request) })
  } catch (error) {
    // Log full error server-side, but never leak details to the client
    console.error('Reservation error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}
