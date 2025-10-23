<template>
  <div ref="stepsAnchor" class="scroll-mt-40">
    <slot name="leading" />

    <FormStepsProgress
      v-if="props.showProgress"
      :steps="props.steps"
      :next-step="formSteps.next"
      :previous-step="formSteps.previous"
      :current-step="formSteps.step"
      :is-clickable="props.progressClickable"
    />

    <div :key="formSteps.step" class="w-full">
      <slot :name="formSteps.step" />
    </div>

    <div class="mt-6 flex gap-2">
      <slot name="actions-leading" />
      <UButton
        v-if="formSteps.previous"
        :disabled="!formSteps.previous"
        type="button"
        @click="back"
      >
        {{ props.labels.back || t('buttons.back') }}
      </UButton>
      <UButton
        type="submit"
        :loading="props.submitting"
        :label="formSteps.next
          ? props.labels.next || t('buttons.next')
          : props.labels.submit || t('buttons.submit')"
      />
      <slot name="actions-trailing" />
    </div>
    <slot name="trailing" />

    <DebugPortal title="Steps">
      <nav class="flex flex-col items-center gap-2">
        <span class="inline-flex  overflow-hidden rounded bg-white">
          <button
            v-for="{ id } in props.steps"
            :key="id"
            type="button"
            :aria-selected="formSteps.step === id"
            class="aria-selected:bg-primary inline-block px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:relative aria-selected:text-white"
            @click="formSteps.step = id"
          >
            {{ id }}
          </button>
        </span>
      </nav>
    </DebugPortal>
  </div>
</template>

<script setup>
const props = defineProps({
  steps: {
    type: Array,
    required: true,
  },
  showProgress: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  progressClickable: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  submitting: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  labels: {
    type: Object,
    required: false,
    default: () => {},
  },
})
const { t } = useI18n()
const stepStore = useStepStore()
const { formSteps } = storeToRefs(stepStore)

formSteps.value.steps = props.steps

// Create a ref to store the steps container element
const stepsAnchor = ref(null)

function back() { formSteps.value.step = formSteps.value.previous }

watchEffect(async () => {
  formSteps.value.steps = props.steps
  const i = formSteps.value.steps.findIndex(s => s.id === formSteps.value.step)
  formSteps.value.stepIndex = i

  formSteps.value.previous = formSteps.value.steps[i - 1]?.id || false
  formSteps.value.first = formSteps.value.steps[0]?.id || null
  formSteps.value.next = formSteps.value.steps[i + 1]?.id || false
  formSteps.value.last = formSteps.value.steps.at(-1)?.id || null

  await nextTick()
  if (stepsAnchor.value) {
    stepsAnchor.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
    stepsAnchor.value.querySelector('input:not([type="hidden"]):not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"]):not(:disabled)',
    )?.focus()
  }
})
</script>
