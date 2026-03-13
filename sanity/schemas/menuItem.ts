import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'menuItem',
  title: 'Plato / Bebida',
  type: 'document',
  icon: () => '🍽',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (r) => r.required().min(2).max(100) }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Descripcion', type: 'text', rows: 3, validation: (r) => r.max(300) }),
    defineField({ name: 'price', title: 'Precio', type: 'number', validation: (r) => r.required().min(0).precision(2) }),
    defineField({ name: 'category', title: 'Categoria', type: 'reference', to: [{ type: 'menuCategory' }], validation: (r) => r.required() }),
    defineField({ name: 'badge', title: 'Etiqueta', type: 'string', options: { list: [{ title: 'Firma del chef', value: 'signature' }, { title: 'Nuevo', value: 'nuevo' }, { title: 'De temporada', value: 'temporada' }, { title: 'Sin etiqueta', value: '' }], layout: 'radio' }, initialValue: '' }),
    defineField({ name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt', type: 'string' })] }),
    defineField({ name: 'available', title: 'Disponible', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Orden', type: 'number', initialValue: 0, validation: (r) => r.integer().min(0) }),
  ],
  orderings: [{ title: 'Orden manual', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'price', media: 'image', available: 'available', badge: 'badge' },
    prepare({ title, subtitle, media, available, badge }) {
      const status = available === false ? ' [NO DISPONIBLE]' : ''
      const badgeLabel = badge === 'signature' ? ' — Firma' : badge === 'nuevo' ? ' — Nuevo' : badge === 'temporada' ? ' — Temporada' : ''
      return { title: `${title}${badgeLabel}${status}`, subtitle: subtitle != null ? `${subtitle.toFixed(2)} €` : 'Sin precio', media }
    },
  },
})
