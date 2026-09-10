<template>
  <div>
    <!-- Home page: sticker-style call to action -->
    <article v-if="cta" class="container">
      <BaseCtaTitle>
        {{ title || gigs?.title || 'Gigs' }}
      </BaseCtaTitle>
    </article>

    <!-- Gigs page: neon title -->
    <article v-else class="flex justify-center container">
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
      <div class="relative mt-12 flex w-full max-w-[900px] mx-auto flex-col lg:mt-16 container">
        <div v-if="upcomingGigs.length">
          <BaseGigItem
            v-for="(gig, index) in upcomingGigs"
            :key="gig.sortDate + gig.venue"
            :index="index"
            :display-date="gig.displayDate"
            :venue="gig.venue"
            :city="gig.city"
            :time="gig.time || undefined"
            :address="gig.address || undefined"
            :google-maps-link="gig.googleMapsLink || undefined"
            :venue-link="gig.venueLink || undefined"
            :button-text="gigs?.buttonText || undefined"
          />
        </div>

        <!-- Empty state: shown when there are no upcoming gigs -->
        <div
          v-else
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
          class="text-center text-white"
        >
          <p v-if="gigs?.noUpcomingGigs.eyebrow" class="text-sm font-bold uppercase tracking-[0.3em] text-green-neon">
            {{ gigs.noUpcomingGigs.eyebrow }}
          </p>
          <h3 class="mt-4 text-3xl lg:text-5xl font-bold">
            {{ gigs?.noUpcomingGigs.heading || 'No upcoming gigs' }}
          </h3>
          <p v-if="gigs?.noUpcomingGigs.description" class="mx-auto mt-4 max-w-md text-lg text-white/60">
            {{ gigs.noUpcomingGigs.description }}
          </p>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
// Optional title override (used on the home page); falls back to the Gigs section title
// cta: call-to-action style (plain heading with spring pop) instead of the neon title
const props = defineProps<{ title?: string, cta?: boolean }>()

const { gigs } = useGigs()

const today = new Date().toISOString().split('T')[0]

const upcomingGigs = computed(() => {
  if (!gigs.value?.gigsList) { return [] }
  // The query returns gigs newest first (for the past gigs list); upcoming gigs go nearest first
  return gigs.value.gigsList
    .filter(gig => gig.sortDate >= today)
    .sort((a, b) => a.sortDate.localeCompare(b.sortDate))
})

const neonTitle = computed(() => {
  const title = props.title || gigs.value?.title || 'Gigs'
  return title.split('').map((char, i) => {
    const lastIndex = title.length - 1
    let flicker = ''
    if (i === 0) { flicker = 'neon-flicker-1' }
    else if (i === 2) { flicker = 'neon-flicker-2' }
    else if (i === lastIndex) { flicker = 'neon-flicker-3' }
    return { char, flicker }
  })
})
</script>
