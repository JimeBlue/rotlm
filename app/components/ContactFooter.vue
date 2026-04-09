<template>
  <footer class="py-4 bg-black">
    <div class="lg:w-1/2 px-8 py-4 flex flex-col items-start gap-1">
      <div class="flex gap-4">
        <NuxtLink
          to="/impressum"
          class="text-white text-xs underline hover:opacity-70"
        >
          {{ $t('footer.imprint') }}
        </NuxtLink>
        <NuxtLink
          to="/datenschutz"
          class="text-white text-xs underline hover:opacity-70"
        >
          {{ $t('footer.data_privacy') }}
        </NuxtLink>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <p v-if="footer?.copyright" class="text-white text-xxs">
          {{ footer.copyright }} <span class="mx-1">|</span> <span>{{ $t('footer.built_by') }} JimeBlue</span>
        </p>
        <div class="flex items-center gap-3">
          <a
            v-for="link in footer?.socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:opacity-80 transition-opacity"
          >
            <UIcon
              :name="getIconName(link.name)"
              class="size-5 text-white"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { footer } = useFooter()

const iconMap = {
  spotify: 'lineicons:spotify-original',
  instagram: 'bi:instagram',
  youtube: 'famicons:logo-youtube',
  facebook: 'bi:facebook',
  bandcamp: 'cib:bandcamp',
}

function getIconName(name) {
  return iconMap[name.toLowerCase()] || 'i-lucide-link'
}
</script>
