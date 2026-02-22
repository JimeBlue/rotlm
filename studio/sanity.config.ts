import {defineConfig} from 'sanity'
import {structureTool, StructureBuilder} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'ROTLM',
  projectId: 'wr3ekkel',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Hero')
              .child(
                S.documentList()
                  .title('Hero')
                  .filter('_type == "hero"')
              ),
            S.listItem()
              .title('Navigation')
              .child(
                S.documentList()
                  .title('Navigation')
                  .filter('_type == "navigation"')
              ),
            S.listItem()
              .title('Band Section')
              .child(
                S.documentList()
                  .title('Band Section')
                  .filter('_type == "band"')
              ),
            S.listItem()
              .title('Music')
              .child(
                S.list()
                  .title('Music')
                  .items([
                    S.listItem()
                      .title('Music Section')
                      .child(
                        S.documentList()
                          .title('Music Section')
                          .filter('_type == "music"')
                      ),
                    S.listItem()
                      .title('Albums')
                      .child(
                        S.documentList()
                          .title('Albums')
                          .filter('_type == "album"')
                          .defaultOrdering([{field: 'order', direction: 'asc'}])
                      ),
                  ])
              ),
            S.listItem()
              .title('Gigs Section')
              .child(
                S.documentList()
                  .title('Gigs Section')
                  .filter('_type == "gigs"')
              ),
            S.listItem()
              .title('Merch Section')
              .child(
                S.list()
                  .title('Merch Section')
                  .items([
                    S.listItem()
                      .title('Merch Content')
                      .child(
                        S.documentList()
                          .title('Merch Content')
                          .filter('_type == "merchContent"')
                      ),
                    S.listItem()
                      .title('Merch Assets')
                      .child(
                        S.documentList()
                          .title('Merch Assets')
                          .filter('_type == "merch"')
                      ),
                    S.listItem()
                      .title('Products')
                      .child(
                        S.documentList()
                          .title('Products')
                          .filter('_type == "merchProduct"')
                          .defaultOrdering([{field: 'order', direction: 'asc'}])
                      ),
                    S.listItem()
                      .title('Orders')
                      .child(
                        S.documentList()
                          .title('Orders')
                          .filter('_type == "merchOrder"')
                          .defaultOrdering([{field: 'submitted_at', direction: 'desc'}])
                      ),
                  ])
              ),
            S.listItem()
              .title('Footer')
              .child(
                S.documentList()
                  .title('Footer')
                  .filter('_type == "footer"')
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
