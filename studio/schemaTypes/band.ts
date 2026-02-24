import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'band',
  title: 'Band Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'paragraph1',
      title: 'First Paragraph',
      type: 'object',
      fields: [
        {name: 'en', type: 'text', title: 'English'},
        {name: 'de', type: 'text', title: 'Deutsch'},
        {name: 'it', type: 'text', title: 'Italiano'},
        {name: 'es', type: 'text', title: 'Español'},
      ],
    }),
    defineField({
      name: 'paragraph2',
      title: 'Second Paragraph',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'array',
          title: 'English',
          of: [{type: 'block', marks: {decorators: [{title: 'Bold', value: 'strong'}, {title: 'Italic', value: 'em'}]}}],
        },
        {
          name: 'de',
          type: 'array',
          title: 'Deutsch',
          of: [{type: 'block', marks: {decorators: [{title: 'Bold', value: 'strong'}, {title: 'Italic', value: 'em'}]}}],
        },
        {
          name: 'it',
          type: 'array',
          title: 'Italiano',
          of: [{type: 'block', marks: {decorators: [{title: 'Bold', value: 'strong'}, {title: 'Italic', value: 'em'}]}}],
        },
        {
          name: 'es',
          type: 'array',
          title: 'Español',
          of: [{type: 'block', marks: {decorators: [{title: 'Bold', value: 'strong'}, {title: 'Italic', value: 'em'}]}}],
        },
      ],
    }),
    defineField({
      name: 'paragraph3',
      title: 'Third Paragraph (Call to Action)',
      type: 'object',
      description: 'Text displayed in the pink section below the band photo',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'de', type: 'string', title: 'Deutsch'},
        {name: 'it', type: 'string', title: 'Italiano'},
        {name: 'es', type: 'string', title: 'Español'},
      ],
    }),
    defineField({
      name: 'imageOne',
      title: 'Image One',
      type: 'image',
      description: 'First image displayed below the call to action text',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageTwo',
      title: 'Image Two',
      type: 'image',
      description: 'Second image displayed next to Image One on desktop, below on mobile',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bandImage',
      title: 'Band Image',
      type: 'image',
      description: 'Main band photo displayed in the black section',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'genres',
      title: 'Music Genres/Keywords',
      type: 'array',
      description: 'Logos for music styles like alt rock, grunge, crossover, loud, funk, rap',
      of: [
        {
          type: 'object',
          name: 'genre',
          title: 'Genre',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Genre Name',
              description: 'e.g. Alt Rock, Grunge, Crossover, Loud, Funk, Rap',
              validation: (rule) => rule.required(),
            },
            {
              name: 'logo',
              type: 'image',
              title: 'Logo/Image',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'members',
      title: 'Band Members',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'member',
          title: 'Member',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
              validation: (rule) => rule.required(),
            },
            {
              name: 'instrument',
              type: 'object',
              title: 'Instrument',
              fields: [
                {name: 'en', type: 'string', title: 'English'},
                {name: 'de', type: 'string', title: 'Deutsch'},
                {name: 'it', type: 'string', title: 'Italiano'},
                {name: 'es', type: 'string', title: 'Español'},
              ],
            },
          ],
          preview: {
            select: {
              name: 'name',
              instrument: 'instrument.en',
            },
            prepare({name, instrument}) {
              return {
                title: `${name} (${instrument || 'No instrument'})`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
    },
  },
})
