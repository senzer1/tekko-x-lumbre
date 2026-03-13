'use client'

import Image from 'next/image'
import type { HomePage } from '@/types/sanity'
import { imageUrl, blurUrl } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/ui/PortableTextComponents'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import { useParallax } from '@/hooks/useParallax'

interface ConceptProps {
  data: HomePage
}

export default function Concept({ data }: ConceptProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(imageContainerRef, { once: true, margin: '-15%' })
  const { ref: parallaxRef, offset } = useParallax(0.05)

  return (
    <section className="section-padding bg-negro">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <div>
            <SectionTitle subtitle={data.conceptSubtitle} title={data.conceptTitle} />
            {data.conceptDescription && (
              <ScrollReveal delay={200}>
                <div className="mt-8 font-body text-sm md:text-base text-ceniza leading-relaxed space-y-4 max-w-lg">
                  <PortableText value={data.conceptDescription} components={portableTextComponents} />
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Image side — clip-path reveal + parallax */}
          {data.conceptImage && (
            <div ref={imageContainerRef}>
              <motion.div
                ref={parallaxRef}
                className="relative aspect-[4/5] rounded-sm overflow-hidden"
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              >
                <div
                  className="absolute inset-0 will-change-transform"
                  style={{ transform: `translateY(${offset}%) scale(1.08)` }}
                >
                  <Image
                    src={imageUrl(data.conceptImage, 800)}
                    alt={data.conceptImage.alt || 'Concepto'}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    placeholder={blurUrl(data.conceptImage) ? 'blur' : 'empty'}
                    blurDataURL={blurUrl(data.conceptImage) || undefined}
                  />
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-negro/30 to-transparent"
                  aria-hidden="true"
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
