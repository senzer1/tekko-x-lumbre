import { NextResponse } from 'next/server'
import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

interface ReservationBody {
  nombre: string
  email: string
  telefono: string
  fecha: string
  hora: string
  comensales: number
  mensaje?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReservationBody
    const { nombre, email, telefono, fecha, hora, comensales, mensaje } = body

    // Validate
    if (!nombre || !email || !telefono || !fecha || !hora || !comensales) {
      return NextResponse.json({ error: 'Todos los campos obligatorios deben estar completos.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Formato de email no válido.' }, { status: 400 })
    }
    if (comensales < 1 || comensales > 20) {
      return NextResponse.json({ error: 'Número de comensales no válido.' }, { status: 400 })
    }

    const restaurantEmail = process.env.RESERVATION_EMAIL || 'reservas@lumbre.es'

    // Email to restaurant
    await getResend().emails.send({
      from: 'LUMBRE Reservas <onboarding@resend.dev>',
      to: [restaurantEmail],
      subject: `Nueva reserva — ${nombre} · ${fecha} · ${hora}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 30px;background:#0D0B09;color:#F5EFE4;">
          <h1 style="font-style:italic;font-weight:300;font-size:28px;color:#F5EFE4;margin-bottom:30px;">Nueva reserva</h1>
          <table style="width:100%;border-collapse:collapse;font-size:15px;">
            <tr><td style="padding:10px 0;color:#A89880;border-bottom:1px solid #1A1008;">Nombre</td><td style="padding:10px 0;color:#F5EFE4;border-bottom:1px solid #1A1008;">${nombre}</td></tr>
            <tr><td style="padding:10px 0;color:#A89880;border-bottom:1px solid #1A1008;">Email</td><td style="padding:10px 0;color:#F5EFE4;border-bottom:1px solid #1A1008;"><a href="mailto:${email}" style="color:#E8521A;">${email}</a></td></tr>
            <tr><td style="padding:10px 0;color:#A89880;border-bottom:1px solid #1A1008;">Teléfono</td><td style="padding:10px 0;color:#F5EFE4;border-bottom:1px solid #1A1008;"><a href="tel:${telefono}" style="color:#E8521A;">${telefono}</a></td></tr>
            <tr><td style="padding:10px 0;color:#A89880;border-bottom:1px solid #1A1008;">Fecha</td><td style="padding:10px 0;color:#F5EFE4;border-bottom:1px solid #1A1008;">${fecha}</td></tr>
            <tr><td style="padding:10px 0;color:#A89880;border-bottom:1px solid #1A1008;">Hora</td><td style="padding:10px 0;color:#F5EFE4;border-bottom:1px solid #1A1008;">${hora}</td></tr>
            <tr><td style="padding:10px 0;color:#A89880;border-bottom:1px solid #1A1008;">Comensales</td><td style="padding:10px 0;color:#F5EFE4;border-bottom:1px solid #1A1008;">${comensales}</td></tr>
            ${mensaje ? `<tr><td style="padding:10px 0;color:#A89880;">Mensaje</td><td style="padding:10px 0;color:#F5EFE4;">${mensaje}</td></tr>` : ''}
          </table>
        </div>
      `,
    })

    // Confirmation to customer
    await getResend().emails.send({
      from: 'LUMBRE <onboarding@resend.dev>',
      to: [email],
      subject: 'Confirmación de reserva — LUMBRE',
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 30px;background:#0D0B09;color:#F5EFE4;">
          <h1 style="font-style:italic;font-weight:300;font-size:28px;color:#F5EFE4;margin-bottom:20px;">Gracias, ${nombre}</h1>
          <p style="font-size:15px;color:#A89880;line-height:1.6;">Hemos recibido tu solicitud de reserva. Te confirmaremos a la mayor brevedad.</p>
          <div style="margin:30px 0;padding:20px;border:1px solid #1A1008;border-radius:4px;">
            <p style="margin:0;font-size:15px;color:#F5EFE4;"><strong>Fecha:</strong> ${fecha}</p>
            <p style="margin:8px 0 0;font-size:15px;color:#F5EFE4;"><strong>Hora:</strong> ${hora}</p>
            <p style="margin:8px 0 0;font-size:15px;color:#F5EFE4;"><strong>Comensales:</strong> ${comensales}</p>
          </div>
          <p style="font-size:13px;color:#A89880;">Si necesitas modificar tu reserva, llámanos o responde a este email.</p>
          <p style="margin-top:30px;font-style:italic;color:#C9A84C;font-size:14px;">— El equipo de LUMBRE</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reservation error:', error)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
