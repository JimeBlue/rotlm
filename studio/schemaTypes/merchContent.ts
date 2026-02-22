import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'merchContent',
  title: 'Merch Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'object',
      description: 'Title displayed in the merch section',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'de', type: 'string', title: 'Deutsch'},
        {name: 'it', type: 'string', title: 'Italiano'},
        {name: 'es', type: 'string', title: 'Español'},
      ],
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'object',
      description: 'Text displayed below the section title',
      fields: [
        {name: 'en', type: 'text', title: 'English'},
        {name: 'de', type: 'text', title: 'Deutsch'},
        {name: 'it', type: 'text', title: 'Italiano'},
        {name: 'es', type: 'text', title: 'Español'},
      ],
    }),
    defineField({
      name: 'productOrderText',
      title: 'Product Order Text',
      type: 'object',
      description: 'Text for the product order action',
      fields: [
        {name: 'en', type: 'text', title: 'English'},
        {name: 'de', type: 'text', title: 'Deutsch'},
        {name: 'it', type: 'text', title: 'Italiano'},
        {name: 'es', type: 'text', title: 'Español'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
    },
    prepare({title}) {
      return {
        title: title || 'Merch Content',
      }
    },
  },
})
