const defaults = {
  ring: 'ring-1 ring-inset focus:ring-inset',
  padding: {
    sm: 'px-4 py-4 group-has-[label]/floating:pt-6',
  },
  height: 'h-5',
  size: 'size-4',
}

const floatingLabel = 'text-sm font-medium text-gray-900'

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'primary',
      neutral: 'gray',
    },
    alert: {
      rounded: 'rounded',
    },
    badge: {
      size: {
        xs: 'text-[10px] px-2 py-0.5',
      },
    },
    button: {
      variants: {
        color: {
          'green-neon': '',
          'yellow-neon': '',
        },
      },
      compoundVariants: [
        {
          color: 'green-neon' as any,
          variant: 'solid' as any,
          class: 'text-black bg-green-neon hover:bg-green-neon/75 active:bg-green-neon/75 disabled:bg-green-neon aria-disabled:bg-green-neon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-neon',
        },
        {
          color: 'green-neon' as any,
          variant: 'outline' as any,
          class: 'ring ring-inset ring-green-neon/50 text-green-neon hover:bg-green-neon/10 active:bg-green-neon/10 disabled:bg-transparent aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-green-neon',
        },
        {
          color: 'yellow-neon' as any,
          variant: 'solid' as any,
          class: 'text-black bg-yellow-neon hover:bg-yellow-neon/75 active:bg-yellow-neon/75 disabled:bg-yellow-neon aria-disabled:bg-yellow-neon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-neon',
        },
        {
          color: 'yellow-neon' as any,
          variant: 'outline' as any,
          class: 'ring ring-inset ring-yellow-neon/50 text-yellow-neon hover:bg-yellow-neon/10 active:bg-yellow-neon/10 disabled:bg-transparent aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-neon',
        },
      ],
      defaultVariants: {
        color: 'green-neon' as any,
        variant: 'solid',
        size: 'xl',
      },
    },
    buttonGroup: {
      shadow: 'shadow-none',
    },
    checkbox: { slots: { label: 'block font-medium text-white' } },
    formField: { slots: { label: 'block font-medium text-white' }, defaultVariants: { size: 'md' } },
    input: {
      slots: { root: 'flex' },
      variants: { color: { 'green-neon': '' } },
      compoundVariants: [
        {
          color: 'green-neon' as any,
          variant: ['outline', 'subtle'] as any,
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-neon',
        },
        {
          color: 'green-neon' as any,
          highlight: true,
          class: 'ring ring-inset ring-green-neon',
        },
      ],
      defaultVariants: { size: 'xl', color: 'green-neon' as any },
    },
    inputNumber: { slots: { root: 'flex' }, defaultVariants: { size: 'xl' } },
    inputMenu: { slots: { root: 'flex' }, defaultVariants: { size: 'xl' } },
    select: { slots: { base: 'w-full' }, defaultVariants: { size: 'xl' } },
    selectMenu: { slots: { base: 'w-full' }, defaultVariants: { size: 'xl' } },
    textarea: {
      slots: { root: 'flex' },
      variants: { color: { 'green-neon': '' } },
      compoundVariants: [
        {
          color: 'green-neon' as any,
          variant: ['outline', 'subtle'] as any,
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-neon',
        },
        {
          color: 'green-neon' as any,
          highlight: true,
          class: 'ring ring-inset ring-green-neon',
        },
      ],
      defaultVariants: { size: 'xl', color: 'green-neon' as any },
    },
    modal: {
      slots: {
        overlay: 'bg-black/40',
        description: 'mt-2 text-base text-pretty',
      },
    },

  },
})
