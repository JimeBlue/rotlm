import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gigs',
  title: 'Gigs Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
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
      name: 'buttonText',
      title: 'Info Button Text',
      type: 'object',
      description: 'Text displayed on the info button for all gigs (e.g., "All information here")',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'de', type: 'string', title: 'Deutsch'},
        {name: 'it', type: 'string', title: 'Italiano'},
        {name: 'es', type: 'string', title: 'Español'},
      ],
    }),
    defineField({
      name: 'pastGigsButtonText',
      title: 'Past Gigs Button Text',
      type: 'object',
      description: 'Text displayed on the button to show past gigs',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'de', type: 'string', title: 'Deutsch'},
        {name: 'it', type: 'string', title: 'Italiano'},
        {name: 'es', type: 'string', title: 'Español'},
      ],
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video',
      type: 'file',
      description:
        'Short looping video displayed in the background of the video section. Upload an MP4, max 5 MB, 720p recommended. No audio needed.',
      options: {
        accept: 'video/mp4',
      },
    }),
    defineField({
      name: 'videoPoster',
      title: 'Video Poster Image',
      type: 'image',
      description:
        'Thumbnail shown while the video loads. Use a frame from the video or a representative image.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description:
        'Full video URL (e.g. YouTube). Shown when the user clicks the play button.',
    }),
    defineField({
      name: 'gigsImages',
      title: 'Gigs Images',
      type: 'array',
      description: 'Images displayed in the skewed grid gallery below the video.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'gigsList',
      title: 'Gigs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'gig',
          title: 'Gig',
          fields: [
            {
              name: 'sortDate',
              type: 'date',
              title: 'Sort Date',
              description: 'Used for sorting gigs chronologically. Select the actual date of the gig.',
              validation: (rule) => rule.required(),
            },
            {
              name: 'displayDate',
              type: 'object',
              title: 'Display Date',
              description: 'Formatted date shown to users (e.g., "Samstag 11. April 2026")',
              fields: [
                {name: 'en', type: 'string', title: 'English'},
                {name: 'de', type: 'string', title: 'Deutsch'},
                {name: 'it', type: 'string', title: 'Italiano'},
                {name: 'es', type: 'string', title: 'Español'},
              ],
              validation: (rule) => rule.required(),
            },
            {
              name: 'venue',
              type: 'string',
              title: 'Venue Name',
              validation: (rule) => rule.required(),
            },
            {
              name: 'city',
              type: 'object',
              title: 'City',
              fields: [
                {name: 'en', type: 'string', title: 'English'},
                {name: 'de', type: 'string', title: 'Deutsch'},
                {name: 'it', type: 'string', title: 'Italiano'},
                {name: 'es', type: 'string', title: 'Español'},
              ],
              validation: (rule) => rule.required(),
            },
            {
              name: 'time',
              type: 'object',
              title: 'Time',
              description: 'Time of the event (e.g., "20:00 Uhr" / "8:00 PM")',
              fields: [
                {name: 'en', type: 'string', title: 'English'},
                {name: 'de', type: 'string', title: 'Deutsch'},
                {name: 'it', type: 'string', title: 'Italiano'},
                {name: 'es', type: 'string', title: 'Español'},
              ],
            },
            {
              name: 'address',
              type: 'string',
              title: 'Address',
            },
            {
              name: 'googleMapsLink',
              type: 'url',
              title: 'Google Maps Link',
            },
            {
              name: 'venueLink',
              type: 'url',
              title: 'Venue Link',
              description: 'Link to the venue website or event page',
            },
          ],
          preview: {
            select: {
              venue: 'venue',
              date: 'sortDate',
              city: 'city.en',
            },
            prepare({venue, date, city}) {
              return {
                title: venue || 'No venue',
                subtitle: `${date || 'No date'} - ${city || 'No city'}`,
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
