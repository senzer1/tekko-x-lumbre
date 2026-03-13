import Link from 'next/link'
import type { SiteSettings } from '@/types/sanity'

interface FooterProps {
  settings: SiteSettings | null
}

const FOOTER_LINKS = [
  { href: '/carta', label: 'Carta' },
  { href: '/historia', label: 'Nuestra historia' },
  { href: '/reservar', label: 'Reservar' },
  { href: '/contacto', label: 'Contacto' },
]

/**
 * AnimatedLink — underline grows from left on hover using ::after pseudo.
 * Achieves a refined editorial feel without JavaScript.
 */
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="
        group relative font-body text-sm text-ceniza w-fit
        transition-colors duration-300 hover:text-crema
      "
    >
      {label}
      <span
        className="
          absolute -bottom-0.5 left-0 w-full h-px
          bg-brasa/40 origin-left scale-x-0
          transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]
          group-hover:scale-x-100
        "
      />
    </Link>
  )
}

export default function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear()

  const name = settings?.name || 'LUMBRE'
  const slogan = settings?.slogan || 'Cocina de brasa y tapas de autor'
  const address = settings?.address || 'Calle del Fuego, 42 — 46001 Valencia'
  const phone = settings?.phone || '+34 961 234 567'
  const email = settings?.email || 'hola@lumbre.es'

  return (
    <footer className="bg-tierra border-t border-ceniza/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="font-display italic text-crema text-2xl">
              {name}
            </Link>
            <p className="mt-3 font-body text-sm text-ceniza leading-relaxed max-w-xs">
              {slogan}
            </p>
            {/* Decorative line */}
            <div className="mt-6 w-8 h-px bg-brasa/30" />
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-[0.2em] text-oro mb-6">
              Explorar
            </h4>
            <nav className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href} label={link.label} />
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-[0.2em] text-oro mb-6">
              Contacto
            </h4>
            <div className="space-y-2 font-body text-sm text-ceniza">
              <p>{address}</p>
              <p>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="group relative w-fit inline-block hover:text-crema transition-colors"
                >
                  {phone}
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-brasa/40 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${email}`}
                  className="group relative w-fit inline-block hover:text-crema transition-colors"
                >
                  {email}
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-brasa/40 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </p>
            </div>

            {/* Social */}
            <div className="flex gap-5 mt-6">
              <a
                href={settings?.instagram || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-ceniza uppercase tracking-[0.1em] hover:text-crema transition-colors duration-300"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href={settings?.facebook || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-ceniza uppercase tracking-[0.1em] hover:text-crema transition-colors duration-300"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href={settings?.tiktok || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-ceniza uppercase tracking-[0.1em] hover:text-crema transition-colors duration-300"
                aria-label="TikTok"
              >
                TK
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-ceniza/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-ceniza/40">
            &copy; {year} {settings?.name || 'LUMBRE'}. Todos los derechos reservados.
          </p>
          <p className="font-body text-[0.6rem] text-ceniza/20 uppercase tracking-[0.15em]">
            Diseñado con fuego
          </p>
        </div>
      </div>
    </footer>
  )
}
