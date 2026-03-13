import { defineType, defineField } from 'sanity'

const simpleBlock = [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], marks: { decorators: [{ title: 'Negrita', value: 'strong' }, { title: 'Cursiva', value: 'em' }] } }]

export default defineType({
  name: 'homePage',
  title: 'Pagina de inicio',
  type: 'document',
  icon: () => '🏠',
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    { name: 'concept', title: 'Concepto', options: { collapsible: true, collapsed: false } },
    { name: 'tapas', title: 'Tapas destacadas', options: { collapsible: true, collapsed: false } },
    { name: 'ambiance', title: 'Ambiente', options: { collapsible: true, collapsed: false } },
    { name: 'cta', title: 'Reservar CTA', options: { collapsible: true, collapsed: false } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'heroTitle', title: 'Titulo', type: 'string', fieldset: 'hero', validation: (r) => r.required().max(100) }),
    defineField({ name: 'heroSubtitle', title: 'Subtitulo', type: 'string', fieldset: 'hero', validation: (r) => r.max(120) }),
    defineField({ name: 'heroAccroche', title: 'Accroche', type: 'text', rows: 3, fieldset: 'hero', validation: (r) => r.max(280) }),
    defineField({ name: 'heroBackgroundImage', title: 'Imagen de fondo', type: 'image', fieldset: 'hero', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt', type: 'string', validation: (r) => r.required() })], validation: (r) => r.required() }),
    defineField({ name: 'heroCtaLabel', title: 'Boton texto', type: 'string', fieldset: 'hero', validation: (r) => r.required().max(40) }),
    defineField({ name: 'heroCtaUrl', title: 'Boton enlace', type: 'string', fieldset: 'hero', validation: (r) => r.required() }),
    defineField({ name: 'conceptTitle', title: 'Titulo', type: 'string', fieldset: 'concept', validation: (r) => r.required().max(80) }),
    defineField({ name: 'conceptSubtitle', title: 'Subtitulo', type: 'string', fieldset: 'concept', validation: (r) => r.max(120) }),
    defineField({ name: 'conceptDescription', title: 'Descripcion', type: 'array', fieldset: 'concept', of: simpleBlock, validation: (r) => r.required() }),
    defineField({ name: 'conceptImage', title: 'Imagen', type: 'image', fieldset: 'concept', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt', type: 'string', validation: (r) => r.required() })] }),
    defineField({ name: 'tapasTitle', title: 'Titulo', type: 'string', fieldset: 'tapas', validation: (r) => r.required().max(80) }),
    defineField({ name: 'tapasSubtitle', title: 'Subtitulo', type: 'string', fieldset: 'tapas', validation: (r) => r.max(120) }),
    defineField({ name: 'tapasItems', title: 'Tapas', type: 'array', fieldset: 'tapas', of: [{ type: 'reference', to: [{ type: 'menuItem' }] }], validation: (r) => r.required().min(1).max(8) }),
    defineField({ name: 'ambianceTitle', title: 'Titulo', type: 'string', fieldset: 'ambiance', validation: (r) => r.required().max(80) }),
    defineField({ name: 'ambianceDescription', title: 'Descripcion', type: 'text', rows: 4, fieldset: 'ambiance', validation: (r) => r.max(400) }),
    defineField({ name: 'ambianceImages', title: 'Galeria', type: 'array', fieldset: 'ambiance', of: [{ type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt', type: 'string', validation: (r) => r.required() }), defineField({ name: 'caption', title: 'Leyenda', type: 'string' })] }], validation: (r) => r.min(1).max(8) }),
    defineField({ name: 'reservationTitle', title: 'Titulo', type: 'string', fieldset: 'cta', validation: (r) => r.required().max(80) }),
    defineField({ name: 'reservationSubtitle', title: 'Subtitulo', type: 'string', fieldset: 'cta', validation: (r) => r.max(120) }),
    defineField({ name: 'reservationCtaLabel', title: 'Boton texto', type: 'string', fieldset: 'cta', validation: (r) => r.required().max(40) }),
    defineField({ name: 'reservationCtaUrl', title: 'Boton enlace', type: 'string', fieldset: 'cta', validation: (r) => r.required() }),
    defineField({ name: 'reservationBackgroundImage', title: 'Imagen de fondo', type: 'image', fieldset: 'cta', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt', type: 'string', validation: (r) => r.required() })] }),
    defineField({ name: 'metaTitle', title: 'Meta titulo', type: 'string', fieldset: 'seo', validation: (r) => r.max(70) }),
    defineField({ name: 'metaDescription', title: 'Meta desc', type: 'text', rows: 3, fieldset: 'seo', validation: (r) => r.max(160) }),
  ],
  preview: { prepare: () => ({ title: 'Pagina de inicio', subtitle: 'Singleton' }) },
})
