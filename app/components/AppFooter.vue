<template>
  <footer class="py-4 bg-black">
    <div class="container flex flex-col sm:flex-row items-center sm:justify-between gap-4 py-4">
      <div class="flex items-center gap-4 md:order-2">
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
            class="size-8 text-white"
          />
        </a>
      </div>

      <div class="md:order-1 flex flex-col items-center sm:items-start gap-1">
        <a
          href="mailto:info@rotlm.com"
          class="text-white text-xs underline hover:opacity-70"
        >
          info@rotlm.com
        </a>
        <p v-if="footer?.copyright" class="text-white text-xxs lg:mt-2">
          {{ footer.copyright }} <span class="text-white mx-1">|</span> <span class="text-white">{{ $t('footer.built_by') }} JimeBlue</span>
        </p>
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
