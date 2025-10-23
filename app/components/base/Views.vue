<template>
  <div ref="viewAnchor" class="scroll-mt-40">
    <!-- <Transition
      mode="out-in"
      enter-active-class="transition duration-200 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:duration-0"
      enter-from-class="translate-y-2 opacity-0"
      leave-active-class="transition duration-200 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:duration-0"
      leave-to-class="translate-y-2 opacity-0"
    > -->
    <div :key="view" class="">
      <slot :name="view" />
    </div>
    <!-- </Transition> -->
  </div>

  <DebugPortal title="Views">
    <nav class="flex flex-col items-center gap-2">
      <span class="flex flex-col overflow-hidden rounded bg-white">
        <button
          v-for="v in views"
          :key="v"
          type="button"
          :aria-selected="view === v"
          class="aria-selected:bg-primary inline-block px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:relative aria-selected:text-white"
          @click="view = v"
        >
          {{ v }}
        </button>
      </span>
    </nav>
  </DebugPortal>
</template>

<script setup>
defineProps({
  views: Array,
})

const stepStore = useStepStore()
const { view } = storeToRefs(stepStore)

const viewAnchor = ref(null)

watch(view, async () => {
  await nextTick()
  if (viewAnchor.value) {
    viewAnchor.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
})
</script>
