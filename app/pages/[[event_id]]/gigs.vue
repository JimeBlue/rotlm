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

      <ClientOnly>
        <div class="relative mt-12 flex h-[400px] w-full max-w-[500px] mx-auto flex-col overflow-hidden lg:mt-16">
          <BaseAnimatedList v-if="gigs?.gigsList?.length" :delay="1000">
            <template #default>
              <BaseGigItem
                v-for="gig in gigs.gigsList"
                :key="gig.sortDate + gig.venue"
                :display-date="gig.displayDate"
                :venue="gig.venue"
                :city="gig.city"
              />
            </template>
          </BaseAnimatedList>
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup>
const { gigs } = useGigs()

definePageMeta({
  layout: 'public',
})
</script>
