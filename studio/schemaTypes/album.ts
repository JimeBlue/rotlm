import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'album',
  title: 'Album',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Album Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'The album cover image displayed next to the Spotify embed',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'spotifyEmbedUrl',
      title: 'Spotify Embed URL',
      type: 'url',
      description: 'The Spotify embed URL (e.g., https://open.spotify.com/embed/album/...)',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['https'],
        }),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (rule) => rule.required().integer().min(1),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      media: 'coverImage',
    },
    prepare({title, order, media}) {
      return {
        title: title || 'Untitled Album',
        subtitle: order ? `Order: ${order}` : 'No order set',
        media,
      }
    },
  },
})
