'use client'

import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'

// ---------------------------------------------------------------------------
// Context — exposes the Lenis instance so children (parallax, scroll-to, etc.)
// can subscribe to scroll events without creating their own instance.
// ---------------------------------------------------------------------------
const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

// ---------------------------------------------------------------------------
// Provider — wraps the entire app and drives Lenis via rAF.
// ---------------------------------------------------------------------------
interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Skip smooth scroll if the user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.07,            // Luxury-grade inertia (lower = smoother)
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.8,  // Slightly dampen scroll speed for elegance
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
