<template>
  <section
    id="hero"
    class="relative mb-10 overflow-hidden bg-black"
  >
    <div class="container mx-auto pt-20 lg:pt-16">
      <PhraseLogo class="mx-auto w-full max-w-4xl" />
      <div class="mx-auto mt-4 h-1 w-20 bg-primary-500" />
    </div>
    <div class="text-white">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus debitis tempore, libero rem saepe, eos eaque sit ipsa sunt ratione aperiam reprehenderit provident praesentium nisi illum voluptas aspernatur, architecto accusantium! Minima, quae voluptatum. Debitis perspiciatis asperiores laudantium. Ipsa repellat ex quae possimus quasi quibusdam dolores delectus aspernatur dolor mollitia deserunt, adipisci laudantium praesentium quaerat placeat perspiciatis natus. In, adipisci facilis!</p>
    </div>
  </section>
</template>

<script setup>
import PhraseLogo from '~/assets/svg/phrase_logo_white.svg?component'

const props = defineProps({
  title: { type: String, default: null },
  image: { type: String, default: '/images/hero.jpg' },
})
const { t } = useI18n()
const eventStore = useEventStore()
</script>
