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
  ],
  preview: {
    prepare() {
      return {title: 'Home'}
    },
  },
})
