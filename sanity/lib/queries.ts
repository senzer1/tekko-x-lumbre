import { groq } from 'next-sanity'

// Site Settings (singleton)
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    name,
    slogan,
    logo,
    address,
    phone,
    email,
    schedule[]{day, hours},
    instagram,
    facebook,
    tiktok,
    seoTitle,
    seoDescription,
    ogImage
  }
`

// Event Banner (singleton)
export const eventBannerQuery = groq`
  *[_type == "eventBanner" && isVisible == true][0]{
    text,
    startDate,
    endDate,
    isVisible,
    linkUrl,
    linkLabel
  }
`

// Home Page (singleton)
export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    heroTitle,
    heroSubtitle,
    heroAccroche,
    heroBackgroundImage{..., alt},
    heroCtaLabel,
    heroCtaUrl,
    conceptTitle,
    conceptSubtitle,
    conceptDescription,
    conceptImage{..., alt},
    tapasTitle,
    tapasSubtitle,
    tapasItems[]->{
      _id,
      name,
      slug,
      description,
      price,
      badge,
      image{..., alt},
      available,
      order
    },
    ambianceTitle,
    ambianceDescription,
    ambianceImages[]{..., alt, caption},
    reservationTitle,
    reservationSubtitle,
    reservationCtaLabel,
    reservationCtaUrl,
    reservationBackgroundImage{..., alt},
    metaTitle,
    metaDescription
  }
`

// Menu
export const menuCategoriesQuery = groq`
  *[_type == "menuCategory"] | order(order asc){
    _id,
    name,
    slug,
    order,
    description
  }
`

export const menuItemsQuery = groq`
  *[_type == "menuItem" && available != false] | order(order asc){
    _id,
    name,
    slug,
    description,
    price,
    badge,
    image{..., alt},
    category->{_id, name, slug},
    order
  }
`

export const menuItemsByCategoryQuery = groq`
  *[_type == "menuItem" && available != false && category->slug.current == $slug] | order(order asc){
    _id,
    name,
    slug,
    description,
    price,
    badge,
    image{..., alt},
    category->{_id, name, slug},
    order
  }
`

// History Page (singleton)
export const historyPageQuery = groq`
  *[_type == "historyPage"][0]{
    heroTitle,
    heroSubtitle,
    heroBackgroundImage{..., alt},
    storyTitle,
    storyContent,
    teamTitle,
    teamSubtitle,
    producersTitle,
    producersSubtitle,
    producersDescription,
    metaTitle,
    metaDescription
  }
`

// Team Members
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc){
    _id,
    name,
    role,
    photo{..., alt},
    bio,
    order
  }
`

// Producers
export const producersQuery = groq`
  *[_type == "producer"] | order(name asc){
    _id,
    name,
    region,
    specialty,
    description,
    image{..., alt},
    url
  }
`

// Reservation Page (singleton)
export const reservationPageQuery = groq`
  *[_type == "reservationPage"][0]{
    title,
    subtitle,
    description,
    practicalAddress,
    practicalPhone,
    practicalEmail,
    mapUrl,
    schedule[]{day, hours},
    note,
    metaTitle,
    metaDescription
  }
`

// Contact Page (singleton)
export const contactPageQuery = groq`
  *[_type == "contactPage"][0]{
    title,
    subtitle,
    mapEmbedUrl,
    accessInfo,
    metaTitle,
    metaDescription
  }
`
