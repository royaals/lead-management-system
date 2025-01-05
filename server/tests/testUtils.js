// tests/testUtils.js
const mockLead = {
    id: 1,
    restaurant_name: "Test Restaurant",
    address: "123 Test St",
    contact_number: "1234567890",
    status: "NEW",
    assigned_kam: "John Doe",
    created_at: new Date(),
    updated_at: new Date()
  };
  
  const mockContact = {
    id: 1,
    lead_id: 1,
    name: "John Contact",
    role: "Manager",
    phone_number: "1234567890",
    email: "john@test.com",
    created_at: new Date(),
    updated_at: new Date()
  };
  
  const mockInteraction = {
    id: 1,
    lead_id: 1,
    interaction_date: new Date(),
    interaction_type: "CALL",
    notes: "Test note",
    follow_up_required: false,
    created_at: new Date(),
    updated_at: new Date()
  };
  
  module.exports = {
    mockLead,
    mockContact,
    mockInteraction
  };