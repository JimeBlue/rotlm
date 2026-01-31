<template>
  <Html :lang="head.htmlAttrs.lang">
    <Body>
      <div class="flex min-h-screen flex-1 flex-col font-body bg-black">
        <AppHeader />
        <main id="main-content" class="flex flex-1 flex-col">
          <slot />
        </main>
        <AppFooter />
        <Debug />
      </div>
    </Body>
  </Html>
</template>

<script setup>
const head = useLocaleHead()
</script>
