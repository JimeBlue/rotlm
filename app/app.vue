<template>
  <UApp>
    <!-- Thin progress bar for the rare navigation that still has to wait for data -->
    <NuxtLoadingIndicator color="#fde304" :height="2" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
