// Sanity base types
export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityImage {
  _type: 'image'
  _key?: string
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
  caption?: string
}

export interface ScheduleEntry {
  day: string
  hours: string
}

export interface SeoFields {
  metaTitle?: string
  metaDescription?: string
}

// Portable Text block (simplified)
export interface PortableTextBlock {
  _type: 'block'
  _key: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks: string[]
  }>
  style: string
  markDefs: Array<{
    _key: string
    _type: string
    href?: string
    blank?: boolean
  }>
}

// Site Settings
export interface SiteSettings {
  name: string
  slogan?: string
  logo?: SanityImage
  address: string
  phone: string
  email: string
  schedule?: ScheduleEntry[]
  instagram?: string
  facebook?: string
  tiktok?: string
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
}

// Event Banner
export interface EventBanner {
  text: string
  startDate?: string
  endDate?: string
  isVisible: boolean
  linkUrl?: string
  linkLabel?: string
}

// Home Page
export interface HomePage extends SeoFields {
  heroTitle: string
  heroSubtitle?: string
  heroAccroche?: string
  heroBackgroundImage: SanityImage
  heroCtaLabel: string
  heroCtaUrl: string
  conceptTitle: string
  conceptSubtitle?: string
  conceptDescription?: PortableTextBlock[]
  conceptImage?: SanityImage
  tapasTitle: string
  tapasSubtitle?: string
  tapasItems?: MenuItem[]
  ambianceTitle: string
  ambianceDescription?: string
  ambianceImages?: SanityImage[]
  reservationTitle: string
  reservationSubtitle?: string
  reservationCtaLabel: string
  reservationCtaUrl: string
  reservationBackgroundImage?: SanityImage
}

// Menu
export type MenuBadge = 'signature' | 'nuevo' | 'temporada' | ''

export interface MenuCategory {
  _id: string
  name: string
  slug: SanitySlug
  order: number
  description?: string
}

export interface MenuItem {
  _id: string
  name: string
  slug: SanitySlug
  description?: string
  price: number
  badge?: MenuBadge
  image?: SanityImage
  category?: { _id: string; name: string; slug: SanitySlug }
  available: boolean
  order: number
}

// History Page
export interface HistoryPage extends SeoFields {
  heroTitle: string
  heroSubtitle?: string
  heroBackgroundImage: SanityImage
  storyTitle?: string
  storyContent?: PortableTextBlock[]
  teamTitle?: string
  teamSubtitle?: string
  producersTitle?: string
  producersSubtitle?: string
  producersDescription?: PortableTextBlock[]
}

// Team Member
export interface TeamMember {
  _id: string
  name: string
  role: string
  photo: SanityImage
  bio?: string
  order: number
}

// Producer
export interface Producer {
  _id: string
  name: string
  region?: string
  specialty?: string
  description?: string
  image?: SanityImage
  url?: string
}

// Reservation Page
export interface ReservationPage extends SeoFields {
  title: string
  subtitle?: string
  description?: string
  practicalAddress?: string
  practicalPhone?: string
  practicalEmail?: string
  mapUrl?: string
  schedule?: ScheduleEntry[]
  note?: string
}

// Contact Page
export interface ContactPage extends SeoFields {
  title: string
  subtitle?: string
  mapEmbedUrl?: string
  accessInfo?: PortableTextBlock[]
}

// Reservation form data
export interface ReservationFormData {
  nombre: string
  email: string
  telefono: string
  fecha: string
  hora: string
  comensales: number
  mensaje?: string
}
