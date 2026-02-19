import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'merch',
  title: 'Merch Section',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Merch Image 1',
      type: 'image',
      description: 'Image for the merch section',
      options: {
        hotspot: true,
      },
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
      name: 'image2',
      title: 'Merch Image 2',
      type: 'image',
      description: 'Background image for the merch hero section',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Description for accessibility',
        },
      ],
    }),
  ],
  preview: {
    select: {
      media: 'image',
    },
    prepare({media}) {
      return {
        title: 'Merch Section',
        media,
      }
    },
  },
})
