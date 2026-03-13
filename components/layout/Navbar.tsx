'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import type { SiteSettings } from '@/types/sanity'

interface NavbarProps {
  settings: SiteSettings | null
}

const NAV_LINKS = [
  { href: '/carta', label: 'Carta' },
  { href: '/historia', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-negro/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <span className="font-display italic text-crema text-2xl md:text-3xl tracking-wide">
              {settings?.name || 'LUMBRE'}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    group relative py-1
                    font-body text-xs uppercase tracking-[0.2em]
                    transition-colors duration-300
                    ${isActive ? 'text-crema' : 'text-ceniza hover:text-crema'}
                  `}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className={`
                      absolute -bottom-0.5 left-0 h-px bg-brasa
                      transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]
                      origin-left
                      ${isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'}
                    `}
                  />
                </Link>
              )
            })}

            {/* CTA button with fill animation */}
            <Link
              href="/reservar"
              className={`
                group relative overflow-hidden
                px-6 py-2.5 border
                font-body text-xs uppercase tracking-[0.2em]
                transition-colors duration-500
                ${
                  pathname === '/reservar'
                    ? 'border-brasa bg-brasa text-crema'
                    : 'border-crema/20 text-crema hover:text-negro'
                }
              `}
            >
              {pathname !== '/reservar' && (
                <span
                  className="
                    absolute inset-0 bg-crema
                    origin-left scale-x-0
                    transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
                    group-hover:scale-x-100
                  "
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">Reservar</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center gap-1.5"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileOpen}
          >
            <span
              className={`block w-full h-px bg-crema transition-all duration-300 ${
                isMobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''
              }`}
            />
            <span
              className={`block w-full h-px bg-crema transition-all duration-300 ${
                isMobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <motion.div
        className="fixed inset-0 z-40 bg-negro md:hidden"
        initial={false}
        animate={isMobileOpen ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: isMobileOpen ? 'auto' : 'none' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link, i) => {
            const isActive = pathname === link.href
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isMobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: isMobileOpen ? 0.15 + i * 0.08 : 0, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className={`
                    font-display italic text-3xl transition-colors duration-300
                    ${isActive ? 'text-brasa' : 'text-crema hover:text-brasa'}
                  `}
                >
                  {link.label}
                </Link>
              </motion.div>
            )
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: isMobileOpen ? 0.4 : 0, duration: 0.4 }}
          >
            <Link
              href="/reservar"
              className="mt-4 px-10 py-4 bg-brasa text-crema font-body text-xs uppercase tracking-[0.2em]"
            >
              Reservar
            </Link>
          </motion.div>

          {settings?.address && (
            <motion.p
              className="mt-8 font-body text-xs text-ceniza/50 uppercase tracking-[0.1em]"
              initial={{ opacity: 0 }}
              animate={isMobileOpen ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              {settings.address}
            </motion.p>
          )}
        </div>
      </motion.div>
    </>
  )
}
