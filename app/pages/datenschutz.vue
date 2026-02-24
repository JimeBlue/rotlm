<template>
  <section class="bg-black min-h-screen">
    <div class="container max-w-3xl py-16 lg:py-24">
      <div class="text-white text-sm space-y-3">
        <PortableText
          v-if="legal?.datenschutz?.length"
          :value="legal.datenschutz"
          :components="portableTextComponents"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { PortableText } from '@portabletext/vue'

const { legal } = useLegal()

definePageMeta({
  layout: 'public',
})

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

function headingId(value) {
  return slugify(value.children?.map(c => c.text).join('') || '')
}

const portableTextComponents = {
  block: {
    h2: ({ value }, { slots }) => h('h2', { id: headingId(value), class: 'text-2xl font-bold mt-8 mb-3 scroll-mt-24' }, slots.default?.()),
    h3: ({ value }, { slots }) => h('h3', { id: headingId(value), class: 'text-xl font-bold mt-6 mb-2 scroll-mt-24' }, slots.default?.()),
    h4: ({ value }, { slots }) => h('h4', { id: headingId(value), class: 'text-lg font-semibold mt-4 mb-1 scroll-mt-24' }, slots.default?.()),
    normal: (_, { slots }) => h('p', { class: 'mb-2 leading-relaxed' }, slots.default?.()),
  },
  list: {
    bullet: (_, { slots }) => h('ul', { class: 'list-disc pl-5 mb-2 space-y-1' }, slots.default?.()),
    number: (_, { slots }) => h('ol', { class: 'list-decimal pl-5 mb-2 space-y-1' }, slots.default?.()),
  },
  marks: {
    strong: (_, { slots }) => h('strong', { class: 'font-bold' }, slots.default?.()),
    em: (_, { slots }) => h('em', { class: 'italic' }, slots.default?.()),
    link: ({ value }, { slots }) => {
      const isAnchor = value?.href?.startsWith('#')
      return h('a', {
        href: value?.href,
        ...(!isAnchor && { target: '_blank', rel: 'noopener noreferrer' }),
        class: 'underline hover:opacity-70',
      }, slots.default?.())
    },
  },
}
</script>
