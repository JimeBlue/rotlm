// Type definitions for our mock data

export interface Contact {
  id?: string
  first_name: string
  last_name: string
  email: string
  company_name?: string
  sex?: string
}

export interface CompanionGuest {
  id?: string
  contact: Contact
}

export interface Guest {
  id: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'listed'
  contact: Contact
  booking: {
    extended_fields: Record<string, any>
    confirmed_at?: string
  }
  extended_fields: Record<string, any>
  companion_guests: CompanionGuest[]
  files: any[]
  reservations: any[]
}

export interface Event {
  id: string
  name: string
  description?: string
  start_date: string
  end_date: string
  location?: string
  status: 'active' | 'draft' | 'completed'
  settings: {
    allow_companions: boolean
    max_companions: number
    registration_open: boolean
  }
}

export interface ApiResponse<T> {
  data: T
  message?: string
  errors?: Record<string, string[]>
}