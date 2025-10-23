import { guestModel } from '@@/constants/'
import { v4 as uuidv4 } from 'uuid'

export function useSuite() {
  const createGuest = () => {
    const guest = cloneDeep(guestModel)
    guest.id = `local-${uuidv4()}`
    guest.role = 'main'
    guest.companion_guests = []
    guest.recommended_guests = []
    return guest
  }

  const createCompanionGuest = () => {
    const companion = cloneDeep(guestModel)
    companion.id = `local-${uuidv4()}`
    companion.role = 'companion'
    return companion
  }

  const createRecommendationGuest = () => {
    const recommendation = cloneDeep(guestModel)
    recommendation.id = `local-${uuidv4()}`
    recommendation.status = 'invited'
    return recommendation
  }

  return {
    createGuest,
    createCompanionGuest,
    createRecommendationGuest,
  }
}
