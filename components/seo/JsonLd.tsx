import type { SiteSettings } from '@/types/sanity'

interface JsonLdProps {
  settings: SiteSettings | null
}

/**
 * Generates JSON-LD structured data for a Restaurant entity.
 * Google uses this to show rich snippets: hours, address, cuisine, contact.
 *
 * Note: dangerouslySetInnerHTML is safe here because the content comes
 * exclusively from JSON.stringify of our own structured data object —
 * no user-provided HTML is injected.
 *
 * @see https://schema.org/Restaurant
 */
export default function JsonLd({ settings }: JsonLdProps) {
  if (!settings) return null

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: settings.name || 'LUMBRE',
    description: settings.metaDescription || 'Restaurante & bar à tapas de autor.',
    url: 'https://lumbre.es',
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
    address: settings.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: settings.address,
        }
      : undefined,
    servesCuisine: ['Spanish', 'Tapas', 'Mediterranean'],
    priceRange: '$$',
    openingHoursSpecification: settings.schedule?.map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.day,
      opens: entry.hours?.split(' - ')[0]?.trim(),
      closes: entry.hours?.split(' - ')[1]?.trim(),
    })),
    sameAs: [
      settings.instagram,
      settings.facebook,
      settings.tiktok,
    ].filter(Boolean),
    acceptsReservations: true,
    hasMenu: 'https://lumbre.es/carta',
  }

  // JSON.stringify produces safe JSON — no user-controlled HTML is involved
  const jsonString = JSON.stringify(structuredData)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  )
}
