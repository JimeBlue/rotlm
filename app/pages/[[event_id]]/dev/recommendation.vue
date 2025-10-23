<template>
  <div>
    <BaseHero />
    <section>
      <div class="container">
        <RegistrationRecommending />
      </div>
    </section>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<style>

</style>
