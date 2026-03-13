'use client'

import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SplitText from '@/components/ui/SplitText'
import SectionDivider from '@/components/ui/SectionDivider'

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80&auto=format',
  story: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format',
  chef1: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80&auto=format',
  chef2: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&q=80&auto=format',
  chef3: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&q=80&auto=format',
  producer1: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80&auto=format',
  producer2: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80&auto=format',
  producer3: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=600&q=80&auto=format',
}

const TEAM = [
  { name: 'Carlos Mendoza', role: 'Chef Ejecutivo', image: IMAGES.chef1, bio: 'Formado en San Sebastián y curtido en los fogones de Buenos Aires, Carlos aporta la fusión perfecta entre la cocina vasca y el espíritu del asador argentino.' },
  { name: 'Elena Vidal', role: 'Sommelier', image: IMAGES.chef2, bio: 'Con más de 12 años recorriendo bodegas de España y Francia, Elena construye una carta de vinos que dialoga con cada plato de la carta.' },
  { name: 'Marcos Ríos', role: 'Chef de Partida', image: IMAGES.chef3, bio: 'Especialista en brasa y fermentaciones, Marcos es el guardián del fuego. Sus técnicas ancestrales aportan profundidad a cada preparación.' },
]

const PRODUCERS = [
  { name: 'Huerta La Albufera', region: 'Valencia', specialty: 'Hortalizas', image: IMAGES.producer1, desc: 'Agricultura ecológica a orillas de la Albufera. Tomates, pimientos y alcachofas que llegan al restaurante el mismo día de su cosecha.' },
  { name: 'Pescadores de Dénia', region: 'Alicante', specialty: 'Pescado y Marisco', image: IMAGES.producer2, desc: 'Gamba roja, lubina y pulpo capturados con artes de pesca tradicionales en la costa alicantina. Frescura y sostenibilidad en cada pieza.' },
  { name: 'Dehesa Los Pedroches', region: 'Córdoba', specialty: 'Ibéricos', image: IMAGES.producer3, desc: 'Cerdos ibéricos criados en libertad bajo encinas centenarias. Jamón, secreto y pluma de máxima calidad para nuestra brasa.' },
]

export default function StaticHistoria() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src={IMAGES.hero}
          alt="Nuestra Historia"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-negro/60" />
        <div className="relative z-10 text-center px-6">
          <SplitText
            as="h1"
            className="font-display italic font-light text-[clamp(2.5rem,6vw,4.5rem)] text-crema leading-[0.95]"
            delay={0.2}
            stagger={0.08}
          >
            Nuestra Historia
          </SplitText>
          <ScrollReveal>
            <p className="mt-4 font-body text-sm text-ceniza uppercase tracking-[0.2em]">
              Desde 2019 · Valencia
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-negro">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <ScrollReveal>
                <h2 className="font-display italic font-light text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-crema">
                  El Origen
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="mt-8 font-body text-sm md:text-base text-ceniza leading-relaxed space-y-5">
                  <p>
                    LUMBRE nació de una obsesión: devolver al fuego su papel central en la
                    cocina. En 2019, en un antiguo almacén del barrio del Carmen en Valencia,
                    encendimos la primera brasa.
                  </p>
                  <p>
                    Lo que empezó como un pequeño bar de tapas alrededor de una parrilla de
                    encina se ha convertido en un punto de encuentro para quienes buscan sabores
                    auténticos, producto de cercanía y una experiencia que va más allá de la mesa.
                  </p>
                  <p>
                    Nuestra filosofía es simple: respetar el ingrediente, dominar el fuego y crear
                    momentos que se recuerden. Cada plato cuenta una historia — la del productor
                    que cultivó la verdura, la del pescador que madrugó al alba, la del ganadero
                    que cuida sus animales con esmero.
                  </p>
                  <p className="font-display italic text-crema/80">
                    &ldquo;Cocinar con fuego es volver a lo esencial.&rdquo;
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={100}>
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                <Image
                  src={IMAGES.story}
                  alt="Interior de LUMBRE"
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

      <SectionDivider variant="ornament" />

      {/* Team */}
      <section className="section-padding bg-tierra">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-oro mb-4">
              Las personas
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="font-display italic font-light text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-crema">
              Nuestro Equipo
            </h2>
          </ScrollReveal>

          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {TEAM.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 100}>
                <article className="group text-center">
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden ring-2 ring-ceniza/10 group-hover:ring-brasa/30 transition-all duration-500">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="192px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-display italic text-crema text-xl">{member.name}</h3>
                  <p className="mt-1 font-body text-xs text-oro uppercase tracking-[0.15em]">{member.role}</p>
                  <p className="mt-3 font-body text-sm text-ceniza/70 leading-relaxed max-w-xs mx-auto">{member.bio}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Producers */}
      <section className="section-padding bg-negro">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-oro mb-4">
              De la tierra a la mesa
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="font-display italic font-light text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-crema mb-4">
              Nuestros Productores
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="font-body text-sm text-ceniza/60 max-w-2xl leading-relaxed mb-12 md:mb-16">
              Creemos en la trazabilidad total. Cada ingrediente en nuestra cocina tiene
              nombre, origen y una historia que merece ser contada.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCERS.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 100}>
                <article className="group">
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden mb-5">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display italic text-crema text-xl">{p.name}</h3>
                  <p className="mt-1 font-body text-xs text-ceniza uppercase tracking-[0.1em]">
                    {p.region} — {p.specialty}
                  </p>
                  <p className="mt-3 font-body text-sm text-ceniza/70 leading-relaxed">{p.desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
