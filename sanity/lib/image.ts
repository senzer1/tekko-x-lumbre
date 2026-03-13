import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function imageUrl(source: SanityImageSource, width: number): string {
  return urlFor(source).width(width).auto('format').quality(80).url()
}

export function blurUrl(source: SanityImageSource): string | null {
  try {
    return urlFor(source).width(20).quality(20).blur(50).url()
  } catch {
    return null
  }
}
