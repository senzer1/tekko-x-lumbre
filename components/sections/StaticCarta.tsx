'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import SplitText from '@/components/ui/SplitText'

/* ─── Static menu data ─── */
const MENU_SECTIONS = [
  {
    title: 'Tapas',
    items: [
      { name: 'Pulpo a la Brasa', desc: 'Pulpo gallego sobre crema de patata ahumada, pimentón de la Vera', price: '18', badge: 'Signature' },
      { name: 'Croquetas de Jamón Ibérico', desc: 'Croquetas cremosas de jamón ibérico de bellota, toque de nuez moscada', price: '12', badge: '' },
      { name: 'Gambas al Ajillo', desc: 'Gambas salteadas con ajo confitado, guindilla y perejil fresco', price: '14', badge: '' },
      { name: 'Tortilla de Patatas', desc: 'Nuestra tortilla jugosa con cebolla caramelizada, servida tibia', price: '10', badge: '' },
      { name: 'Tataki de Atún', desc: 'Atún rojo sellado con sésamo negro, wakame y emulsión de wasabi', price: '22', badge: 'Nuevo' },
      { name: 'Pimientos de Padrón', desc: 'Pimientos blistered con escamas de sal Maldon', price: '8', badge: '' },
      { name: 'Patatas Bravas', desc: 'Patatas crujientes con doble salsa: brava picante y alioli casero', price: '9', badge: '' },
      { name: 'Jamón Ibérico de Bellota', desc: 'Cortado a cuchillo, 36 meses de curación, con pan con tomate', price: '24', badge: 'Signature' },
    ],
  },
  {
    title: 'Platos de Brasa',
    items: [
      { name: 'Chuletón de Vaca Madurada', desc: '800g de vaca gallega madurada 45 días, brasa de encina', price: '48', badge: 'Signature' },
      { name: 'Lubina a la Brasa', desc: 'Lubina entera con hierbas mediterráneas, limón asado y AOVE', price: '28', badge: '' },
      { name: 'Costillas Ibéricas', desc: 'Costillas glaseadas con miel de romero, reducción de Pedro Ximénez', price: '22', badge: 'Temporada' },
      { name: 'Verduras de Temporada', desc: 'Selección de verduras locales asadas al carbón, romesco casero', price: '14', badge: '' },
      { name: 'Secreto Ibérico', desc: 'Pieza jugosa a la brasa con chimichurri de hierbas frescas', price: '20', badge: '' },
    ],
  },
  {
    title: 'Postres',
    items: [
      { name: 'Crema Catalana', desc: 'Receta tradicional con corteza de caramelo crujiente', price: '8', badge: '' },
      { name: 'Tarta de Queso Vasca', desc: 'Cremosa y ligeramente caramelizada, con frutos rojos', price: '10', badge: 'Signature' },
      { name: 'Churros con Chocolate', desc: 'Churros caseros con chocolate caliente 70% cacao', price: '8', badge: '' },
      { name: 'Sorbete de Limón', desc: 'Refrescante sorbete artesanal con toque de albahaca fresca', price: '6', badge: '' },
    ],
  },
  {
    title: 'Bebidas',
    items: [
      { name: 'Copa de Vino Tinto', desc: 'Selección de Rioja, Ribera del Duero y Priorat', price: '6', badge: '' },
      { name: 'Copa de Vino Blanco', desc: 'Albariño, Verdejo y Godello de pequeños productores', price: '6', badge: '' },
      { name: 'Sangría de la Casa', desc: 'Elaborada con vino tinto, frutas de temporada y especias', price: '12', badge: '' },
      { name: 'Gin Tonic Premium', desc: 'Gin español con tónica artesanal y botánicos seleccionados', price: '14', badge: '' },
      { name: 'Cerveza Artesanal', desc: 'Selección rotativa de cervecerías locales valencianas', price: '5', badge: 'Nuevo' },
      { name: 'Agua Mineral', desc: 'Natural o con gas', price: '3', badge: '' },
    ],
  },
]

const BADGE_STYLES: Record<string, string> = {
  Signature: 'bg-brasa/90 text-crema',
  Nuevo: 'bg-oro/80 text-negro',
  Temporada: 'bg-ceniza/30 text-crema',
}

export default function StaticCarta() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-negro">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <SplitText
            as="h1"
            className="font-display italic font-light text-[clamp(2.5rem,6vw,4.5rem)] text-crema leading-[0.95]"
            delay={0.2}
            stagger={0.08}
          >
            La Carta
          </SplitText>
          <ScrollReveal>
            <p className="mt-4 font-body text-sm text-ceniza uppercase tracking-[0.2em]">
              Tapas · Platos · Postres · Bebidas
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="mt-6 font-body text-sm text-ceniza/50 max-w-lg mx-auto leading-relaxed">
              Una carta que respira temporada. Cada plato nace del fuego, del producto
              y del respeto por la tradición culinaria mediterránea.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Menu sections */}
      <section className="px-6 md:px-10 lg:px-16 pb-16 md:pb-24 bg-negro">
        <div className="max-w-[900px] mx-auto">
          {MENU_SECTIONS.map((section, sectionIdx) => (
            <div key={section.title} className="mb-20 last:mb-0">
              <ScrollReveal delay={sectionIdx * 50}>
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="font-display italic font-light text-2xl md:text-3xl text-crema">
                    {section.title}
                  </h2>
                  <div className="flex-1 h-px bg-ceniza/10" />
                </div>
              </ScrollReveal>

              <div className="space-y-0">
                {section.items.map((item, i) => (
                  <ScrollReveal key={item.name} delay={i * 40}>
                    <article className="group flex items-baseline gap-4 py-5 border-b border-ceniza/5 last:border-0 transition-colors hover:bg-tierra/20 -mx-4 px-4 rounded-sm">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-display italic text-crema text-lg md:text-xl group-hover:text-crema transition-colors">
                            {item.name}
                          </h3>
                          {item.badge && (
                            <span className={`px-2.5 py-0.5 font-body text-[0.55rem] uppercase tracking-[0.2em] rounded-full ${BADGE_STYLES[item.badge] || 'bg-ceniza/20 text-crema'}`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 font-body text-sm text-ceniza/50 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <span className="font-body text-oro text-sm tabular-nums whitespace-nowrap">
                        {item.price} &euro;
                      </span>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom note */}
      <section className="px-6 md:px-10 lg:px-16 pb-20 bg-negro">
        <div className="max-w-[900px] mx-auto text-center">
          <ScrollReveal>
            <div className="py-8 px-6 border border-ceniza/10 rounded-sm">
              <p className="font-display italic text-ceniza/40 text-sm leading-relaxed">
                Todos nuestros precios incluyen IVA. Si tienes alguna alergia o
                intolerancia alimentaria, por favor infórmanos. Nuestros platos
                pueden contener trazas de frutos secos, gluten, lácteos y mariscos.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
