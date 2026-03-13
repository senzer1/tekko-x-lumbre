'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { HomePage } from '@/types/sanity'
import { imageUrl, blurUrl } from '@/sanity/lib/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTitle from '@/components/ui/SectionTitle'

interface AmbianceProps {
  data: HomePage
}

/**
 * Asymmetric aspect ratios for a magazine-style masonry layout.
 * The pattern cycles to create visual rhythm and prevent monotony.
 */
const ASPECT_PATTERN = [
  'aspect-[4/5]',   // Tall portrait
  'aspect-[3/2]',   // Wide landscape
  'aspect-[1/1]',   // Square
  'aspect-[3/4]',   // Portrait
  'aspect-[16/9]',  // Cinematic wide
  'aspect-[4/3]',   // Standard
]

/** Staggered vertical offsets for the masonry feel on large screens */
const OFFSET_PATTERN = [
  'lg:mt-0',
  'lg:mt-16',
  'lg:mt-8',
  'lg:mt-24',
  'lg:mt-4',
  'lg:mt-12',
]

export default function Ambiance({ data }: AmbianceProps) {
  const images = data.ambianceImages ?? []
  if (images.length === 0) return null

  return (
    <section className="section-padding bg-negro">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Sticky text side */}
          <div className="lg:sticky lg:top-32">
            <SectionTitle title={data.ambianceTitle} />
            {data.ambianceDescription && (
              <ScrollReveal delay={200}>
                <p className="mt-8 font-body text-sm md:text-base text-ceniza leading-relaxed max-w-lg">
                  {data.ambianceDescription}
                </p>
              </ScrollReveal>
            )}

            {/* Decorative ornamental detail */}
            <ScrollReveal delay={400}>
              <div className="mt-12 flex items-center gap-3">
                <div className="w-8 h-px bg-brasa/40" />
                <span className="font-display italic text-ceniza/30 text-sm">el ambiente</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Masonry gallery */}
          <div className="space-y-6">
            {images.map((img, i) => (
              <AmbianceImage
                key={img._key || `ambiance-${i}`}
                src={imageUrl(img, 900)}
                alt={img.alt || `Ambiente ${i + 1}`}
                blurSrc={blurUrl(img) || undefined}
                caption={img.caption}
                aspectClass={ASPECT_PATTERN[i % ASPECT_PATTERN.length]}
                offsetClass={OFFSET_PATTERN[i % OFFSET_PATTERN.length]}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Individual image with clip-path reveal animation
// ---------------------------------------------------------------------------

interface AmbianceImageProps {
  src: string
  alt: string
  blurSrc?: string
  caption?: string
  aspectClass: string
  offsetClass: string
  index: number
}

function AmbianceImage({
  src,
  alt,
  blurSrc,
  caption,
  aspectClass,
  offsetClass,
  index,
}: AmbianceImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-12%' })

  // Alternate reveal direction for visual variety
  const clipFrom = index % 2 === 0
    ? 'inset(0 100% 0 0)'   // Reveal from left
    : 'inset(0 0 0 100%)'   // Reveal from right

  return (
    <div ref={ref} className={offsetClass}>
      <motion.div
        className={`relative ${aspectClass} rounded-sm overflow-hidden`}
        initial={{ clipPath: clipFrom }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0%)' } : {}}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width:1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
          placeholder={blurSrc ? 'blur' : 'empty'}
          blurDataURL={blurSrc}
        />
      </motion.div>
      {caption && (
        <motion.p
          className="mt-3 font-display italic text-ceniza/50 text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {caption}
        </motion.p>
      )}
    </div>
  )
}
