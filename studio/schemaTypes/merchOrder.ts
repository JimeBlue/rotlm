import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'merchOrder',
  title: 'Merch Order',
  type: 'document',
  fields: [
    defineField({
      name: 'product_id',
      title: 'Product ID',
      type: 'string',
    }),
    defineField({
      name: 'product_name',
      title: 'Product Name',
      type: 'string',
    }),
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'object',
      fields: [
        {name: 'first_name', title: 'First Name', type: 'string'},
        {name: 'last_name', title: 'Last Name', type: 'string'},
        {name: 'email', title: 'Email', type: 'string'},
      ],
    }),
    defineField({
      name: 'message',
      title: 'Message / Notes',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Processing', value: 'processing'},
          {title: 'Shipped', value: 'shipped'},
          {title: 'Done', value: 'done'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'submitted_at',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      product: 'product_name',
      first: 'customer.first_name',
      last: 'customer.last_name',
      status: 'status',
      date: 'submitted_at',
    },
    prepare({product, first, last, status, date}) {
      const name = [first, last].filter(Boolean).join(' ')
      const d = date ? new Date(date).toLocaleDateString() : ''
      return {
        title: `${product ?? 'Unknown product'} — ${name}`,
        subtitle: `${status?.toUpperCase() ?? ''} ${d}`,
      }
    },
  },
})
