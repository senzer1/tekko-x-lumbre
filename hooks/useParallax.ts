'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * useParallax — drives a CSS translateY based on scroll position.
 *
 * @param speed  Multiplier for the parallax effect (0.05 = subtle, 0.15 = strong).
 *               Positive = element moves slower than scroll (typical for backgrounds).
 * @returns      { ref, offset } — attach `ref` to the container, use `offset` for transform.
 */
export function useParallax(speed = 0.08) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId: number

    function onScroll() {
      rafId = requestAnimationFrame(() => {
        const rect = el!.getBoundingClientRect()
        const windowH = window.innerHeight
        // Calculate how far through the viewport the element is (-1 to +1)
        const progress = (rect.top + rect.height / 2 - windowH / 2) / windowH
        setOffset(progress * speed * 100) // percentage-based offset
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initial calculation

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [speed])

  return { ref, offset }
}
