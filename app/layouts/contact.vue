<template>
  <div class="flex min-h-screen flex-1 flex-col font-body bg-black">
    <AppHeader />
    <main id="main-content" class="flex flex-1 flex-col">
      <slot />
    </main>
    <ContactFooter />
  </div>
</template>
