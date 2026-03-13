import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { homePageQuery } from '@/sanity/lib/queries'
import type { HomePage } from '@/types/sanity'
import Hero from '@/components/sections/Hero'
import Concept from '@/components/sections/Concept'
import TapasHighlight from '@/components/sections/TapasHighlight'
import Ambiance from '@/components/sections/Ambiance'
import ReservationCTA from '@/components/sections/ReservationCTA'
import SectionDivider from '@/components/ui/SectionDivider'
import StaticHome from '@/components/sections/StaticHome'

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<HomePage | null>(homePageQuery)
  return {
    title: page?.metaTitle || 'LUMBRE — Restaurante & Bar à Tapas',
    description: page?.metaDescription || 'Cocina de brasa y tapas de autor en Valencia.',
  }
}

export default async function Home() {
  const page = await client.fetch<HomePage | null>(homePageQuery)

  // No Sanity data yet → render the full static homepage
  if (!page) {
    return <StaticHome />
  }

  return (
    <>
      <Hero data={page} />
      <SectionDivider variant="ornament" />
      <Concept data={page} />
      <SectionDivider />
      <TapasHighlight data={page} />
      <SectionDivider variant="ornament" />
      <Ambiance data={page} />
      <SectionDivider />
      <ReservationCTA data={page} />
    </>
  )
}
