<template>
  <div class="bg-black min-h-screen py-24">
    <div class="container mx-auto px-6 max-w-xl">
      <NuxtLink
        :to="backLink"
        class="text-green-neon hover:text-white text-sm uppercase tracking-wide mb-6 flex justify-end"
      >
        <span>{{ t('merch.backToShop') }}</span>
      </NuxtLink>

      <div v-if="product" class="flex flex-col items-center">
        <!-- Image -->
        <div class="relative bg-blue-neon w-full aspect-square overflow-hidden mb-8">
          <img
            v-if="product.image"
            :src="sanityImageUrl(product.image.url)"
            :alt="product.image.alt || product.name"
            class="w-full h-full object-contain"
          >
          <!-- Badge -->
          <span
            v-if="product.badge?.show && badgeLabel"
            class="absolute top-3 left-0 text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-r-sm badge-bounce"
            :class="product.badge.type === 'limited' ? 'bg-primary-300' : product.badge.type === 'new' ? 'bg-green-neon' : 'bg-yellow-neon'"
          >
            {{ badgeLabel }}
          </span>
        </div>

        <!-- Info -->
        <div class="text-center w-full">
          <h1 class="font-bold text-white text-2xl uppercase tracking-wide leading-tight">
            {{ product.name }}
          </h1>
          <p v-if="product.description" class="text-white text-base mt-3">
            {{ product.description }}
          </p>
          <div class="mt-4 flex items-center justify-center gap-3">
            <span v-if="product.originalPrice" class="relative inline-block text-gray-500 text-base">
              {{ product.originalPrice }} €
              <svg
                class="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 30 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <mask
                  id="strike-detail"
                  style="mask-type:alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="30"
                  height="20"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 0h30v19.412H0V0z"
                    fill="currentColor"
                  />
                </mask>
                <g mask="url(#strike-detail)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23.864 18.494c.108-.051.215-.104.323-.154-.58-.375-.825-.923-2.074-1.116l1.751 1.27m-10.638-7.7-.335.135c1.008.559 1.227 1.439 2.762 1.783l-2.427-1.918M7.636 7.89l.361-.103-2.862-2.976-.357.109c.953.99 1.903 1.98 2.857 2.97m-.194 7.209.25.094c.543-.363 1.058-.74 1.636-1.084.562-.336 1.064-.977.92-1.47L7.44 15.1m-1.447-1.077c.812-.51 1.663-1.004 2.43-1.535.762-.528 1.441-1.094 2.156-1.643-2.078.79-3.266 2.015-4.587 3.178m6.878-4.331 5.1-3.273-.225-.115-5.74 3.208.865.18m-4.717 3.673c-.86.558-1.717 1.12-2.582 1.675-1.01.649-2.033 1.29-3.034 1.942-.297.194-.549.41-.806.622-.324.267-.611.547-.958.803-.093.07-.361.12-.504.096-.127-.021-.297-.173-.267-.242.138-.306.246-.634.535-.895.704-.636 1.423-1.257 2.36-1.82 1.075-.645 1.745-1.497 2.694-2.216 1.076-.813 2.265-1.579 3.406-2.365.229-.158.491-.304.686-.473.085-.075.125-.229.047-.29-.66-.51-1.402-.989-2.025-1.512A27.609 27.609 0 0 1 5.675 6.79a39.498 39.498 0 0 1-1.95-2.184c-.267-.317-.4-.67-.619-1-.339-.52-.774-1.024-1.03-1.556-.26-.539-.353-1.103-.549-1.764 1.08.19 1.377.548 1.622.93.462.719.88 1.446 1.4 2.15.451.605.982 1.194 1.549 1.77.46.465 1.037.894 1.54 1.347.518.466 1.012.94 1.63 1.516.035-.202.113-.304.057-.37-.71-.82-1.449-1.633-2.158-2.453-.494-.57-1.018-1.135-1.403-1.728-.235-.364-.293-.775-.319-1.169-.016-.242.174-.49.273-.735.301.114.62.22.898.35.138.066.2.182.296.274-.678.3-.511.632-.402 1.037.23.835 1.239 1.435 1.796 2.165.61.803 1.216 1.609 1.926 2.383.419.457 1.035.857 1.516 1.244l11.458-6.206-.178.652c.27-.148.5-.278.74-.402.526-.272 1.078-.53 1.58-.815.657-.371 1.27-.766 1.91-1.147C27.8.76 28.334.434 28.91.133c.163-.086.461-.091.697-.133-.023.17.073.403-.09.503-1.448.897-2.945 1.771-4.423 2.653-1.592.95-3.174 1.906-4.77 2.854-1.09.647-2.226 1.268-3.282 1.93-.673.421-1.218.905-1.858 1.343-.4.274-.918.494-1.284.779-.148.115-.151.379-.011.502a73.545 73.545 0 0 0 2.61 2.201c.886.721 1.833 1.412 2.948 2.034.713.397 1.273.88 1.978 1.282.77.441 1.621.836 2.446 1.247.772.385 1.122.873 1.188 1.44.035.3-.234.418-.67.28-1.786-.563-3.527-1.126-4.427-2.277-.435-.555-1.349-.994-2.07-1.474-.712-.475-1.481-.921-2.176-1.402-1.03-.714-2.021-1.446-3.018-2.176-.352-.258-.622-.26-.987.006-.504.367-.913.687-.716 1.228.118.324-.228.779-.621 1.065-.954.694-2.071 1.316-3.09 1.982-.589.385-1.011.87-1.691 1.184-.856.394-1.134.956-1.708 1.427-.145.12-.261.265-.46.342-.174.067-.446.058-.677.083.016-.129-.03-.272.056-.384.376-.49.738-.988 1.204-1.453.45-.447 1.039-.85 1.531-1.284.844-.74 1.657-1.49 2.49-2.232.088-.078.229-.139.346-.207-.072-.038-.147-.075-.22-.112"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </span>
            <span class="text-white font-bold text-lg">{{ product.price }} €</span>
          </div>
          <p v-if="merchContent?.productOrderText" class="text-white mt-8 mb-8">
            {{ merchContent.productOrderText }}
          </p>
        </div>
      </div>

      <!-- Order form -->
      <div v-if="product" class="mt-12 border-t border-gray-500 pt-12">
        <motion.h2
          class="font-bold text-green-neon text-2xl uppercase tracking-wide mb-8 text-center"
          :initial="{ opacity: 0, scale: 0 }"
          :while-in-view="{ opacity: 1, scale: 1 }"
          :viewport="{ once: true }"
          :transition="{
            delay: 0.1,
            duration: 0.4,
            scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
          }"
        >
          {{ t('merch.order.title') }}
        </motion.h2>
        <MerchOrderForm :back-link="backLink" />
      </div>

      <div v-else class="text-gray-400 text-center">
        Product not found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { motion } from 'motion-v'

definePageMeta({
  layout: 'public',
})

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { products } = useMerchProducts()
const { merchContent } = useMerchContent()

const product = computed(() => products.value.find(p => p.productId === route.params.id))

const badgeLabel = computed(() => {
  if (!product.value?.badge?.show) { return '' }
  if (product.value.badge.type === 'custom') { return product.value.badge.customLabel }
  return t(`merch.badge.${product.value.badge.type}`)
})

const backLink = computed(() => {
  const eventId = route.params.event_id
  return eventId ? localePath(`/${eventId}/merch`) : localePath('/merch')
})
</script>
