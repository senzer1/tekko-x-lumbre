import { defineType, defineField } from 'sanity'

const simpleBlock = [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], marks: { decorators: [{ title: 'Negrita', value: 'strong' }, { title: 'Cursiva', value: 'em' }] } }]

export default defineType({
  name: 'historyPage',
  title: 'Nuestra historia',
  type: 'document',
  icon: () => '📖',
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    { name: 'story', title: 'Historia', options: { collapsible: true, collapsed: false } },
    { name: 'team', title: 'Equipo', options: { collapsible: true, collapsed: false } },
    { name: 'producers', title: 'Productores', options: { collapsible: true, collapsed: false } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'heroTitle', title: 'Titulo', type: 'string', fieldset: 'hero', validation: (r) => r.required().max(100) }),
    defineField({ name: 'heroSubtitle', title: 'Subtitulo', type: 'string', fieldset: 'hero', validation: (r) => r.max(160) }),
    defineField({ name: 'heroBackgroundImage', title: 'Imagen', type: 'image', fieldset: 'hero', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt', type: 'string', validation: (r) => r.required() })], validation: (r) => r.required() }),
    defineField({ name: 'storyTitle', title: 'Titulo', type: 'string', fieldset: 'story', validation: (r) => r.required().max(100) }),
    defineField({ name: 'storyContent', title: 'Contenido', type: 'array', fieldset: 'story', of: simpleBlock, validation: (r) => r.required() }),
    defineField({ name: 'teamTitle', title: 'Titulo', type: 'string', fieldset: 'team', validation: (r) => r.required().max(80) }),
    defineField({ name: 'teamSubtitle', title: 'Subtitulo', type: 'string', fieldset: 'team', validation: (r) => r.max(160) }),
    defineField({ name: 'producersTitle', title: 'Titulo', type: 'string', fieldset: 'producers', validation: (r) => r.required().max(80) }),
    defineField({ name: 'producersSubtitle', title: 'Subtitulo', type: 'string', fieldset: 'producers', validation: (r) => r.max(160) }),
    defineField({ name: 'producersDescription', title: 'Descripcion', type: 'array', fieldset: 'producers', of: simpleBlock }),
    defineField({ name: 'metaTitle', title: 'Meta titulo', type: 'string', fieldset: 'seo', validation: (r) => r.max(70) }),
    defineField({ name: 'metaDescription', title: 'Meta desc', type: 'text', rows: 3, fieldset: 'seo', validation: (r) => r.max(160) }),
  ],
  preview: { prepare: () => ({ title: 'Nuestra historia', subtitle: 'Singleton' }) },
})
