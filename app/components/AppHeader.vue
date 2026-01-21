<template>
  <header class="fixed top-0 z-40 flex w-full flex-col justify-center bg-black">
    <UButton to="#main-content" class="pointer-events-none absolute z-100 opacity-0 focus:opacity-100">
      {{ t('buttons.skip_content') }}
    </UButton>

    <div class="container relative flex h-20 items-center">
      <div class="flex flex-1 items-center gap-x-6 lg:justify-between lg:gap-x-1">
        <NuxtLink :to="localePath(root)" :aria-label="t('navigation.home')">
          <img :src="logoSrc" alt="ROTLM Logo" class="mx-auto h-20">
        </NuxtLink>
        <!-- <BaseCountdown class="hidden lg:flex" :eventdate="eventStartDate" /> -->
        <!-- <UNavigationMenu :items="pages" /> -->

        <nav v-if="pages.length > 1" class="hidden lg:block">
          <ul class="flex flex-wrap gap-x-4 xl:gap-x-6">
            <li v-for="{ to, label } in pages" :key="to">
              <NuxtLink
                :to="localePath(to)"
                class="text-base uppercase px-2 py-2 hover:text-yellow-neon transition-all"
                :class="route.hash === to.replace('/', '') ? 'text-green-neon' : 'text-white'"
              >
                {{ label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex items-center gap-x-2 lg:ml-4">
          <UDropdownMenu
            :items="localeItems"
            :popper="{ placement: 'bottom-start' }"
          >
            <UButton
              color="neutral"
              variant="ghost"
              icon="heroicons:globe-alt"
              size="sm"
              :label="locale"
              class="uppercase text-white hover:text-black data-[state=open]:bg-elevated data-[state=open]:text-black"
            />
            <template #item="{ item }">
              <span class="truncate">{{ item.label }}</span>

              <UIcon
                v-if="item.current"
                name="i-heroicons-check-20-solid"
                class="text-primary ms-auto size-5 shrink-0 "
              />
            </template>
          </UDropdownMenu>
        </div>

        <USlideover
          v-model:open="menuOpen"
          :ui="{ overlay: 'bg-transparent', header: 'h-20 bg-primary border-none', content: 'bg-primary ring-primary', body: 'bg-primary', close: 'text-white hover:text-white/80 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent focus-visible:bg-transparent scale-150' }"
        >
          <UButton
            size="xl"
            color="primary"
            variant="ghost"
            square
            padded
            class="relative lg:hidden"
            @click="menuOpen = true"
          >
            <template #leading>
              <div class="text-white grid size-5 transform place-items-center">
                <span
                  aria-hidden="true"
                  class="absolute block h-0.5 w-5 transform rounded-lg bg-current transition duration-300 ease-in-out"
                  :class="{
                    'rotate-45': menuOpen,
                    ' -translate-y-1.5': !menuOpen,
                  }"
                />
                <span
                  aria-hidden="true"
                  class="absolute block h-0.5 w-5 transform rounded-lg bg-current transition duration-300 ease-in-out"
                  :class="{ 'opacity-0': menuOpen }"
                />
                <span
                  aria-hidden="true"
                  class="absolute block h-0.5 w-5 transform rounded-lg bg-current transition duration-300 ease-in-out"
                  :class="{
                    '-rotate-45': menuOpen,
                    ' translate-y-1.5': !menuOpen,
                  }"
                />
              </div>
            </template>
            <span class="sr-only lg:not-sr-only">Menu</span>
          </UButton>

          <template #body>
            <div class="flex-1">
              <ul class="space-y-3">
                <li v-for="{ to, label } in pages" :key="to">
                  <UButton
                    :to="localePath(to)"
                    variant="ghost"
                    color="neutral"
                    block
                    justify="start"
                    class="justify-start! hover:bg-transparent focus:bg-transparent active:bg-transparent focus-visible:bg-transparent"
                    @click="menuOpen = false"
                  >
                    <span
                      class="text-2xl font-extrabold uppercase transition-all hover:text-yellow-neon"
                      :class="route.hash === to.replace('/', '') ? 'text-green-neon' : 'text-black'"
                    >
                      {{ label }}
                    </span>
                  </UButton>
                </li>
              </ul>
            </div>
          </template>
        </USlideover>
      </div>
    </div>
  </header>
</template>

<script setup>
const logoSrc = '/images/rotlm_logo_white_bg_transparent.png'

const root = '/'

const { t } = useI18n()
const route = useRoute()

const localePath = useLocalePath()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const menuOpen = ref(false)

const { navigation } = useNavigation()

const pages = computed(() => {
  return navigation.value.map(item => ({
    label: item.label,
    to: item.anchor ? `/#${item.anchor}` : '/',
  }))
})

const localeItems = computed(() => {
  return [locales.value.map((l) => {
    return { to: switchLocalePath(l.code), label: l.name, current: locale.value === l.code, disabled: l.code === locale.value }
  })]
})
</script>
