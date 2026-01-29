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
      <p v-if="footer?.copyright" class="text-white text-sm md:order-1">
        {{ footer.copyright }}
      </p>
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
