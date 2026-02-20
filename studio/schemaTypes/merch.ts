import {defineField, defineType} from 'sanity'

const imageField = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    type: 'image',
    description,
    options: {hotspot: true},
    fields: [
      {
        name: 'alt',
        type: 'string',
        title: 'Alternative Text',
        description: 'Description for accessibility',
      },
    ],
  })

export default defineType({
  name: 'merch',
  title: 'Merch Assets',
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
    imageField('image', 'Merch Image 1', 'Image for the merch section'),
    imageField('image2', 'Merch Image 2', 'Background image for the merch hero section'),
    imageField('image3', 'Merch Image 3', 'Concert / footer background image'),
    imageField('image4', 'Merch Image 4', 'First animated image in the merch footer'),
    imageField('image5', 'Merch Image 5', 'Second animated image in the merch footer'),
    imageField('image6', 'Merch Image 6', 'Third animated image in the merch footer'),
  ],
  preview: {
    select: {
      media: 'image',
    },
    prepare({media}) {
      return {
        title: 'Merch Assets',
        media,
      }
    },
  },
})
