import { defineType, defineField } from 'sanity'

const simpleBlock = [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], marks: { decorators: [{ title: 'Negrita', value: 'strong' }, { title: 'Cursiva', value: 'em' }] } }]

export default defineType({
  name: 'contactPage',
  title: 'Pagina de contacto',
  type: 'document',
  icon: () => '📬',
  fieldsets: [
    { name: 'header', title: 'Cabecera', options: { collapsible: true, collapsed: false } },
    { name: 'map', title: 'Mapa', options: { collapsible: true, collapsed: false } },
    { name: 'access', title: 'Como llegar', options: { collapsible: true, collapsed: false } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'title', title: 'Titulo', type: 'string', fieldset: 'header', validation: (r) => r.required().max(100) }),
    defineField({ name: 'subtitle', title: 'Subtitulo', type: 'string', fieldset: 'header', validation: (r) => r.max(160) }),
    defineField({ name: 'mapEmbedUrl', title: 'URL del mapa', type: 'url', fieldset: 'map', validation: (r) => r.required() }),
    defineField({ name: 'accessInfo', title: 'Info acceso', type: 'array', fieldset: 'access', of: simpleBlock, validation: (r) => r.required() }),
    defineField({ name: 'metaTitle', title: 'Meta titulo', type: 'string', fieldset: 'seo', validation: (r) => r.max(70) }),
    defineField({ name: 'metaDescription', title: 'Meta desc', type: 'text', rows: 3, fieldset: 'seo', validation: (r) => r.max(160) }),
  ],
  preview: { prepare: () => ({ title: 'Contacto', subtitle: 'Singleton' }) },
})
