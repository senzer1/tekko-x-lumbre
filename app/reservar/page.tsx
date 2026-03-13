import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { reservationPageQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import type { ReservationPage, SiteSettings } from '@/types/sanity'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ReservationForm from '@/components/reservation/ReservationForm'

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<ReservationPage | null>(reservationPageQuery)
  return { title: page?.metaTitle || 'Reservar — LUMBRE', description: page?.metaDescription || 'Reserva tu mesa en LUMBRE.' }
}

/* ─── Fallback schedule when Sanity has no data ─── */
const FALLBACK_SCHEDULE = [
  { day: 'Martes — Jueves', hours: '19:00 – 23:30' },
  { day: 'Viernes — Sábado', hours: '19:00 – 00:30' },
  { day: 'Domingo', hours: '13:00 – 16:00' },
  { day: 'Lunes', hours: 'Cerrado' },
]

export default async function ReservarPage() {
  const [page, settings] = await Promise.all([
    client.fetch<ReservationPage | null>(reservationPageQuery),
    client.fetch<SiteSettings | null>(siteSettingsQuery),
  ])

  const phone = settings?.phone || page?.practicalPhone || '+34 961 234 567'
  const address = page?.practicalAddress || settings?.address || 'Calle del Fuego, 42 — 46001 Valencia'
  const email = page?.practicalEmail || settings?.email || 'reservas@lumbre.es'
  const schedule = page?.schedule && page.schedule.length > 0 ? page.schedule : FALLBACK_SCHEDULE
  const subtitle = page?.subtitle || 'Tu Mesa Te Espera'
  const description = page?.description || 'Rellena el formulario y te confirmaremos por email en menos de 24 horas. Para grupos de más de 8 personas, contáctanos directamente por teléfono.'

  return (
    <>
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-negro">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h1 className="font-display italic font-light text-[clamp(2.5rem,6vw,4.5rem)] text-crema leading-[0.95] animate-fade-up">
            {page?.title || 'Reservar'}
          </h1>
          <p className="mt-4 font-body text-sm text-ceniza uppercase tracking-[0.2em] animate-fade-up [animation-delay:200ms]">
            {subtitle}
          </p>
          <p className="mt-6 font-body text-sm text-ceniza/60 leading-relaxed max-w-lg mx-auto animate-fade-up [animation-delay:300ms]">
            {description}
          </p>
        </div>
      </section>

      <section className="section-padding bg-negro">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            <div className="lg:col-span-3">
              <ScrollReveal><ReservationForm phone={phone} /></ScrollReveal>
            </div>
            <aside className="lg:col-span-2">
              <ScrollReveal direction="left" delay={200}>
                <div className="space-y-10">
                  {/* Schedule */}
                  <div>
                    <h3 className="font-body text-xs uppercase tracking-[0.2em] text-oro mb-4">Horarios</h3>
                    <div className="space-y-2">
                      {schedule.map((e, i) => (
                        <div key={i} className="flex justify-between items-baseline gap-4">
                          <span className="font-body text-sm text-crema">{e.day}</span>
                          <span className={`font-body text-sm tabular-nums ${e.hours === 'Cerrado' ? 'text-ceniza/30' : 'text-ceniza'}`}>
                            {e.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div>
                    <h3 className="font-body text-xs uppercase tracking-[0.2em] text-oro mb-4">Contacto</h3>
                    <div className="space-y-2 font-body text-sm text-ceniza">
                      <p>{address}</p>
                      <p>
                        <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-crema transition-colors">
                          {phone}
                        </a>
                      </p>
                      <p>
                        <a href={`mailto:${email}`} className="hover:text-crema transition-colors">
                          {email}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="p-6 border border-ceniza/10 rounded-sm">
                    <p className="font-display italic text-ceniza/70 text-sm leading-relaxed">
                      {page?.note || 'Para alergias, intolerancias o celebraciones especiales, no dudes en indicarlo en el mensaje. Haremos todo lo posible para que tu experiencia sea perfecta.'}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
