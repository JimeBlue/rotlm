<template>
  <span
    class="flex flex-1 items-center justify-center rounded-xl font-body text-xxs font-normal uppercase tracking-wide md:flex"
    :class="[classes[variant], sizes[size]]"
  >
    <slot />
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    required: false,
    default: () => 'default',
  },
  size: {
    type: String,
    required: false,
    default: () => 'default',
  },
})

const sizes = {
  sm: 'min-h-4 px-2',
  default: 'min-h-6 px-4',
}

const classes = {
  default: 'bg-primary text-white',
  black: 'bg-black text-gray-50',
  cancelled: 'bg-red-700 text-red-50',
  confirmed: 'bg-green-700 text-green-50',
  invited: 'bg-[#FAD022] text-black',
  requested: 'bg-[#FAD022] text-black',
}
</script>
