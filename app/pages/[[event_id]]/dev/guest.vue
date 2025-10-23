<template>
  <div>
    <BaseHero />
    <section>
      <div class="container">
        <FormsSingleGuest :guest="user" />
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
