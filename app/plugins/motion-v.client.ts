import { Motion, AnimatePresence } from 'motion-v'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Motion', Motion)
  nuxtApp.vueApp.component('AnimatePresence', AnimatePresence)
})
