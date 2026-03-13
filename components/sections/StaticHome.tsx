'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionDivider from '@/components/ui/SectionDivider'

/* ─── Unsplash images (high-quality restaurant/tapas photos) ─── */
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80&auto=format',
  concept: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&auto=format',
  reservation: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80&auto=format',
  ambiance1: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=900&q=80&auto=format',
  ambiance2: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80&auto=format',
  ambiance3: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&q=80&auto=format',
  ambiance4: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&q=80&auto=format',
  tapas1: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&q=80&auto=format',
  tapas2: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80&auto=format',
  tapas3: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&q=80&auto=format',
  tapas4: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format',
}

const TAPAS_ITEMS = [
  {
    name: 'Pulpo a la Brasa',
    description: 'Pulpo gallego sobre crema de patata ahumada, pimentón de la Vera',
    price: '18',
    badge: 'Signature',
    image: IMAGES.tapas1,
  },
  {
    name: 'Croquetas de Jamón',
    description: 'Croquetas cremosas de jamón ibérico de bellota, con un toque de nuez moscada',
    price: '12',
    badge: 'Nuevo',
    image: IMAGES.tapas2,
  },
  {
    name: 'Tataki de Atún',
    description: 'Atún rojo sellado con sésamo, wakame y emulsión de wasabi',
    price: '22',
    badge: '',
    image: IMAGES.tapas3,
  },
  {
    name: 'Costillas Ibéricas',
    description: 'Costillas glaseadas con miel de romero, reducción de Pedro Ximénez',
    price: '16',
    badge: 'Temporada',
    image: IMAGES.tapas4,
  },
]

