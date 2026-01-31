import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'ROTLM',
  projectId: 'wr3ekkel',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
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
                S.documentList()
                  .title('Albums')
                  .filter('_type == "album"')
                  .defaultOrdering([{field: 'order', direction: 'asc'}])
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
