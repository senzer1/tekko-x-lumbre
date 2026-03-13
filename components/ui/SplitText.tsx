'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'

interface SplitTextProps {
  children: string
  className?: string
  /** Element to render (h1, h2, p, span) */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Time between each word reveal (seconds) */
  stagger?: number
  /** Once = true means it only animates once when entering viewport */
  once?: boolean
}

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { delay: number; stagger: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
}

const wordVariants: Variants = {
  hidden: {
    y: '110%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1], // easeOutCubic — fluid deceleration
    },
  },
}

export default function SplitText({
  children,
  className = '',
  as: Tag = 'h1',
  delay = 0,
  stagger = 0.08,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-10% 0px' })

  const words = children.split(' ')

  // Use a wrapper div for the ref (type-safe) and render the semantic tag inside
  return (
    <div ref={ref} aria-label={children}>
      <Tag className={className} aria-hidden="true">
        <motion.span
          className="inline"
          variants={containerVariants}
          custom={{ delay, stagger }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="inline-block overflow-hidden"
            >
              <motion.span
                className="inline-block"
                variants={wordVariants}
              >
                {word}
              </motion.span>
              {/* Preserve whitespace between words */}
              {i < words.length - 1 && (
                <span className="inline-block w-[0.3em]" />
              )}
            </span>
          ))}
        </motion.span>
      </Tag>
    </div>
  )
}
