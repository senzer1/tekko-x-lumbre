'use client'

import { useCallback } from 'react'
import type { MenuCategory } from '@/types/sanity'

interface MenuFilterProps { categories: MenuCategory[]; activeSlug: string | null; onFilter: (slug: string | null) => void }

export default function MenuFilter({ categories, activeSlug, onFilter }: MenuFilterProps) {
  const handleFilter = useCallback((slug: string | null) => { onFilter(slug) }, [onFilter])
  const sorted = [...categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <nav aria-label="Filtrar por categoría" className="w-full">
      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist">
        <button type="button" role="tab" aria-selected={activeSlug === null} onClick={() => handleFilter(null)}
          className={`shrink-0 px-5 py-2.5 border rounded-full font-body text-xs uppercase tracking-[0.15em] transition-all duration-300 ${activeSlug === null ? 'border-brasa bg-brasa text-crema' : 'border-ceniza/20 text-ceniza hover:border-ceniza/40 hover:text-crema'}`}>
          Todos
        </button>
        {sorted.map((cat) => (
          <button key={cat._id} type="button" role="tab" aria-selected={activeSlug === cat.slug?.current} onClick={() => handleFilter(cat.slug?.current ?? null)}
            className={`shrink-0 px-5 py-2.5 border rounded-full font-body text-xs uppercase tracking-[0.15em] transition-all duration-300 ${activeSlug === cat.slug?.current ? 'border-brasa bg-brasa text-crema' : 'border-ceniza/20 text-ceniza hover:border-ceniza/40 hover:text-crema'}`}>
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  )
}
