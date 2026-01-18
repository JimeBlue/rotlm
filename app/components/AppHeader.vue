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
                class="text-base text-white border border-white rounded-xl px-6 py-2 hover:bg-white/10 transition-all"
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
              color="primary"
              variant="ghost"
              icon="heroicons:globe-alt"
              size="sm"
              :label="locale"
              class="uppercase data-[state=open]:bg-elevated"
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
          :transition="false"
          title="Menu"
          :ui="{ header: 'h-20' }"
        >
          <UButton
            size="md"
            color="primary"
            variant="soft"
            square
            padded
            class="relative lg:hidden"
            @click="menuOpen = true"
          >
            <template #leading>
              <div class="text-primary grid size-5 transform place-items-center">
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
                    color="primary"
                    block
                    justify="start"
                    class="font-bold"
                    @click="menuOpen = false"
                  >
                    {{ label }}
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
