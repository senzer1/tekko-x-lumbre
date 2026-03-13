'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const [phase, setPhase] = useState<'logo' | 'line' | 'exit'>('logo')

  useEffect(() => {
    // Only show preloader once per session
    if (sessionStorage.getItem('lumbre-loaded')) {
      setIsVisible(false)
      return
    }

    // Phase timeline: logo → line → exit → hide
    const t1 = setTimeout(() => setPhase('line'), 600)
    const t2 = setTimeout(() => setPhase('exit'), 1400)
    const t3 = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem('lumbre-loaded', '1')
    }, 2200)

    // Lock scroll during preloader
    document.body.style.overflow = 'hidden'

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      document.body.style.overflow = ''
    }
  }, [])

  // Unlock scroll when preloader is done
  useEffect(() => {
    if (!isVisible) {
      document.body.style.overflow = ''
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-negro"
          initial={{ y: 0 }}
          animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Logo text */}
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.h1
              className="font-display italic font-light text-[clamp(2.5rem,8vw,6rem)] text-crema leading-none tracking-wide"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
            >
              LUMBRE
            </motion.h1>
          </motion.div>

          {/* Ornamental line */}
          <motion.div
            className="mt-6 h-px bg-gradient-to-r from-transparent via-oro/60 to-transparent"
            initial={{ width: 0 }}
            animate={
              phase === 'line' || phase === 'exit'
                ? { width: '120px' }
                : { width: 0 }
            }
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          />

          {/* Subtitle */}
          <motion.p
            className="mt-4 font-body text-[0.65rem] uppercase tracking-[0.4em] text-ceniza/60"
            initial={{ opacity: 0 }}
            animate={
              phase === 'line' || phase === 'exit'
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Restaurante & Bar
          </motion.p>

          {/* Decorative ember dot */}
          <motion.div
            className="absolute bottom-12 w-1.5 h-1.5 rounded-full bg-brasa/50"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
