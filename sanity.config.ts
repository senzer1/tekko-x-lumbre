import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schemas'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'historyPage',
  'reservationPage',
  'contactPage',
  'eventBanner',
])

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'lumbre',
  title: 'LUMBRE — Studio',
  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Configuración del sitio')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Página de inicio')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.divider(),
            S.listItem()
              .title('Carta')
              .child(
                S.list()
                  .title('Carta')
                  .items([
                    S.listItem()
                      .title('Categorías')
                      .schemaType('menuCategory')
                      .child(S.documentTypeList('menuCategory').title('Categorías')),
                    S.listItem()
                      .title('Platos y bebidas')
                      .schemaType('menuItem')
                      .child(S.documentTypeList('menuItem').title('Platos y bebidas')),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('Equipo')
              .schemaType('teamMember')
              .child(S.documentTypeList('teamMember').title('Miembros del equipo')),
            S.listItem()
              .title('Productores')
              .schemaType('producer')
              .child(S.documentTypeList('producer').title('Productores')),
            S.divider(),
            S.listItem()
              .title('Nuestra historia')
              .id('historyPage')
              .child(S.document().schemaType('historyPage').documentId('historyPage')),
            S.listItem()
              .title('Reservaciones')
              .id('reservationPage')
              .child(S.document().schemaType('reservationPage').documentId('reservationPage')),
            S.listItem()
              .title('Contacto')
              .id('contactPage')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),
            S.divider(),
            S.listItem()
              .title('Evento especial')
              .id('eventBanner')
              .child(S.document().schemaType('eventBanner').documentId('eventBanner')),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
