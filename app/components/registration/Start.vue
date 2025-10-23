<template>
  <div>
    <div class="space-y-2">
      <h2 class="text-2xl font-bold text-brand-500">
        {{ t('registration.choice.title') }}
      </h2>
      <p>
        {{ t('registration.choice.text') }}
      </p>
    </div>
    <div class="mt-4 flex flex-wrap gap-4 lg:mt-10">
      <UButton size="lg" @click="view = 'confirming'">
        {{ t('buttons.to_confirming') }}
      </UButton>
      <UButton size="lg" @click="view = 'cancelling'">
        {{ t('buttons.to_cancelling') }}
      </UButton>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()

const stepStore = useStepStore()
const { view } = storeToRefs(stepStore)

const formStore = useFormStore()
const { setFormData } = formStore

await setFormData()
</script>
