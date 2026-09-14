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
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Band photo behind the logo at the top of the music page (landscape, full width)',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Description for accessibility',
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'object',
      description: 'Paragraph displayed below the section title, above the albums',
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
  },
})
