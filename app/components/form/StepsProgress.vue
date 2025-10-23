<template>
  <div v-if="steps.length > 1" class="mx-auto max-w-3xl ">
    <!-- {{ currentStep }} // {{ steps.length }} -->
    <transition-group
      enter-active-class="transition"
      enter-from-class="opacity-0 -translate-y-8"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="absolute transition"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-8"
      tag="ol"
      class="relative z-10 mb-8 flex text-sm font-medium text-gray-900 lg:mb-12"
      :class="{
        'sticky -top-4 -mx-4 bg-white px-4 md:-top-8 md:-mx-8 md:px-8': inModal,
        'lg:pt-8': labels,
      }"
    >
      <li
        v-for="(step, index) in steps"
        :key="step.id"
        class="relative flex items-center"
        :class="step.id === lastStep ? '' : 'flex-1'"
        :data-previous="progress.previous.includes(step.id)"
        :data-next="progress.next.includes(step.id)"
        :data-active="step.id === currentStep"
      >
        <component
          :is="isClickable ? 'button' : 'div'"
          class="relative flex flex-col items-center"
          :class="{
            'rounded before:absolute before:inset-0 before:scale-x-[2] before:scale-y-150':
              isClickable,
          }"
          type="button"
          @click="isClickable ? setStep(step.id) : null"
        >
          <!-- title -->
          <span
            v-if="labels"
            class="absolute -top-2 hidden -translate-y-full font-headline lg:block lg:whitespace-nowrap"
            :class="currentStep === step.id ? 'text-primary' : 'text-gray-500'"
          >
            {{ step.title }}
          </span>

          <span
            class="flex size-8 items-center justify-center rounded-full text-center text-[12px] font-bold leading-6"
            :class="{
              'bg-primary text-white':
                step.id === currentStep || progress.previous.includes(step.id),
              'bg-gray-200 text-gray-900': progress.next.includes(step.id),
            }"
          >
            <span>
              {{ index + 1 }}
            </span>
          </span>
        </component>

        <!-- line -->
        <div
          v-if="index + 1 !== steps.length"
          class="relative mx-2 h-[2px] w-full flex-1 rounded-lg sm:mx-4"
          :class="
            progress.previous.includes(step.id) ? 'bg-primary' : 'bg-gray-200 '
          "
        >
          <span
            class="absolute inset-0 w-0 rounded-full transition-all duration-200 ease-out"
            :class="{
              'bg-primary w-1/2': currentStep === step.id,
              'bg-primary w-full': progress.previous.includes(step.id),
            }"
          />
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
const props = defineProps({
  labels: {
    type: Boolean,
    default: true,
  },
  inModal: {
    type: Boolean,
    required: false,
    default: false,
  },
  isClickable: {
    type: Boolean,
    required: false,
    default: false,
  },
  steps: Array,
  nextStep: [String, Boolean],
  previousStep: [String, Boolean],
  currentStep: String,
})

const stepStore = useStepStore()
const { formSteps } = storeToRefs(stepStore)

function setStep(id) { formSteps.value.step = id }

const lastStep = computed(() => props.steps.slice(-1)[0].id)

const progress = computed(() => {
  const currentIndex = props.steps.findIndex(
    step => step.id === props.currentStep,
  )
  return {
    previous: props.steps.slice(0, currentIndex).map(item => item.id),
    next: props.steps.slice(currentIndex + 1).map(item => item.id),
  }
})
</script>
