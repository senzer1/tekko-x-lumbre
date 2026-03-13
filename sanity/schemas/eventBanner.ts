import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'eventBanner',
  title: 'Banner de evento',
  type: 'document',
  icon: () => '📢',
  fields: [
    defineField({ name: 'text', title: 'Texto', type: 'string', validation: (r) => r.required().max(150) }),
    defineField({ name: 'startDate', title: 'Fecha inicio', type: 'date' }),
    defineField({ name: 'endDate', title: 'Fecha fin', type: 'date' }),
    defineField({ name: 'isVisible', title: 'Visible', type: 'boolean', initialValue: false }),
    defineField({ name: 'linkUrl', title: 'Enlace URL', type: 'url' }),
    defineField({ name: 'linkLabel', title: 'Texto enlace', type: 'string', validation: (r) => r.max(40), hidden: ({ document }) => !document?.linkUrl }),
  ],
  preview: {
    select: { title: 'text', isVisible: 'isVisible' },
    prepare({ title, isVisible }) { return { title, subtitle: isVisible ? 'VISIBLE' : 'OCULTO' } },
  },
})
