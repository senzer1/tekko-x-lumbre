'use client'

import Image from 'next/image'
import { useParallax } from '@/hooks/useParallax'

interface ParallaxImageProps {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
  blurDataURL?: string
  speed?: number
  className?: string
  overlayClassName?: string
}

/**
 * ParallaxImage — an Image wrapped in a parallax container.
 * The image is scaled up slightly (110%) and translated on scroll
 * to create the parallax depth effect without showing gaps.
 */
export default function ParallaxImage({
  src,
  alt,
  priority = false,
  sizes = '100vw',
  blurDataURL,
  speed = 0.08,
  className = '',
  overlayClassName,
}: ParallaxImageProps) {
  const { ref, offset } = useParallax(speed)

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${offset}%) scale(1.1)` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL || undefined}
        />
      </div>
      {overlayClassName && (
        <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden="true" />
      )}
    </div>
  )
}
