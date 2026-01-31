import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'music',
  title: 'Music',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'object',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'de', type: 'string', title: 'Deutsch'},
        {name: 'it', type: 'string', title: 'Italiano'},
        {name: 'es', type: 'string', title: 'Español'},
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
    },
  },
})
