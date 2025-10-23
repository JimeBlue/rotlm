<template>
  <div>
    <BaseHero />
    <section>
      <div class="container mt-4">
        <div class="grid lg:grid-cols-4 gap-2">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="aspect-square bg-cover bg-center cursor-pointer transition-transform"
            :class="{ 'ring ring-primary scale-105 translate-y-px': activeIndex === index }"

            :style="{ backgroundImage: `url(${item})` }"
            @click="select(index)"
          >
            <!-- <img class="rounded-lg aspect-1" :src="item"> -->
          </div>
        </div>
      </div>

      <UModal
        v-model:open="open"
        :ui="{
          content: 'bg-transparent p-0 ring-none ring-0 shadow-none rounded-none lg:max-w-4xl',
          overlay: 'bg-black',
        }"
        @update:open="(open) => {
          if (!open) {
            close()
          }
        }"
      >
        <template #content>
          <div class="flex flex-1 w-full px-12">
            <UCarousel
              ref="carousel"
              v-slot="{ item }"
              arrows
              class-names
              xfade
              auto-height
              :ui="{
                container: 'transition-[height] duration-500 items-center',
              }"
              :items="items"
              :prev="{ onClick: onClickPrev }"
              :next="{ onClick: onClickNext }"
              class="w-full mx-auto"
              @select="onSelect"
            >
              <img
                :src="item"
                width="1200"
                height="1200"
              >
            </UCarousel>
          </div>
        </template>
      </UModal>
    </section>
  </div>
</template>

<script setup lang="ts">
const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/320?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/320?random=5',
  'https://picsum.photos/640/640?random=6',
  'https://picsum.photos/640/320?random=7',
  'https://picsum.photos/640/640?random=8',
]

const carousel = useTemplateRef('carousel')
const activeIndex = ref(-1)
const open = ref(false)

function onClickPrev() {
  activeIndex.value--
}
function onClickNext() {
  activeIndex.value++
}
function onSelect(index: number) {
  activeIndex.value = index
}

async function select(index: number) {
  activeIndex.value = index
  open.value = true

  await nextTick()
  carousel.value?.emblaApi?.scrollTo(index, true)
}

function close() {
  activeIndex.value = -1
}
</script>
