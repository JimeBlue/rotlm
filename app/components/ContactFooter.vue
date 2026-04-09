<template>
  <footer class="py-4 bg-black">
    <div class="xl:w-1/2 md:px-16 xl:px-28 py-4 flex flex-col items-center md:flex-row md:justify-between md:items-center gap-4">

      <!-- Col 1: links + copyright — second on mobile/sm, first on md+ -->
      <div class="flex flex-col items-center md:items-start gap-1 order-2 md:order-1">
        <div class="flex gap-4">
          <NuxtLink to="/impressum" class="text-white text-xs underline hover:opacity-70">
            {{ $t('footer.imprint') }}
          </NuxtLink>
          <NuxtLink to="/datenschutz" class="text-white text-xs underline hover:opacity-70">
            {{ $t('footer.data_privacy') }}
          </NuxtLink>
        </div>
        <p v-if="footer?.copyright" class="text-white text-xxs">
          {{ footer.copyright }} <span class="mx-1">|</span> <span>{{ $t('footer.built_by') }} JimeBlue</span>
        </p>
      </div>

      <!-- Col 2: social icons — first on mobile, second on tablet+ -->
      <div class="flex items-center gap-3 order-1 md:order-2">
        <a
          v-for="link in footer?.socialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:opacity-80 transition-opacity"
        >
          <UIcon :name="getIconName(link.name)" class="size-5 text-white" />
        </a>
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
