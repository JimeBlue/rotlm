import { defineStore } from 'pinia'

export const useStepStore = defineStore('step', () => {
  const formSteps = ref({
    step: '1',
    stepIndex: 0,
    steps: [],
    next: false,
    previous: false,
    first: null,
    last: null,
  })

  const view = ref('start')

  return {
    formSteps,
    view,

  }
})
if (import.meta.hot) { import.meta.hot.accept(acceptHMRUpdate(useStepStore, import.meta.hot)) }
