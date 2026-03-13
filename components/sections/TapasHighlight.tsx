'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { HomePage, MenuItem } from '@/types/sanity'
import { imageUrl, blurUrl } from '@/sanity/lib/image'
import SectionTitle from '@/components/ui/SectionTitle'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface TapasHighlightProps {
  data: HomePage
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

const BADGE_LABEL: Record<string, string> = {
  signature: 'Signature',
  nuevo: 'Nuevo',
  temporada: 'Temporada',
}

export default function TapasHighlight({ data }: TapasHighlightProps) {
  const items = (data.tapasItems ?? []) as MenuItem[]

  const sectionRef = useRef<HTMLElement>(null)

  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Map vertical scroll to horizontal movement
  // Cards slide from right to left as user scrolls down
  const x = useTransform(
    scrollYProgress,
    [0.15, 0.85],
    ['5%', `-${Math.max((items.length - 1) * 25, 0)}%`],
  )

  if (items.length === 0) return null

  return (
    <section ref={sectionRef} className="relative bg-tierra overflow-hidden">
      {/* Header — always visible */}
      <div className="section-padding pb-0">
        <div className="max-w-[1400px] mx-auto">
          <SectionTitle subtitle={data.tapasSubtitle} title={data.tapasTitle} />
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div className="relative h-[80vh] md:h-[90vh] mt-12 md:mt-16">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-8 pl-6 md:pl-10 lg:pl-16"
            style={{ x }}
          >
            {items.map((item, i) => (
              <motion.article
                key={item._id}
                className="group relative shrink-0 w-[75vw] sm:w-[55vw] md:w-[40vw] lg:w-[30vw]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.33, 1, 0.68, 1] }}
              >
                {item.image && (
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-5">
                    <Image
                      src={imageUrl(item.image, 600)}
                      alt={item.image.alt || item.name}
                      fill
                      sizes="(max-width:640px) 75vw,(max-width:1024px) 55vw,30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      placeholder={blurUrl(item.image) ? 'blur' : 'empty'}
                      blurDataURL={blurUrl(item.image) || undefined}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-negro/60 via-transparent to-transparent"
                      aria-hidden="true"
                    />

                    {/* Badge */}
                    {item.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-brasa/90 text-crema font-body text-[0.6rem] uppercase tracking-[0.2em] rounded-full">
                        {BADGE_LABEL[item.badge] || item.badge}
                      </span>
                    )}

                    {/* Price */}
                    <span className="absolute bottom-4 right-4 font-body text-oro text-sm tabular-nums">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                )}

                <h3 className="font-display italic text-crema text-xl md:text-2xl">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="mt-2 font-body text-ceniza/60 text-sm line-clamp-2">
                    {item.description}
                  </p>
                )}
              </motion.article>
            ))}

            {/* "Ver la carta" card at the end */}
            <div className="shrink-0 w-[60vw] sm:w-[40vw] md:w-[30vw] lg:w-[22vw] flex items-center justify-center">
              <Link
                href="/carta"
                className="
                  group relative inline-flex items-center gap-3
                  px-10 py-4 border border-ceniza/20
                  font-body text-xs uppercase tracking-[0.2em] text-ceniza
                  transition-all duration-500
                  hover:border-crema/40 hover:text-crema
                "
              >
                <span>Ver la carta</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile fallback CTA */}
      <ScrollReveal>
        <div className="md:hidden px-6 pb-16 pt-8 text-center">
          <Link
            href="/carta"
            className="inline-block px-10 py-4 border border-ceniza/20 font-body text-xs uppercase tracking-[0.2em] text-ceniza transition-all duration-500 hover:border-crema/40 hover:text-crema"
          >
            Ver la carta completa
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
