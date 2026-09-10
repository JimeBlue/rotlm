import {defineField, defineType} from 'sanity'

const localizedString = [
  {name: 'en', type: 'string', title: 'English'},
  {name: 'de', type: 'string', title: 'Deutsch'},
  {name: 'it', type: 'string', title: 'Italiano'},
  {name: 'es', type: 'string', title: 'Español'},
]

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'albumsTitle',
      title: 'Albums Section Title',
      type: 'object',
      description: 'Short call to action shown above the albums on the home page (e.g. "Press play.")',
      fields: localizedString,
    }),
    defineField({
      name: 'gigsTitle',
      title: 'Upcoming Gigs Section Title',
      type: 'object',
      description: 'Short call to action shown above the upcoming gigs on the home page (e.g. "See you there.")',
      fields: localizedString,
    }),
    defineField({
      name: 'carouselImages',
      title: 'Carousel Images',
      type: 'array',
      description:
        'Landscape live photos for the home page carousel. Upload JPG/JPEG only, at least 1920px wide, max 5MB per file. On phones only the centre of the photo is visible, so keep the action near the middle. Open an image and click the crop icon (top right of the preview) to set the hotspot, which decides which part of the photo survives the crop.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/jpeg',
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              description: 'Short description of the photo for screen readers (e.g. "Singer jumping on stage at Open Flair").',
            }),
          ],
          preview: {
            select: {title: 'alt', media: 'asset'},
            prepare({title, media}) {
              return {title: title || 'Untitled (add alternative text)', media}
            },
          },
        },
      ],
      validation: (rule) =>
        rule.max(10).warning('Keep the carousel to 10 images or fewer so it stays quick to browse.'),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Home'}
    },
  },
})
