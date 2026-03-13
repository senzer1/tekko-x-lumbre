import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Miembro del equipo',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Cargo', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'photo', title: 'Foto', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt', type: 'string' })], validation: (r) => r.required() }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4, validation: (r) => r.max(500) }),
    defineField({ name: 'order', title: 'Orden', type: 'number', initialValue: 0, validation: (r) => r.integer().min(0) }),
  ],
  orderings: [{ title: 'Orden manual', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})
