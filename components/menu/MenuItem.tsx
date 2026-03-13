import Image from 'next/image'
import type { MenuItem as MenuItemType, MenuBadge } from '@/types/sanity'
import { imageUrl, blurUrl } from '@/sanity/lib/image'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface MenuItemProps { item: MenuItemType }

const BADGE: Record<Exclude<MenuBadge, ''>, { bg: string; text: string; label: string }> = {
  signature: { bg: 'bg-oro/15 border-oro/30', text: 'text-oro', label: 'Signature' },
  nuevo: { bg: 'bg-brasa/15 border-brasa/30', text: 'text-brasa', label: 'Nuevo' },
  temporada: { bg: 'bg-ceniza/15 border-ceniza/30', text: 'text-ceniza', label: 'Temporada' },
}

function fmt(price: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(price)
}

export default function MenuItemCard({ item }: MenuItemProps) {
  const badge = item.badge ? BADGE[item.badge as Exclude<MenuBadge, ''>] : null
  return (
    <ScrollReveal>
      <article className="group relative py-6 border-b border-transparent transition-colors duration-500 hover:border-b-brasa/40">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-ceniza/20 via-ceniza/10 to-transparent" aria-hidden="true" />
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-display italic text-crema text-[clamp(1.25rem,2vw,1.75rem)] leading-tight">{item.name}</h3>
              {badge && <span className={`inline-flex items-center px-2.5 py-0.5 border rounded-full font-body text-[0.6rem] uppercase tracking-[0.2em] ${badge.bg} ${badge.text}`}>{badge.label}</span>}
            </div>
            {item.description && <p className="mt-2 font-display italic text-ceniza/70 text-sm leading-relaxed max-w-lg">{item.description}</p>}
          </div>
          <div className="flex items-center gap-4 shrink-0">
            {item.image && (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden ring-1 ring-ceniza/10 transition-transform duration-500 group-hover:scale-105">
                <Image src={imageUrl(item.image, 200)} alt={item.image.alt || item.name} fill sizes="64px" className="object-cover" placeholder={blurUrl(item.image) ? 'blur' : 'empty'} blurDataURL={blurUrl(item.image) || undefined} />
              </div>
            )}
            <span className="font-body text-oro text-base tracking-wide tabular-nums whitespace-nowrap">{fmt(item.price)}</span>
          </div>
        </div>
      </article>
    </ScrollReveal>
  )
}
