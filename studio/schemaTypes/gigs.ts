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
              name: 'infoButton',
              type: 'object',
              title: 'Info Button',
              fields: [
                {
                  name: 'text',
                  type: 'object',
                  title: 'Button Text',
                  fields: [
                    {name: 'en', type: 'string', title: 'English'},
                    {name: 'de', type: 'string', title: 'Deutsch'},
                    {name: 'it', type: 'string', title: 'Italiano'},
                    {name: 'es', type: 'string', title: 'Español'},
                  ],
                },
                {
                  name: 'link',
                  type: 'url',
                  title: 'Venue Link',
                  description: 'Link to the venue website or event page',
                },
              ],
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
