import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'object',
      description: 'Copyright text displayed in the footer',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'de', type: 'string', title: 'Deutsch'},
        {name: 'it', type: 'string', title: 'Italiano'},
        {name: 'es', type: 'string', title: 'Español'},
      ],
    }),
    defineField({
      name: 'image1',
      title: 'Footer Image 1',
      type: 'image',
      description: 'First image displayed in the footer',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'image2',
      title: 'Footer Image 2',
      type: 'image',
      description: 'Second image displayed in the footer',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Social media links for the footer (icons are stored in the repo)',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
              description: 'e.g. instagram, facebook, youtube, spotify (lowercase, used to match icon file)',
              validation: (rule) => rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              description: 'Link to the social media profile',
              validation: (rule) => rule.required(),
            },
            {
              name: 'order',
              type: 'number',
              title: 'Order',
              description: 'Display order (lower numbers appear first)',
              initialValue: 0,
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'order',
            },
            prepare({title, subtitle}) {
              return {
                title,
                subtitle: `Order: ${subtitle ?? 0}`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
      }
    },
  },
})
