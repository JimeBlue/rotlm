<script lang="ts" setup>
import { motion } from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref, useSlots } from 'vue'

interface Props {
  class?: string
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  delay: 1000,
})

const slots = useSlots()
const displayedItems = ref<{ node: unknown, id: string }[]>([])
const nextIndex = ref(0)
let stopped = false

onMounted(startLoop)
onBeforeUnmount(() => { stopped = true })

async function startLoop() {
  const notifications = slots.default ? (slots.default()[0].children ?? []) : []
  if (!notifications.length) return

  while (displayedItems.value.length < notifications.length) {
    if (stopped) return
    displayedItems.value.push({
      node: notifications[nextIndex.value],
      id: `${nextIndex.value}-${Date.now()}`,
    })
    nextIndex.value = (nextIndex.value + 1) % notifications.length
    await wait(props.delay)
  }

}

const itemsToShow = computed(() => displayedItems.value)

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
</script>

<template>
  <div
    class="flex flex-col items-center gap-4"
    :class="[props.class]"
  >
    <transition-group
      name="list"
      tag="div"
      class="flex flex-col-reverse items-center gap-3"
      move-class="move"
    >
      <motion.div
        v-for="data in itemsToShow"
        :key="data.id"
        :initial="{ scale: 0, opacity: 0 }"
        :animate="{
          scale: 1,
          opacity: 1,
          y: 0,
        }"
        :exit="{
          scale: 0,
          opacity: 0,
          y: 0,
        }"
        :transition="{
          type: 'spring',
          stiffness: 350,
          damping: 40,
        }"
        class="mx-auto w-full"
      >
        <component :is="data.node" />
      </motion.div>
    </transition-group>
  </div>
</template>

<style scoped>
.move {
  transition: transform 0.4s ease-out;
}
</style>
