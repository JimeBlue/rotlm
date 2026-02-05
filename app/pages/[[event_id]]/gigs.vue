<template>
  <section id="gigs" class="relative pb-16 md:pb-24 lg:mb-32">
    <BaseHeroPhrase />
    <div class="container">
      <article>
        <h2 class="text-3xl lg:text-5xl font-bold text-white text-center uppercase mt-16 lg:mt-24">
          {{ gigs?.title || 'Gigs' }}
        </h2>
        <div class="mx-auto mt-4 h-1 w-20 bg-primary-500" />
      </article>
    </div>
  </section>
</template>

<script setup>
const { gigs } = useGigs()

definePageMeta({
  layout: 'public',
})
</script>
