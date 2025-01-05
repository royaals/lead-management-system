export interface Lead {
    id: string
    restaurant_name: string
    address: string
    contact_number: string
    status: 'New' | 'Active' | 'Inactive'
    assigned_kam: string
    contacts?: Contact[]
    interactions?: Interaction[]
  }
  
  export interface Contact {
    id: string
    lead_id: string
    name: string
    role: 'Owner' | 'Manager' | 'Staff'
    phone_number: string
    email: string
  }
  
  export interface Interaction {
    id: string
    lead_id: string
    interaction_date: string
    interaction_type: 'Call' | 'Visit' | 'Order'
    notes: string
    follow_up_required: boolean
  }
  
  