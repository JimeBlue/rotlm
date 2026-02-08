<template>
  <section id="gigs" class="relative pb-16 md:pb-24 lg:mb-32">
    <div>
      <article class="mt-28 lg:mt-32 flex justify-center container">
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
          <BaseAnimatedList v-if="upcomingGigs.length" :delay="1000" @complete="gigsListComplete = true">
            <template #default>
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
                :button-text="gigs.buttonText || undefined"
              />
            </template>
          </BaseAnimatedList>
        </div>
      </ClientOnly>
      <!-- past gigs -->
      <article v-if="gigs?.pastGigsButtonText && pastGigs.length && gigsListComplete" class="mt-12 flex justify-center container">
        <BaseAnimatedModal v-slot="{ openModal }">
          <UButton
            variant="outline"
            size="lg"
            color="yellow-neon"
            class="transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(253,227,4,0.4)] hover:shadow-[0_0_30px_rgba(253,227,4,0.8),inset_0_0_20px_rgba(253,227,4,0.2)]"
            @click="openModal"
          >
            {{ gigs.pastGigsButtonText }}
          </UButton>

          <BaseAnimatedModalBody
            class="!bg-[#0d0a12] !border-green-neon shadow-[0_0_30px_rgba(139,252,43,0.5),0_0_60px_rgba(139,252,43,0.2)]"
          >
            <BaseAnimatedModalContent>
              <h3 class="text-green-neon text-xl font-semibold">
                {{ t('gigs.past_gigs_title') }}
              </h3>
              <ul class="mt-6 space-y-3">
                <li
                  v-for="gig in pastGigs"
                  :key="gig.sortDate + gig.venue"
                  class="text-white text-sm px-4 py-4"
                >
                  <span class="font-bold">{{ formatPastGigDate(gig.sortDate) }}</span> - <span class="font-bold">{{ gig.venue }}</span> - {{ gig.city }}
                </li>
              </ul>
            </BaseAnimatedModalContent>
          </BaseAnimatedModalBody>
        </BaseAnimatedModal>
      </article>
      <!-- video -->
      <article v-if="gigs?.backgroundVideoUrl" class="mt-12 lg:mt-16">
        <BaseVideoPlayer
          :background-video-url="gigs.backgroundVideoUrl"
          :video-url="gigs.videoUrl || undefined"
        />
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { locale, t } = useI18n()
const { gigs } = useGigs()

const gigsListComplete = ref(false)
const today = new Date().toISOString().split('T')[0]

const upcomingGigs = computed(() => {
  if (!gigs.value?.gigsList) { return [] }
  return gigs.value.gigsList.filter(gig => gig.sortDate >= today)
})

const pastGigs = computed(() => {
  if (!gigs.value?.gigsList) { return [] }
  return gigs.value.gigsList.filter(gig => gig.sortDate < today)
})

function formatPastGigDate(sortDate: string) {
  const [year, month, day] = sortDate.split('-')
  const shortYear = year.slice(2)
  if (locale.value === 'de') {
    return `${day}.${month}.${shortYear}`
  }
  return `${day}/${month}/${shortYear}`
}

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

definePageMeta({
  layout: 'public',
})
</script>
