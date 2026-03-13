import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'reservationPage',
  title: 'Pagina de reservas',
  type: 'document',
  icon: () => '📅',
  fieldsets: [
    { name: 'header', title: 'Cabecera', options: { collapsible: true, collapsed: false } },
    { name: 'info', title: 'Info practica', options: { collapsible: true, collapsed: false } },
    { name: 'schedule', title: 'Horarios', options: { collapsible: true, collapsed: false } },
    { name: 'note', title: 'Nota', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: 'title', title: 'Titulo', type: 'string', fieldset: 'header', validation: (r) => r.required().max(100) }),
    defineField({ name: 'subtitle', title: 'Subtitulo', type: 'string', fieldset: 'header', validation: (r) => r.max(160) }),
    defineField({ name: 'description', title: 'Descripcion', type: 'text', rows: 4, fieldset: 'header', validation: (r) => r.max(500) }),
    defineField({ name: 'practicalAddress', title: 'Direccion', type: 'string', fieldset: 'info', validation: (r) => r.required() }),
    defineField({ name: 'practicalPhone', title: 'Telefono', type: 'string', fieldset: 'info', validation: (r) => r.required() }),
    defineField({ name: 'practicalEmail', title: 'Email', type: 'string', fieldset: 'info', validation: (r) => r.required() }),
    defineField({ name: 'mapUrl', title: 'URL del mapa', type: 'url', fieldset: 'info' }),
    defineField({ name: 'schedule', title: 'Horarios', type: 'array', fieldset: 'schedule', of: [{ type: 'object', name: 'scheduleEntry', fields: [defineField({ name: 'day', title: 'Dia', type: 'string', validation: (r) => r.required() }), defineField({ name: 'hours', title: 'Horario', type: 'string', validation: (r) => r.required() })], preview: { select: { title: 'day', subtitle: 'hours' } } }], validation: (r) => r.required().min(1) }),
    defineField({ name: 'note', title: 'Nota', type: 'text', rows: 4, fieldset: 'note', validation: (r) => r.max(600) }),
    defineField({ name: 'metaTitle', title: 'Meta titulo', type: 'string', fieldset: 'seo', validation: (r) => r.max(70) }),
    defineField({ name: 'metaDescription', title: 'Meta desc', type: 'text', rows: 3, fieldset: 'seo', validation: (r) => r.max(160) }),
  ],
  preview: { prepare: () => ({ title: 'Reservas', subtitle: 'Singleton' }) },
})
