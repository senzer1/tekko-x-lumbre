'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { HomePage } from '@/types/sanity'
import { imageUrl, blurUrl } from '@/sanity/lib/image'
import ParallaxImage from '@/components/ui/ParallaxImage'
import SplitText from '@/components/ui/SplitText'

interface HeroProps {
  data: HomePage
}

export default function Hero({ data }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Parallax background image */}
      {data.heroBackgroundImage && (
        <>
          <ParallaxImage
            src={imageUrl(data.heroBackgroundImage, 1920)}
            alt={data.heroBackgroundImage.alt || 'LUMBRE'}
            priority
            sizes="100vw"
            blurDataURL={blurUrl(data.heroBackgroundImage) || undefined}
            speed={0.06}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-negro/60" aria-hidden="true" />
          <div
            className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-negro to-transparent"
            aria-hidden="true"
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Subtitle — elegant fade-in */}
        {data.heroSubtitle && (
          <motion.p
            className="font-body text-xs uppercase tracking-[0.3em] text-oro mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            {data.heroSubtitle}
          </motion.p>
        )}

        {/* Title — cinematic word-by-word reveal */}
        <SplitText
          as="h1"
          className="font-display italic font-light text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] text-crema mb-8"
          delay={0.5}
          stagger={0.1}
        >
          {data.heroTitle}
        </SplitText>

        {/* Accroche — fade up with delay */}
        {data.heroAccroche && (
          <motion.p
            className="font-body text-sm md:text-base text-ceniza max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
          >
            {data.heroAccroche}
          </motion.p>
        )}

        {/* CTA button — fade up last */}
        {data.heroCtaLabel && data.heroCtaUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
          >
            <Link
              href={data.heroCtaUrl}
              className="
                group relative inline-block px-10 py-4
                border border-crema/30
                font-body text-xs uppercase tracking-[0.2em] text-crema
                overflow-hidden
                transition-colors duration-500
                hover:text-negro
              "
            >
              {/* Animated fill on hover */}
              <span
                className="
                  absolute inset-0 bg-crema
                  origin-left scale-x-0
                  transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
                  group-hover:scale-x-100
                "
                aria-hidden="true"
              />
              <span className="relative z-10">{data.heroCtaLabel}</span>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-crema/0 via-crema/40 to-crema/0"
          animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
