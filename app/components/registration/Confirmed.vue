<template>
  <div>
    <h2 class="text-primary text-2xl font-bold">
      {{ t('registration.confirmed.title') }}
    </h2>
    <p>{{ t('registration.confirmed.text') }}</p>
    <div class="mt-4 lg:mt-10 space-y-6">
      <FormSummary />
    </div>

    <div class="mt-4 lg:mt-10">
      <UButton type="button" @click="view = 'confirming'">
        {{ t('buttons.back') }}
      </UButton>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const stepStore = useStepStore()
const { view } = storeToRefs(stepStore)
</script>
