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
        <div class="relative mt-12 flex w-full max-w-[900px] mx-auto flex-col overflow-hidden lg:mt-16" :style="{ height: listHeight }">
          <BaseAnimatedList v-if="gigs?.gigsList?.length" :delay="1000">
            <template #default>
              <BaseGigItem
                v-for="gig in gigs.gigsList"
                :key="gig.sortDate + gig.venue"
                :display-date="gig.displayDate"
                :venue="gig.venue"
                :city="gig.city"
                :time="gig.time || undefined"
                :address="gig.address || undefined"
                :google-maps-link="gig.googleMapsLink || undefined"
                :venue-link="gig.venueLink || undefined"
                :button-text="gigs.buttonText || undefined"
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

const listHeight = computed(() => {
  const count = gigs.value?.gigsList?.length || 0
  return count ? `${count * 200}px` : '400px'
})

definePageMeta({
  layout: 'public',
})
</script>
