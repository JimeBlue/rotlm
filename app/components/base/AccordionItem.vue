<template>
  <li
    :id="`accordion-${Accordion.id}-${props.index}`"
    class="border-b border-gray-50"
  >
    <button
      type="button"
      class="relative flex w-full items-start justify-between py-2 pl-6 pr-12 text-left lg:py-4"
      @click="open"
    >
      <ChevronDownIcon
        class="pointer-events-none absolute right-4 size-6 shrink-0 fill-brand-500 transition-transform duration-300 ease-out"
        :class="visible ? 'rotate-180' : ''"
      />
      <!-- <MinusIcon
        class="pointer-events-none absolute right-4 size-6 shrink-0 fill-brand-500 transition-transform duration-300 ease-out"
      /> -->
      <slot name="accordion-trigger" />
    </button>

    <article
      class="grid transition-[grid-template-rows] duration-300"
      :class="visible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      @transitionstart="handleTransitionStart"
      @transitionend="handleTransitionEnd"
    >
      <div class="overflow-hidden">
        <div class="pb-8 pl-6 pr-12">
          <slot name="accordion-content" />
        </div>
      </div>
    </article>
  </li>
</template>

<script setup>
import MinusIcon from '@/assets/svg/minus.svg?component'
import ChevronDownIcon from '@/assets/svg/chevron-down.svg?component'

const props = defineProps({
  index: {
    type: Number,
    required: true,
    default: () => 0,
  },
})

const { Accordion, updateAccordion } = inject('Accordion')

updateAccordion({ count: props.index })

const visible = computed(() => Accordion.value.open.includes(props.index))

function handleTransitionEnd() {
  if (!Accordion.value.scroll) { return }
  if (visible.value) {
    document
      .getElementById(`accordion-${Accordion.value.id}-${props.index}`)
      .scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
  }
}

function open() {
  if (visible.value) {
    const visibleIndex = Accordion.value.open.indexOf(props.index)
    if (visibleIndex !== -1) { Accordion.value.open.splice(visibleIndex, 1) }
  }
  else {
    if (Accordion.value.single) {
      Accordion.value.open = [props.index]
      return
    }
    Accordion.value.open.push(props.index)
  }
}
</script>
