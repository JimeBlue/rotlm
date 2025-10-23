// Initialize storage on server startup
import { initializeStorage } from '../utils/storage'

export default defineNitroPlugin(async (nitroApp) => {
  console.log('Initializing mock data storage...')
  await initializeStorage()
  console.log('Mock data storage initialized successfully')
})