<template>
  <div>
    <h2 class="text-primary text-2xl font-bold">
      {{ t('registration.closed.title') }}
    </h2>
    <p v-html="t('registration.closed.text')" />
    <!-- <div class="mt-4 lg:mt-10">
      <button class="btn btn-primary" type="button" @click="view = 'start'">
        {{ t('buttons.back') }}
      </button>
    </div> -->
  </div>
</template>

<script setup>
const { t } = useI18n()
const stepStore = useStepStore()
const { view } = storeToRefs(stepStore)
</script>
