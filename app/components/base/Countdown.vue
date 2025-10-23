<template>
  <div class="sm:mr-8">
    <VueCountdown
      v-if="showCountdown"
      v-slot="{ days, hours, minutes, seconds }"
      :time="dateDiff"
      :interval="1000"
      tag="ol"
      class="flex items-center justify-center"
    >
      <li
        v-for="(value, unit) in { days, hours, minutes, seconds }"
        :key="unit"
        class="relative"
      >
        <div :class="styles.countdownItem">
          <span :class="styles.value">{{ padZero(value) }}</span>
          <span :class="styles.label">{{ t(`countdown.${unit}`) }}</span>
        </div>
      </li>
    </VueCountdown>

    <ol
      v-else
      class="flex items-center justify-center"
    >
      <li
        v-for="unit in ['days', 'hours', 'minutes', 'seconds']"
        :key="unit"
        :class="styles.countdownItem"
      >
        <span :class="[styles.value, styles.valueLoading]">00</span>
        <span :class="styles.label">{{ t(`countdown.${unit}`) }}</span>
      </li>
    </ol>
  </div>
</template>

<script setup>
import VueCountdown from '@chenfengyuan/vue-countdown'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  eventdate: {
    type: [String, null],
    required: true,
  },
})

const { t } = useI18n()
const showCountdown = ref(false)

const dateDiff = computed(() => {
  const eventDate = new Date(props.eventdate).getTime()
  const now = Date.now()
  return Math.max(eventDate - now, 0)
})

const padZero = value => (value < 10 ? `0${value}` : `${value}`)

const styles = {
  countdownItem: 'flex flex-1 flex-col space-y-1 p-2 text-center text-base font-bold leading-none',
  value: 'text-xs',
  valueLoading: 'animate-pulse',
  label: 'font-heading text-xxs font-normal uppercase tracking-wide',
}

onMounted(() => setTimeout(() => { showCountdown.value = true }, 1000))
</script>
