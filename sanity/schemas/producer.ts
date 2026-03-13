import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'producer',
  title: 'Productor',
  type: 'document',
  icon: () => '🌿',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'region', title: 'Region', type: 'string', validation: (r) => r.max(80) }),
    defineField({ name: 'specialty', title: 'Especialidad', type: 'string', validation: (r) => r.max(100) }),
    defineField({ name: 'description', title: 'Descripcion', type: 'text', rows: 4, validation: (r) => r.max(500) }),
    defineField({ name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt', type: 'string' })] }),
    defineField({ name: 'url', title: 'Web', type: 'url' }),
  ],
  preview: {
    select: { title: 'name', region: 'region', specialty: 'specialty', media: 'image' },
    prepare({ title, region, specialty, media }) { return { title, subtitle: [region, specialty].filter(Boolean).join(' — ') || undefined, media } },
  },
})
