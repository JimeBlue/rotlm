import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'merchProduct',
  title: 'Merch Product',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt Text'}],
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'object',
      fields: [
        {
          name: 'show',
          title: 'Show Badge',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'type',
          title: 'Badge Type',
          type: 'string',
          description: 'Predefined types use automatic translations. Use "Custom" to write your own label.',
          options: {
            list: [
              {title: 'Deal / Bundle', value: 'deal'},
              {title: 'New', value: 'new'},
              {title: 'Limited', value: 'limited'},
              {title: 'Custom', value: 'custom'},
            ],
          },
        },
        {
          name: 'customLabel',
          title: 'Custom Label',
          type: 'object',
          hidden: ({parent}: {parent?: {type?: string}}) => parent?.type !== 'custom',
          fields: [
            {name: 'en', type: 'string', title: 'English'},
            {name: 'de', type: 'string', title: 'Deutsch'},
            {name: 'it', type: 'string', title: 'Italiano'},
            {name: 'es', type: 'string', title: 'Español'},
          ],
        },
      ],
    }),

    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'object',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'de', type: 'string', title: 'Deutsch'},
        {name: 'it', type: 'string', title: 'Italiano'},
        {name: 'es', type: 'string', title: 'Español'},
      ],
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description / Contents',
      type: 'object',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'de', type: 'string', title: 'Deutsch'},
        {name: 'it', type: 'string', title: 'Italiano'},
        {name: 'es', type: 'string', title: 'Español'},
      ],
    }),

    defineField({
      name: 'price',
      title: 'Current Price (€)',
      type: 'number',
      validation: (r) => r.required().min(0),
    }),

    defineField({
      name: 'originalPrice',
      title: 'Original Price (€) — leave empty if no discount',
      type: 'number',
    }),

    defineField({
      name: 'available',
      title: 'Available / Visible',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower number = appears first in the grid',
    }),
  ],

  preview: {
    select: {
      title: 'name.de',
      media: 'image',
      price: 'price',
    },
    prepare({title, media, price}) {
      return {
        title: title || 'Unnamed Product',
        subtitle: price != null ? `${price} €` : '',
        media,
      }
    },
  },
})
