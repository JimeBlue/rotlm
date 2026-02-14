<template>
  <section id="gigs" class="relative pb-16 md:pb-24">
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
            class="!bg-white/5 !backdrop-blur-xl !border-white/15"
          >
            <BaseAnimatedModalContent>
              <h3 class="text-white text-xl font-semibold pb-4 border-b border-white/10">
                {{ t('gigs.past_gigs_title') }}
              </h3>
              <ul class="mt-4 space-y-3">
                <li
                  v-for="gig in pastGigs"
                  :key="gig.sortDate + gig.venue"
                  class="text-white text-sm px-4 py-4"
                >
                  <span class="font-bold text-green-neon">{{ formatPastGigDate(gig.sortDate) }}</span> - <span class="font-bold">{{ gig.venue }}</span> - <span class="opacity-60">{{ gig.city }}</span>
                </li>
              </ul>
            </BaseAnimatedModalContent>
          </BaseAnimatedModalBody>
        </BaseAnimatedModal>
      </article>
      <!-- video -->
      <article v-if="gigs?.backgroundVideoUrl" class="mt-12 lg:mt-32">
        <div v-if="gigs.videoSectionTitle || gigs.videoSectionDescription" class="container mb-8 lg:mb-12 text-center">
          <h3
            v-if="gigs.videoSectionTitle"
            ref="videoTitleEl"
            class="text-3xl lg:text-5xl font-bold text-white text-center uppercase origin-center"
          >
            {{ gigs.videoSectionTitle }}
          </h3>
          <div class="mx-auto mt-4 h-1 w-20 bg-green-neon" />
          <p v-if="gigs.videoSectionDescription" class="text-lg leading-relaxed text-white max-w-3xl mx-auto whitespace-pre-line mt-8">
            {{ gigs.videoSectionDescription }}
          </p>
        </div>
        <BaseVideoPlayer
          :background-video-url="gigs.backgroundVideoUrl"
          :video-url="gigs.videoUrl || undefined"
          :poster-url="gigs.videoPosterUrl || undefined"
        />
      </article>
      <!-- grid -->
      <article class="mt-12 lg:mt-32">
        <div v-if="gigs?.gridSectionTitle || gigs?.gridSectionDescription" class="container mb-8 lg:mb-12 text-center">
          <h3
            v-if="gigs.gridSectionTitle"
            ref="gridTitleEl"
            class="text-3xl lg:text-5xl font-bold text-white text-center uppercase origin-center"
          >
            {{ gigs.gridSectionTitle }}
          </h3>
          <div class="mx-auto mt-4 h-1 w-20 bg-green-neon" />
          <p v-if="gigs.gridSectionDescription" class="text-lg leading-relaxed text-white max-w-3xl mx-auto whitespace-pre-line mt-8">
            {{ gigs.gridSectionDescription }}
          </p>
        </div>
        <BaseSkewedGrid v-if="gigs?.gigsImages?.length" :images="gigs.gigsImages" />
      </article>
      <article class="mt-12 lg:mt-32 px-28">
        <img
          v-if="footer?.image2"
          :src="footer.image2"
          alt=""
          class="mx-auto lg:w-1/2"
        >
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { locale, t } = useI18n()
const { gigs } = useGigs()
const { footer } = useFooter()

const gigsListComplete = ref(false)
const videoTitleEl = ref<HTMLElement>()
const gridTitleEl = ref<HTMLElement>()

function setupScrollScale(target: Ref<HTMLElement | undefined>) {
  const { apply } = useMotion(target, { initial: { scale: 1 } })
  let hasLeft = false
  useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (!isIntersecting) {
      hasLeft = true
      apply({ scale: 0.85, transition: { duration: 0 } })
    }
    else if (hasLeft) {
      apply({ scale: 1, transition: { type: 'spring', stiffness: 350, damping: 8 } })
    }
  }, { threshold: 0.3 })
}

setupScrollScale(videoTitleEl)
setupScrollScale(gridTitleEl)
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
