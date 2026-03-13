import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'menuCategory',
  title: 'Categoria',
  type: 'document',
  icon: () => '📂',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (r) => r.required().min(2).max(60) }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'order', title: 'Orden', type: 'number', initialValue: 0, validation: (r) => r.integer().min(0) }),
    defineField({ name: 'description', title: 'Descripcion', type: 'text', rows: 2, validation: (r) => r.max(200) }),
  ],
  orderings: [{ title: 'Orden manual', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', order: 'order' }, prepare({ title, order }) { return { title, subtitle: order != null ? `Orden: ${order}` : '' } } },
})
