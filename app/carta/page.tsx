import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { menuCategoriesQuery, menuItemsQuery } from '@/sanity/lib/queries'
import type { MenuCategory, MenuItem } from '@/types/sanity'
import CartaClient from './CartaClient'
import StaticCarta from '@/components/sections/StaticCarta'

export const metadata: Metadata = {
  title: 'La Carta — LUMBRE',
  description: 'Tapas de autor, platos de brasa y bebidas selectas en LUMBRE.',
}

export default async function CartaPage() {
  const [categories, items] = await Promise.all([
    client.fetch<MenuCategory[]>(menuCategoriesQuery),
    client.fetch<MenuItem[]>(menuItemsQuery),
  ])

  // No Sanity menu data → show static carta
  if (categories.length === 0 && items.length === 0) {
    return <StaticCarta />
  }

  return (
    <>
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-negro">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h1 className="font-display italic font-light text-[clamp(2.5rem,6vw,4.5rem)] text-crema leading-[0.95] animate-fade-up">
            La Carta
          </h1>
          <p className="mt-4 font-body text-sm text-ceniza uppercase tracking-[0.2em] animate-fade-up [animation-delay:200ms]">
            Tapas · Platos · Bebidas
          </p>
        </div>
      </section>
      <CartaClient categories={categories} items={items} />
    </>
  )
}