/* ─── Hero ────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <Image
        src={IMAGES.hero}
        alt="LUMBRE — Restaurante & Bar à Tapas"
        fill
        priority
        sizes="100vw"
        className="object-cover scale-110"
      />
      <div className="absolute inset-0 bg-negro/65" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-negro to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          className="font-body text-xs uppercase tracking-[0.3em] text-oro mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Restaurante & Bar à Tapas
        </motion.p>

        <SplitText
          as="h1"
          className="font-display italic font-light text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] text-crema mb-8"
          delay={0.5}
          stagger={0.1}
        >
          El Fuego Que Despierta Los Sabores
        </SplitText>

        <motion.p
          className="font-body text-sm md:text-base text-ceniza max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Cocina de brasa, tapas de autor y vinos naturales en el corazón de la ciudad.
          Una experiencia gastronómica donde la tradición encuentra la llama.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <Link
            href="/reservar"
            className="
              group relative inline-block px-10 py-4
              border border-crema/30
              font-body text-xs uppercase tracking-[0.2em] text-crema
              overflow-hidden transition-colors duration-500 hover:text-negro
            "
          >
            <span
              className="absolute inset-0 bg-crema origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"
              aria-hidden="true"
            />
            <span className="relative z-10">Reservar Mesa</span>
          </Link>
        </motion.div>
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

/* ─── Concept ─────────────────────────────────── */
function ConceptSection() {
  return (
    <section className="section-padding bg-negro">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <ScrollReveal>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-oro mb-4">
                Nuestro Concepto
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="font-display italic font-light text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-crema">
                Donde el Fuego Cuenta Historias
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="mt-8 font-body text-sm md:text-base text-ceniza leading-relaxed space-y-4 max-w-lg">
                <p>
                  En LUMBRE, cada plato nace del fuego. Nuestra cocina se construye
                  alrededor de la brasa, respetando los tiempos del producto y las
                  técnicas que nuestros abuelos perfeccionaron.
                </p>
                <p>
                  Trabajamos con productores locales, pescadores artesanales y
                  ganaderos comprometidos. Cada ingrediente tiene nombre, origen y
                  una historia que merece ser contada.
                </p>
                <p>
                  La carta evoluciona con las estaciones: lo que la tierra ofrece hoy
                  es lo que servimos mañana. Así de simple, así de honesto.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Image */}
          <ScrollReveal>
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <Image
                src={IMAGES.concept}
                alt="Cocina de brasa"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-negro/30 to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Tapas Highlight ─────────────────────────── */
function TapasSection() {
  return (
    <section className="section-padding bg-tierra">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <p className="font-body text-xs uppercase tracking-[0.3em] text-oro mb-4">
            La Carta
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="font-display italic font-light text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-crema mb-12 md:mb-16">
            Nuestras Tapas
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TAPAS_ITEMS.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 100}>
              <article className="group">
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-negro/60 via-transparent to-transparent" />

                  {item.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-brasa/90 text-crema font-body text-[0.6rem] uppercase tracking-[0.2em] rounded-full">
                      {item.badge}
                    </span>
                  )}

                  <span className="absolute bottom-4 right-4 font-body text-oro text-sm tabular-nums">
                    {item.price} &euro;
                  </span>
                </div>

                <h3 className="font-display italic text-crema text-xl md:text-2xl">
                  {item.name}
                </h3>
                <p className="mt-2 font-body text-ceniza/60 text-sm line-clamp-2">
                  {item.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500}>
          <div className="mt-16 text-center">
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
              <span>Ver la carta completa</span>
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
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ─── Ambiance ────────────────────────────────── */
function AmbianceSection() {
  const ambianceImages = [
    { src: IMAGES.ambiance1, alt: 'Interior cálido del restaurante', aspect: 'aspect-[4/5]', offset: 'lg:mt-0' },
    { src: IMAGES.ambiance2, alt: 'Barra de bar', aspect: 'aspect-[3/2]', offset: 'lg:mt-16' },
    { src: IMAGES.ambiance3, alt: 'Detalle de decoración', aspect: 'aspect-[1/1]', offset: 'lg:mt-8' },
    { src: IMAGES.ambiance4, alt: 'Terraza nocturna', aspect: 'aspect-[3/4]', offset: 'lg:mt-24' },
  ]

  return (
    <section className="section-padding bg-negro">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Sticky text */}
          <div className="lg:sticky lg:top-32">
            <ScrollReveal>
              <h2 className="font-display italic font-light text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-crema">
                El Ambiente
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="mt-8 font-body text-sm md:text-base text-ceniza leading-relaxed max-w-lg">
                Un espacio donde la luz tenue de las velas se mezcla con el crepitar
                del fuego. Piedra, madera y hierro forjado crean un ambiente íntimo
                que invita a quedarse. Cada rincón está pensado para que la
                conversación fluya y los sentidos se despierten.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="mt-12 flex items-center gap-3">
                <div className="w-8 h-px bg-brasa/40" />
                <span className="font-display italic text-ceniza/30 text-sm">el ambiente</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Gallery */}
          <div className="space-y-6">
            {ambianceImages.map((img, i) => (
              <ScrollReveal key={img.alt} delay={i * 150}>
                <div className={img.offset}>
                  <div className={`relative ${img.aspect} rounded-sm overflow-hidden`}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width:1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Reservation CTA ─────────────────────────── */
function ReservationSection() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <Image
        src={IMAGES.reservation}
        alt="Interior LUMBRE"
        fill
        sizes="100vw"
        className="object-cover scale-110"
      />
      <div className="absolute inset-0 bg-negro/70" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="font-body text-xs uppercase tracking-[0.3em] text-oro mb-6">
            Tu Mesa Te Espera
          </p>
        </ScrollReveal>

        <SplitText
          as="h2"
          className="font-display italic font-light text-[clamp(2rem,5vw,4rem)] leading-[1] text-crema mb-10"
          delay={0.15}
          stagger={0.1}
        >
          Reserva Tu Experiencia
        </SplitText>

        <ScrollReveal delay={200}>
          <Link
            href="/reservar"
            className="
              group relative inline-block px-12 py-4
              bg-brasa text-crema
              font-body text-xs uppercase tracking-[0.2em]
              overflow-hidden transition-all duration-500
              hover:shadow-[0_0_40px_rgba(232,82,26,0.25)]
            "
          >
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out"
              aria-hidden="true"
            />
            <span className="relative z-10">Reservar Ahora</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ─── Horarios / Info ─────────────────────────── */
function InfoSection() {
  return (
    <section className="section-padding bg-tierra">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
          {/* Horarios */}
          <ScrollReveal>
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-oro mb-6">Horarios</p>
              <div className="space-y-2 font-body text-sm text-ceniza">
                <p>Martes — Jueves: 19:00 – 23:30</p>
                <p>Viernes — Sábado: 19:00 – 00:30</p>
                <p>Domingo: 13:00 – 16:00</p>
                <p className="text-ceniza/40 mt-3">Lunes cerrado</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Ubicación */}
          <ScrollReveal delay={150}>
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-oro mb-6">Ubicación</p>
              <div className="space-y-2 font-body text-sm text-ceniza">
                <p>Calle del Fuego, 42</p>
                <p>46001 Valencia, España</p>
                <p className="mt-3">
                  <a
                    href="tel:+34961234567"
                    className="group relative w-fit inline-block hover:text-crema transition-colors"
                  >
                    +34 961 234 567
                    <span className="absolute -bottom-0.5 left-0 w-full h-px bg-brasa/40 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Filosofía */}
          <ScrollReveal delay={300}>
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-oro mb-6">Filosofía</p>
              <p className="font-body text-sm text-ceniza leading-relaxed">
                Producto de cercanía, fuego vivo y respeto por la tradición.
                Cada plato cuenta la historia de quien lo cultivó, lo pescó
                o lo crió.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Main Export ──────────────────────────────── */
export default function StaticHome() {
  return (
    <>
      <HeroSection />
      <SectionDivider variant="ornament" />
      <ConceptSection />
      <SectionDivider />
      <TapasSection />
      <SectionDivider variant="ornament" />
      <AmbianceSection />
      <SectionDivider />
      <ReservationSection />
      <SectionDivider variant="ornament" />
      <InfoSection />
    </>
  )
}
