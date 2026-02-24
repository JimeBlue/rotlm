import {defineField, defineType} from 'sanity'

const portableTextField = (name: string) => ({
  name,
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'string',
                title: 'URL',
              },
            ],
          },
        ],
      },
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
    },
  ],
})

export default defineType({
  name: 'legal',
  title: 'Legal',
  type: 'document',
  fields: [
    defineField({
      name: 'impressum',
      title: 'Impressum',
      type: 'object',
      fields: [
        {...portableTextField('de'), title: 'Deutsch'},
        {...portableTextField('en'), title: 'English'},
      ],
    }),
    defineField({
      name: 'datenschutz',
      title: 'Datenschutz',
      type: 'object',
      fields: [
        {...portableTextField('de'), title: 'Deutsch'},
        {...portableTextField('en'), title: 'English'},
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Legal'}
    },
  },
})
