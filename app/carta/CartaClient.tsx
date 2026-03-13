'use client'

import { useState, useMemo } from 'react'
import type { MenuCategory, MenuItem as MenuItemType } from '@/types/sanity'
import MenuFilter from '@/components/menu/MenuFilter'
import MenuItemCard from '@/components/menu/MenuItem'

interface CartaClientProps { categories: MenuCategory[]; items: MenuItemType[] }

export default function CartaClient({ categories, items }: CartaClientProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  const filteredItems = useMemo(() => {
    if (!activeSlug) return items
    return items.filter((item) => item.category?.slug?.current === activeSlug)
  }, [items, activeSlug])

  const groupedItems = useMemo(() => {
    if (activeSlug) {
      return [{ category: categories.find((c) => c.slug?.current === activeSlug), items: filteredItems }]
    }
    return categories
      .map((cat) => ({ category: cat, items: items.filter((item) => item.category?._id === cat._id) }))
      .filter((group) => group.items.length > 0)
  }, [categories, items, filteredItems, activeSlug])

  return (
    <>
      {categories.length > 0 && (
        <div className="px-6 md:px-10 lg:px-16 mb-12 md:mb-16">
          <div className="max-w-[1400px] mx-auto">
            <MenuFilter categories={categories} activeSlug={activeSlug} onFilter={setActiveSlug} />
          </div>
        </div>
      )}
      <div className="px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
        <div className="max-w-[900px] mx-auto">
          {groupedItems.length > 0 ? (
            groupedItems.map((group) => (
              <div key={group.category?._id || 'all'} className="mb-16 last:mb-0">
                {!activeSlug && group.category && (
                  <h2 className="font-display italic font-light text-2xl md:text-3xl text-crema mb-8 md:mb-10">{group.category.name}</h2>
                )}
                <div>{group.items.map((item) => <MenuItemCard key={item._id} item={item} />)}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="font-display italic text-xl text-ceniza">No hay platos disponibles en esta categoría</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
