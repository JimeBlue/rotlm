<template>
  <UModal
    :xclose="{ onClick: handleCancel }"
    :dismissible="false"
    :close="false"
    :ui="{
      content: 'divide-none',
      header: 'w-full flex-col',
      title: 'xsr-only w-full',
      body: 'py-0 sm:py-0 ',
      description: 'xsr-only' }"
  >
    <template #title>
      <div class="flex place-content-center">
        <UIcon
          v-if="type === 'error'"
          v-motion
          :initial="{
            scale: 0,
          }"
          :enter="{
            scale: 1,
            transition: {
              delay: 250,
              type: 'spring',
              stiffness: 250,
              damping: 25,
              mass: 0.5,
            },
          }"
          name="i-heroicons:exclamation-circle"
          class="size-18 text-red-500"
        />
        <UIcon
          v-if="type === 'success'"
          v-motion-pop-visible
          name="i-heroicons:check-circle"
          class="size-18 text-green-500 animate-pulse"
        />
        <UIcon
          v-if="type === 'info'"

          name="i-heroicons:light-bulb"
          class="size-18 text-primary"
        />
        <UIcon
          v-if="type === 'loading'"
          name="i-mingcute:loading-3-fill"
          class="size-18 text-primary animate-spin"
        />

        <!-- <svg
          v-if="type === 'loading'"
          class="size-18 animate-spin text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        ><circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg> -->
      </div>
      <p class="mt-2 text-lg sm:text-xl font-bold text-center font-headline" :class="{ 'sr-only': type === 'loading' }">
        {{ title }}
      </p>
    </template>

    <template v-if="description" #description>
      {{ description }}
    </template>
    <template v-if="props.type !== 'loading'" #footer>
      <div
        class="flex w-full gap-3 place-content-center"
        :class="[
          props.reverseButtons ? 'flex-row-reverse' : 'flex-row',
        ]"
      >
        <!-- Confirm Button -->
        <UButton
          v-if="props.showConfirmButton"
          :color="props.confirmButtonColor"
          :label="props.confirmButtonText"
          @click="handleConfirm"
        />

        <!-- Deny Button -->
        <UButton
          v-if="props.showDenyButton"
          :color="props.denyButtonColor"
          :label="props.denyButtonText"
          @click="handleDeny"
        />

        <!-- Cancel Button -->
        <UButton
          v-if="props.showCancelButton"
          :color="props.cancelButtonColor"
          :label="props.cancelButtonText"
          variant="outline"
          @click="handleCancel"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
type AlertType = 'info' | 'warning' | 'error' | 'success' | 'loading'

interface Props {
  title: string
  description?: string
  type?: AlertType
  ui?: object
  // SweetAlert2-like button configuration
  showConfirmButton?: boolean
  showCancelButton?: boolean
  showDenyButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  denyButtonText?: string
  confirmButtonColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  cancelButtonColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  denyButtonColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  reverseButtons?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  description: '',
  showConfirmButton: true,
  showCancelButton: false,
  showDenyButton: false,
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancel',
  denyButtonText: 'No',
  confirmButtonColor: 'primary',
  cancelButtonColor: 'neutral',
  denyButtonColor: 'error',
  reverseButtons: false,
})

// SweetAlert2-like result structure
const emit = defineEmits<{
  close: [{
    isConfirmed: boolean
    isDenied: boolean
    isDismissed: boolean
    value?: any
  }]
}>()

// Button handlers
function handleConfirm() {
  emit('close', {
    isConfirmed: true,
    isDenied: false,
    isDismissed: false,
    value: true,
  })
}

function handleDeny() {
  emit('close', {
    isConfirmed: false,
    isDenied: true,
    isDismissed: false,
    value: false,
  })
}

function handleCancel() {
  emit('close', {
    isConfirmed: false,
    isDenied: false,
    isDismissed: true,
    value: null,
  })
}
</script>
