// In-memory storage for mock data
import type { Guest, Event, Contact } from '../types'

// Use Nitro's storage with memory driver
const guestStorage = useStorage('memory:guests')
const eventStorage = useStorage('memory:events') 
const contactStorage = useStorage('memory:contacts')

// Sample data initialization
const sampleEvent = {
  id: 'portfolio-event-2024',
  name: 'Tech Conference 2024',
  description: 'Annual technology conference featuring industry leaders',
  start_date: '2024-12-15',
  end_date: '2024-12-16',
  location: 'San Francisco Convention Center',
  status: 'active',
  settings: {
    allow_companions: true,
    max_companions: 3,
    registration_open: true
  }
}

const sampleGuests = [
  {
    id: 'guest-1',
    status: 'confirmed',
    contact: {
      first_name: 'John',
      last_name: 'Smith', 
      email: 'john.smith@techcorp.com',
      company_name: 'TechCorp Inc.',
      sex: 'male'
    },
    booking: {
      extended_fields: {},
      confirmed_at: '2024-10-01T10:00:00Z'
    },
    extended_fields: {},
    companion_guests: [
      {
        id: 'comp-1',
        contact: {
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@example.com',
          sex: 'female'
        }
      }
    ],
    files: [],
    reservations: []
  },
  {
    id: 'guest-2', 
    status: 'pending',
    contact: {
      first_name: 'Sarah',
      last_name: 'Johnson',
      email: 'sarah.johnson@startup.io',
      company_name: 'Startup Innovations',
      sex: 'female'
    },
    booking: {
      extended_fields: {}
    },
    extended_fields: {},
    companion_guests: [],
    files: [],
    reservations: []
  },
  {
    id: 'guest-3',
    status: 'confirmed', 
    contact: {
      first_name: 'Michael',
      last_name: 'Chen',
      email: 'michael.chen@enterprise.com',
      company_name: 'Enterprise Solutions',
      sex: 'male'
    },
    booking: {
      extended_fields: {},
      confirmed_at: '2024-09-28T14:30:00Z'
    },
    extended_fields: {},
    companion_guests: [],
    files: [],
    reservations: []
  }
]

const sampleContacts = [
  {
    id: 'contact-1',
    first_name: 'Event',
    last_name: 'Organizer',
    email: 'organizer@techconf2024.com',
    company_name: 'Tech Conference Org',
    sex: 'other'
  }
]

// Initialize storage
export async function initializeStorage() {
  // Check if already initialized
  const existingEvent = await eventStorage.getItem('portfolio-event-2024')
  if (existingEvent) return

  // Initialize with sample data
  await eventStorage.setItem('portfolio-event-2024', sampleEvent)
  
  for (const guest of sampleGuests) {
    await guestStorage.setItem(guest.id, guest)
  }
  
  for (const contact of sampleContacts) {
    await contactStorage.setItem(contact.id, contact)
  }
}

// Guest operations
export const guestStore = {
  async getAll(): Promise<Guest[]> {
    const keys = await guestStorage.getKeys()
    const guests = await Promise.all(
      keys.map(key => guestStorage.getItem(key))
    )
    return guests.filter(Boolean) as Guest[]
  },

  async getById(id: string): Promise<Guest | null> {
    return await guestStorage.getItem(id)
  },

  async create(guestData: Partial<Guest>): Promise<Guest> {
    const id = `guest-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    const guest: Guest = {
      id,
      status: 'pending',
      contact: guestData.contact || {},
      booking: guestData.booking || { extended_fields: {} },
      extended_fields: guestData.extended_fields || {},
      companion_guests: guestData.companion_guests || [],
      files: [],
      reservations: []
    }
    
    await guestStorage.setItem(id, guest)
    return guest
  },

  async update(id: string, updates: Partial<Guest>): Promise<Guest | null> {
    const existing = await guestStorage.getItem(id)
    if (!existing) return null
    
    const updated = { ...existing, ...updates }
    await guestStorage.setItem(id, updated)
    return updated
  },

  async delete(id: string): Promise<boolean> {
    await guestStorage.removeItem(id)
    return true
  }
}

// Event operations  
export const eventStore = {
  async get(): Promise<Event | null> {
    return await eventStorage.getItem('portfolio-event-2024')
  },

  async update(updates: Partial<Event>): Promise<Event | null> {
    const existing = await eventStorage.getItem('portfolio-event-2024')
    if (!existing) return null
    
    const updated = { ...existing, ...updates }
    await eventStorage.setItem('portfolio-event-2024', updated)
    return updated
  }
}

// Contact operations
export const contactStore = {
  async getAll(): Promise<Contact[]> {
    const keys = await contactStorage.getKeys()
    const contacts = await Promise.all(
      keys.map(key => contactStorage.getItem(key))
    )
    return contacts.filter(Boolean) as Contact[]
  },

  async getById(id: string): Promise<Contact | null> {
    return await contactStorage.getItem(id)
  }
}