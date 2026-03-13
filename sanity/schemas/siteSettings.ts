import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configuracion del sitio',
  type: 'document',
  icon: () => '⚙️',
  fieldsets: [
    { name: 'identity', title: 'Identidad', options: { collapsible: true, collapsed: false } },
    { name: 'contact', title: 'Contacto', options: { collapsible: true, collapsed: false } },
    { name: 'schedule', title: 'Horarios', options: { collapsible: true, collapsed: false } },
    { name: 'social', title: 'Redes sociales', options: { collapsible: true, collapsed: true } },
    { name: 'globalSeo', title: 'SEO global', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'name', title: 'Nombre del restaurante', type: 'string', fieldset: 'identity', validation: (r) => r.required() }),
    defineField({ name: 'slogan', title: 'Eslogan', type: 'string', fieldset: 'identity', validation: (r) => r.max(120) }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', fieldset: 'identity', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt', type: 'string' })] }),
    defineField({ name: 'address', title: 'Direccion', type: 'string', fieldset: 'contact', validation: (r) => r.required() }),
    defineField({ name: 'phone', title: 'Telefono', type: 'string', fieldset: 'contact', validation: (r) => r.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', fieldset: 'contact', validation: (r) => r.required() }),
    defineField({ name: 'schedule', title: 'Horarios', type: 'array', fieldset: 'schedule', of: [{ type: 'object', name: 'scheduleEntry', fields: [defineField({ name: 'day', title: 'Dia', type: 'string', validation: (r) => r.required() }), defineField({ name: 'hours', title: 'Horario', type: 'string', validation: (r) => r.required() })], preview: { select: { title: 'day', subtitle: 'hours' } } }] }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url', fieldset: 'social' }),
    defineField({ name: 'facebook', title: 'Facebook URL', type: 'url', fieldset: 'social' }),
    defineField({ name: 'tiktok', title: 'TikTok URL', type: 'url', fieldset: 'social' }),
    defineField({ name: 'seoTitle', title: 'Meta titulo', type: 'string', fieldset: 'globalSeo', validation: (r) => r.max(70) }),
    defineField({ name: 'seoDescription', title: 'Meta descripcion', type: 'text', rows: 3, fieldset: 'globalSeo', validation: (r) => r.max(160) }),
    defineField({ name: 'ogImage', title: 'OG Image', type: 'image', fieldset: 'globalSeo', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'name', subtitle: 'slogan', media: 'logo' } },
})
