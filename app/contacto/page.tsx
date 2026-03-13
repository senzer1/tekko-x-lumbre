import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { contactPageQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import type { ContactPage, SiteSettings } from '@/types/sanity'
import ScrollReveal from '@/components/ui/ScrollReveal'
import MapEmbed from '@/components/contact/MapEmbed'

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<ContactPage | null>(contactPageQuery)
  return { title: page?.metaTitle || 'Contacto — LUMBRE', description: page?.metaDescription || 'Encuéntranos en Valencia.' }
}

/* ─── Fallback data when Sanity has no content ─── */
const FALLBACK = {
  address: 'Calle del Fuego, 42 — 46001 Valencia, España',
  phone: '+34 961 234 567',
  email: 'hola@lumbre.es',
  schedule: [
    { day: 'Martes — Jueves', hours: '19:00 – 23:30' },
    { day: 'Viernes — Sábado', hours: '19:00 – 00:30' },
    { day: 'Domingo', hours: '13:00 – 16:00' },
    { day: 'Lunes', hours: 'Cerrado' },
  ],
}

export default async function ContactoPage() {
  const [page, settings] = await Promise.all([
    client.fetch<ContactPage | null>(contactPageQuery),
    client.fetch<SiteSettings | null>(siteSettingsQuery),
  ])

  const address = settings?.address || FALLBACK.address
  const phone = settings?.phone || FALLBACK.phone
  const email = settings?.email || FALLBACK.email
  const schedule = settings?.schedule && settings.schedule.length > 0 ? settings.schedule : FALLBACK.schedule

  return (
    <>
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-negro">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h1 className="font-display italic font-light text-[clamp(2.5rem,6vw,4.5rem)] text-crema leading-[0.95] animate-fade-up">
            {page?.title || 'Contacto'}
          </h1>
          <p className="mt-4 font-body text-sm text-ceniza uppercase tracking-[0.2em] animate-fade-up [animation-delay:200ms]">
            {page?.subtitle || 'Encuéntranos'}
          </p>
        </div>
      </section>

      <section className="section-padding bg-negro">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Info */}
            <ScrollReveal>
              <div className="space-y-10">
                <div>
                  <h3 className="font-body text-xs uppercase tracking-[0.2em] text-oro mb-4">Dirección</h3>
                  <address className="not-italic font-body text-sm text-crema">{address}</address>
                </div>

                <div>
                  <h3 className="font-body text-xs uppercase tracking-[0.2em] text-oro mb-4">Teléfono</h3>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-body text-sm text-crema hover:text-brasa transition-colors">
                    {phone}
                  </a>
                </div>

                <div>
                  <h3 className="font-body text-xs uppercase tracking-[0.2em] text-oro mb-4">Email</h3>
                  <a href={`mailto:${email}`} className="font-body text-sm text-crema hover:text-brasa transition-colors">
                    {email}
                  </a>
                </div>

                <div>
                  <h3 className="font-body text-xs uppercase tracking-[0.2em] text-oro mb-4">Horarios</h3>
                  <div className="space-y-2">
                    {schedule.map((e, i) => (
                      <div key={i} className="flex justify-between items-baseline gap-4 max-w-xs">
                        <span className="font-body text-sm text-crema">{e.day}</span>
                        <span className={`font-body text-sm tabular-nums ${e.hours === 'Cerrado' ? 'text-ceniza/30' : 'text-ceniza'}`}>
                          {e.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-body text-xs uppercase tracking-[0.2em] text-oro mb-4">Síguenos</h3>
                  <div className="flex gap-4">
                    {(settings?.instagram || !settings) && (
                      <a href={settings?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-ceniza hover:text-crema transition-colors">
                        Instagram
                      </a>
                    )}
                    {(settings?.facebook || !settings) && (
                      <a href={settings?.facebook || '#'} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-ceniza hover:text-crema transition-colors">
                        Facebook
                      </a>
                    )}
                    {(settings?.tiktok || !settings) && (
                      <a href={settings?.tiktok || '#'} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-ceniza hover:text-crema transition-colors">
                        TikTok
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Map + Access */}
            <div className="space-y-10">
              <ScrollReveal direction="left">
                <MapEmbed mapUrl={page?.mapEmbedUrl} address={address} />
              </ScrollReveal>
              {page?.accessInfo ? (
                <ScrollReveal direction="left" delay={200}>
                  <div>
                    <h3 className="font-body text-xs uppercase tracking-[0.2em] text-oro mb-4">Cómo llegar</h3>
                    <div className="font-body text-sm text-ceniza leading-relaxed space-y-4">
                      <PortableText value={page.accessInfo} />
                    </div>
                  </div>
                </ScrollReveal>
              ) : (
                <ScrollReveal direction="left" delay={200}>
                  <div>
                    <h3 className="font-body text-xs uppercase tracking-[0.2em] text-oro mb-4">Cómo llegar</h3>
                    <div className="font-body text-sm text-ceniza leading-relaxed space-y-3">
                      <p><strong className="text-crema font-medium">Metro:</strong> Línea 3 y 5, parada Colón (5 min a pie)</p>
                      <p><strong className="text-crema font-medium">Bus:</strong> Líneas 4, 6, 8, 11, 16 — Parada Plaza del Ayuntamiento</p>
                      <p><strong className="text-crema font-medium">Parking:</strong> Parking público Plaza de la Reina (a 200m)</p>
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
