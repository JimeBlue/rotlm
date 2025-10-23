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
      color: {
        gray: {
          solid: 'shadow-none',
        },
      },
      variant: {
        outline: 'focus-visible:ring-2',
      },
      default: {
        color: 'primary',
        size: 'xl',
      },
    },
    buttonGroup: {
      shadow: 'shadow-none',
    },
    formField: { defaultVariants: { size: 'md' } },
    input: { slots: { root: 'flex' }, defaultVariants: { size: 'xl' } },
    inputNumber: { slots: { root: 'flex' }, defaultVariants: { size: 'xl' } },
    inputMenu: { slots: { root: 'flex' }, defaultVariants: { size: 'xl' } },
    select: { slots: { base: 'w-full' }, defaultVariants: { size: 'xl' } },
    selectMenu: { slots: { base: 'w-full' }, defaultVariants: { size: 'xl' } },
    textarea: { slots: { root: 'flex' }, defaultVariants: { size: 'xl' } },
    modal: {
      slots: {
        overlay: 'bg-black/40',
        description: 'mt-2 text-base text-pretty',
      },
    },

  },
})
