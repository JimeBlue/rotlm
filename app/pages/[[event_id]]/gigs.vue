<template>
  <section id="gigs" class="relative pb-16 md:pb-24 lg:mb-32">
    <div class="container">
      <article class="mt-28 lg:mt-32 flex justify-center">
        <div class="neon-wrapper">
          <div class="neon-glow" />
          <h2 class="neon-text text-5xl lg:text-7xl text-center uppercase">
            <span
              v-for="(letter, i) in neonTitle"
              :key="i"
              :class="letter.flicker"
            >{{ letter.char }}</span>
          </h2>
        </div>
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

const neonTitle = computed(() => {
  const title = gigs.value?.title || 'Gigs'
  return title.split('').map((char, i) => {
    const lastIndex = title.length - 1
    let flicker = ''
    if (i === 0) { flicker = 'neon-flicker-1' }
    else if (i === 2) { flicker = 'neon-flicker-2' }
    else if (i === lastIndex) { flicker = 'neon-flicker-3' }
    return { char, flicker }
  })
})

const listHeight = computed(() => {
  const count = gigs.value?.gigsList?.length || 0
  return count ? `${count * 200}px` : '400px'
})

definePageMeta({
  layout: 'public',
})
</script>
