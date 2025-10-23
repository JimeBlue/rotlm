<template>
  <div :id="`accordion-${Accordion.id}`">
    <ul class="list-style-none m-0 space-y-4 p-0">
      <slot />
    </ul>
    <div v-if="!single && buttons" class="mt-2 flex flex-wrap gap-2">
      <button type="button" class="btn btn-primary mt-2 p-2" @click="openAll">
        Open All
      </button>
      <button type="button" class="btn btn-primary mt-2 p-2" @click="closeAll">
        Close All
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  buttons: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  open: {
    type: Array,
    required: false,
    default: () => [],
  },
  id: {
    type: String,
    required: true,
    default: () => 'default',
  },
  scroll: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  single: {
    type: Boolean,
    required: false,
    default: () => false,
  },
})

const Accordion = ref({
  id: props.id,
  scroll: props.scroll,
  count: 0,
  open: [],
  single: props.single,
})

function updateAccordion(data) {
  Accordion.value = {
    ...Accordion.value,
    ...data,
  }
}

function setOpenItems(items) {
  if (!props.open.length) { return (Accordion.value.open = []) }
  Accordion.value.open = props.single ? [props.open[0]] : [...props.open]
}

function scrollToFirst() {
  document.getElementById(`accordion-${Accordion.value.id}`).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
  setTimeout(() => (Accordion.value.scroll = props.scroll), 1000)
}
function closeAll() {
  if (!Accordion.value.open.length) { return }

  Accordion.value.open = []
  if (props.scroll) { scrollToFirst() }
}

function openAll() {
  if (Accordion.value.open.length - 1 === Accordion.value.count) { return }

  Accordion.value.scroll = false
  Accordion.value.open = [...Array(Accordion.value.count + 1).keys()]
  if (props.scroll) { scrollToFirst() }
  // Accordion.value.scroll = props.scroll
}

provide('Accordion', { Accordion, updateAccordion })

watchEffect(() => {
  setOpenItems(props.open)
})

onMounted(() => {
  setOpenItems()
})
</script>
