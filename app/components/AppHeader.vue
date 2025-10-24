<template>
  <header class="fixed top-0 z-40 flex w-full flex-col justify-center bg-white">
    <UButton to="#main-content" class="pointer-events-none absolute z-100 opacity-0 focus:opacity-100">
      {{ t('buttons.skip_content') }}
    </UButton>

    <div class="container relative flex h-20 items-center">
      <div class="flex flex-1 items-center gap-x-6 lg:justify-between lg:gap-x-1">
        <NuxtLink :to="localePath(root)" :aria-label="t('navigation.home')">
          <Logo class="mx-auto h-[38px]" />
        </NuxtLink>
        <!-- <BaseCountdown class="hidden lg:flex" :eventdate="eventStartDate" /> -->
        <!-- <UNavigationMenu :items="pages" /> -->

        <nav v-if="pages.length > 1" class="hidden lg:block">
          <ul class="flex flex-wrap gap-x-4 xl:gap-x-6">
            <li v-for="{ to, label } in pages" :key="to">
              <NuxtLink
                :to="localePath(to)"
                class="aria-[current=page]:text-primary-500 hover:border-current text-base border-b border-white aria-[current=page]:border-primary"
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
          <UserMenu v-if="loggedIn" />

          <UButton
            v-if="!loggedIn"
            :to="localePath('/login')"
            icon="heroicons:arrow-right-end-on-rectangle"
            variant="ghost"
            size="sm"
          >
            Login
          </UButton>
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
import Logo from '~/assets/svg/starter-pro-logo-icon.svg?component'

const root = '/'

const { t } = useI18n()

const authStore = useAuthStore()
const { loggedIn, userName } = storeToRefs(authStore)
const { logout } = authStore

const localePath = useLocalePath()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
// const eventStartDate = computed(() => event.value?.starts_at || null)

const menuOpen = ref(false)

const pages = computed(() => {
  const supports_multi_guestlist = false

  if (supports_multi_guestlist) {
    const pagesArray = [
      { label: t('navigation.home'), to: '/', visible: true },
    ]

    // for now hardcode some guestlist alias and ids
    const guestlists = [
      ['Event 1', '1efab3ea-575f-6ee2-926f-8b67440a59cf'],
      ['Event 2', '1f0920e7-e86c-6a16-8766-bba664878b10'],
    ]

    // Add pages for each event
    guestlists.forEach(([alias, id]) => {
      pagesArray.push(
        { label: `${alias}`, to: `/${id}/content`, visible: true },
      // { label: t('navigation.register'), to: `/${id}/register`, visible: loggedIn.value },
      )
    })

    return pagesArray.filter(i => i.visible)
  }
  else {
    return [
      { label: t('navigation.home'), to: '/', visible: true },
      {
        label: t('navigation.register'),
        to: '/register',
        visible: loggedIn.value,
      },
    ].filter(i => i.visible)
  }
})

const localeItems = computed(() => {
  return [locales.value.map((l) => {
    return { to: switchLocalePath(l.code), label: l.name, current: locale.value === l.code, disabled: l.code === locale.value }
  })]
})
</script>
