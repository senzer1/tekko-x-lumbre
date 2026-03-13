import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery, eventBannerQuery } from '@/sanity/lib/queries'
import type { SiteSettings, EventBanner } from '@/types/sanity'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import EventBannerComponent from '@/components/layout/EventBanner'
import GrainOverlay from '@/components/ui/GrainOverlay'
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScroll from '@/components/providers/SmoothScroll'
import Preloader from '@/components/ui/Preloader'
import JsonLd from '@/components/seo/JsonLd'
import ScrollProgress from '@/components/ui/ScrollProgress'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery)
  return {
    title: settings?.metaTitle || 'LUMBRE — Restaurante & Bar à Tapas',
    description: settings?.metaDescription || 'Cocina de brasa y tapas de autor en Valencia.',
    metadataBase: new URL('https://lumbre.es'),
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, banner] = await Promise.all([
    client.fetch<SiteSettings | null>(siteSettingsQuery),
    client.fetch<EventBanner | null>(eventBannerQuery),
  ])

  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <JsonLd settings={settings} />
      </head>
      <body className="bg-negro text-crema">
        <Preloader />
        <ScrollProgress />
        <SmoothScroll>
          <GrainOverlay />
          <CustomCursor />
          {banner && <EventBannerComponent banner={banner} />}
          <Navbar settings={settings} />
          <main>{children}</main>
          <Footer settings={settings} />
        </SmoothScroll>
      </body>
    </html>
  )
}
