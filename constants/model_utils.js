import { contactModel } from './contact_model.js'
import { guestModel } from './guest_model.js'

/**
 * Creates a guest model structure with contact data merged in
 * @param {object} contactData - Contact data to merge
 * @returns {object} Guest model with contact data
 */
export function createGuestFromContact(contactData = {}) {
  const guest = structuredClone(guestModel)
  guest.contact = { ...guest.contact, ...contactData }
  return guest
}

/**
 * Extracts contact data from guest model
 * @param {object} guestData - Guest data
 * @returns {object} Contact data
 */
export function extractContactFromGuest(guestData = {}) {
  return { ...contactModel, ...guestData.contact }
}

/**
 * Validates if an object matches the contact model structure
 * @param {object} data - Data to validate
 * @returns {boolean} True if data has contact model fields
 */
export function isContactModel(data = {}) {
  const contactFields = Object.keys(contactModel)
  return contactFields.every(field => field in data)
}

/**
 * Validates if an object matches the guest model structure
 * @param {object} data - Data to validate
 * @returns {boolean} True if data has guest model structure
 */
export function isGuestModel(data = {}) {
  return 'contact' in data && 'status' in data && 'extended_fields' in data
}