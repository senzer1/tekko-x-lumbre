'use client'

import Link from 'next/link'
import type { HomePage } from '@/types/sanity'
import { imageUrl, blurUrl } from '@/sanity/lib/image'
import ParallaxImage from '@/components/ui/ParallaxImage'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SplitText from '@/components/ui/SplitText'

interface ReservationCTAProps {
  data: HomePage
}

export default function ReservationCTA({ data }: ReservationCTAProps) {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Parallax background */}
      {data.reservationBackgroundImage && (
        <>
          <ParallaxImage
            src={imageUrl(data.reservationBackgroundImage, 1920)}
            alt={data.reservationBackgroundImage.alt || 'Reservar'}
            sizes="100vw"
            blurDataURL={blurUrl(data.reservationBackgroundImage) || undefined}
            speed={0.1}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-negro/70" aria-hidden="true" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {data.reservationSubtitle && (
          <ScrollReveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-oro mb-6">
              {data.reservationSubtitle}
            </p>
          </ScrollReveal>
        )}

        <SplitText
          as="h2"
          className="font-display italic font-light text-[clamp(2rem,5vw,4rem)] leading-[1] text-crema mb-10"
          delay={0.15}
          stagger={0.1}
        >
          {data.reservationTitle}
        </SplitText>

        {data.reservationCtaLabel && data.reservationCtaUrl && (
          <ScrollReveal delay={200}>
            <Link
              href={data.reservationCtaUrl}
              className="
                group relative inline-block px-12 py-4
                bg-brasa text-crema
                font-body text-xs uppercase tracking-[0.2em]
                overflow-hidden
                transition-all duration-500
                hover:shadow-[0_0_40px_rgba(232,82,26,0.25)]
              "
            >
              {/* Hover shimmer effect */}
              <span
                className="
                  absolute inset-0 -translate-x-full
                  bg-gradient-to-r from-transparent via-white/10 to-transparent
                  group-hover:translate-x-full
                  transition-transform duration-700 ease-out
                "
                aria-hidden="true"
              />
              <span className="relative z-10">{data.reservationCtaLabel}</span>
            </Link>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
