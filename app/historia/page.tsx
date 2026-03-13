import type { Metadata } from 'next'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { historyPageQuery, teamMembersQuery, producersQuery } from '@/sanity/lib/queries'
import { imageUrl, blurUrl } from '@/sanity/lib/image'
import type { HistoryPage, TeamMember, Producer } from '@/types/sanity'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import { portableTextComponents } from '@/components/ui/PortableTextComponents'
import StaticHistoria from '@/components/sections/StaticHistoria'

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<HistoryPage | null>(historyPageQuery)
  return { title: page?.metaTitle || 'Nuestra Historia — LUMBRE', description: page?.metaDescription || 'La historia detrás de LUMBRE.' }
}

export default async function HistoriaPage() {
  const [page, team, producers] = await Promise.all([
    client.fetch<HistoryPage | null>(historyPageQuery),
    client.fetch<TeamMember[]>(teamMembersQuery),
    client.fetch<Producer[]>(producersQuery),
  ])

  // No Sanity data → show static historia
  if (!page && team.length === 0 && producers.length === 0) {
    return <StaticHistoria />
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {page?.heroBackgroundImage && (<><Image src={imageUrl(page.heroBackgroundImage, 1920)} alt={page.heroBackgroundImage.alt || 'Historia'} fill priority sizes="100vw" className="object-cover" placeholder={blurUrl(page.heroBackgroundImage) ? 'blur' : 'empty'} blurDataURL={blurUrl(page.heroBackgroundImage) || undefined} /><div className="absolute inset-0 bg-negro/60" aria-hidden="true" /></>)}
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display italic font-light text-[clamp(2.5rem,6vw,4.5rem)] text-crema leading-[0.95] animate-fade-up">{page?.heroTitle || 'Nuestra Historia'}</h1>
          {page?.heroSubtitle && <p className="mt-4 font-body text-sm text-ceniza uppercase tracking-[0.2em] animate-fade-up [animation-delay:200ms]">{page.heroSubtitle}</p>}
        </div>
      </section>

      {/* Story */}
      {page?.storyContent && (
        <section className="section-padding bg-negro">
          <div className="max-w-[800px] mx-auto">
            <SectionTitle title={page.storyTitle || 'El origen'} />
            <ScrollReveal delay={200}><div className="mt-10 font-body text-sm md:text-base text-ceniza leading-relaxed space-y-4"><PortableText value={page.storyContent} components={portableTextComponents} /></div></ScrollReveal>
          </div>
        </section>
      )}

      {/* Team */}
      {team.length > 0 && (
        <section className="section-padding bg-tierra">
          <div className="max-w-[1400px] mx-auto">
            <SectionTitle title={page?.teamTitle || 'Nuestro equipo'} subtitle={page?.teamSubtitle} />
            <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {team.map((m, i) => (
                <ScrollReveal key={m._id} delay={i * 100}>
                  <article className="group text-center">
                    {m.photo && (<div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden ring-2 ring-ceniza/10 group-hover:ring-brasa/30 transition-all duration-500"><Image src={imageUrl(m.photo, 400)} alt={m.photo.alt || m.name} fill sizes="192px" className="object-cover" placeholder={blurUrl(m.photo) ? 'blur' : 'empty'} blurDataURL={blurUrl(m.photo) || undefined} /></div>)}
                    <h3 className="font-display italic text-crema text-xl">{m.name}</h3>
                    <p className="mt-1 font-body text-xs text-oro uppercase tracking-[0.15em]">{m.role}</p>
                    {m.bio && <p className="mt-3 font-body text-sm text-ceniza/70 leading-relaxed max-w-xs mx-auto">{m.bio}</p>}
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Producers */}
      {producers.length > 0 && (
        <section className="section-padding bg-negro">
          <div className="max-w-[1400px] mx-auto">
            <SectionTitle title={page?.producersTitle || 'Nuestros productores'} subtitle={page?.producersSubtitle} />
            <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {producers.map((p, i) => (
                <ScrollReveal key={p._id} delay={i * 100}>
                  <article className="group">
                    {p.image && (<div className="relative aspect-[4/3] rounded-sm overflow-hidden mb-5"><Image src={imageUrl(p.image, 600)} alt={p.image.alt || p.name} fill sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" placeholder={blurUrl(p.image) ? 'blur' : 'empty'} blurDataURL={blurUrl(p.image) || undefined} /></div>)}
                    <h3 className="font-display italic text-crema text-xl">{p.name}</h3>
                    {(p.region || p.specialty) && <p className="mt-1 font-body text-xs text-ceniza uppercase tracking-[0.1em]">{[p.region, p.specialty].filter(Boolean).join(' — ')}</p>}
                    {p.description && <p className="mt-3 font-body text-sm text-ceniza/70 leading-relaxed">{p.description}</p>}
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
