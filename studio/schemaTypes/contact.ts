import {defineField, defineType} from 'sanity'

const imageField = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    type: 'image',
    description,
    options: {hotspot: true},
  })

export default defineType({
  name: 'contact',
  title: 'Contact Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      description: 'The large heading displayed above the form. Use short phrases — each word wraps to its own line at large size.',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'de', type: 'string', title: 'Deutsch'},
        {name: 'it', type: 'string', title: 'Italiano'},
        {name: 'es', type: 'string', title: 'Español'},
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'object',
      description: 'The subtitle/body text displayed below the title.',
      fields: [
        {name: 'en', type: 'text', title: 'English'},
        {name: 'de', type: 'text', title: 'Deutsch'},
        {name: 'it', type: 'text', title: 'Italiano'},
        {name: 'es', type: 'text', title: 'Español'},
      ],
    }),
    imageField('posterMobile', 'Poster — Mobile & Tablet', 'Displayed below the form on mobile and tablet'),
    imageField('posterDesktop', 'Poster — Desktop', 'Fixed right panel image on large screens (xl+)'),
  ],
  preview: {
    select: {
      title: 'title.en',
    },
  },
})
