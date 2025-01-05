export interface Lead {
    id: string
    restaurant_name: string
    address: string
    contact_number: string
    status: 'New' | 'Active' | 'Inactive'
    assigned_kam: string
  }
  
  export interface PendingCall {
    id: string
    restaurant_name: string
    interaction_date: string
  }
  
  export interface Interaction {
    id: string
    restaurant_name: string
    interaction_type: 'Call' | 'Visit' | 'Order'
    notes: string
    created_at: string
  }
  
  