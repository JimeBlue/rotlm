import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fieldsets: [
    {
      name: 'carouselImages',
      title: 'Carousel Images',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    defineField({
      name: 'images',
      title: 'Hero Images',
      type: 'array',
      description: 'Images for the hero section',
      of: [
        {
          type: 'image',
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
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'carouselImages',
      title: 'Carousel Images',
      type: 'array',
      fieldset: 'carouselImages',
      description: 'Add images for the hero carousel. You can add as many as you want.',
      of: [
        {
          type: 'image',
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
        },
      ],
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({images}) {
      const imageCount = images?.length || 0
      return {
        title: 'Hero Section',
        subtitle: `${imageCount} image${imageCount !== 1 ? 's' : ''}`,
        media: images?.[0],
      }
    },
  },
})
