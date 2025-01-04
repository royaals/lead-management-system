//@ts-nocheck
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Tab, Tabs, Badge } from 'react-bootstrap';

import Header from '../components/Header';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showLeadDetailsModal, setShowLeadDetailsModal] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showAddInteractionModal, setShowAddInteractionModal] = useState(false);
  const [currentLeadId, setCurrentLeadId] = useState(null);
  const [currentLeadDetails, setCurrentLeadDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [leadFormData, setLeadFormData] = useState({
    restaurant_name: '',
    address: '',
    contact_number: '',
    status: 'New',
    assigned_kam: ''
  });

  const [contactFormData, setContactFormData] = useState({
    lead_id: '',
    name: '',
    role: 'Owner',
    phone_number: '',
    email: ''
  });

  const [interactionFormData, setInteractionFormData] = useState({
    lead_id: '',
    interaction_date: '',
    interaction_type: 'Call',
    notes: '',
    follow_up_required: false
  });

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/leads');
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }
      const data = await response.json();
      setLeads(data);
      setError(null);
    } catch (error) {
      console.error('Error loading leads:', error);
      setError('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const loadLeadDetails = async (leadId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/leads/${leadId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch lead details');
      }
      const data = await response.json();
      setCurrentLeadDetails(data);
    } catch (error) {
      console.error('Error loading lead details:', error);
      alert('Error loading lead details: ' + error.message);
    }
  };

  const handleLeadFormChange = (e) => {
    setLeadFormData({
      ...leadFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactFormChange = (e) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleInteractionFormChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setInteractionFormData({
      ...interactionFormData,
      [e.target.name]: value
    });
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add lead');
      }

      alert('Lead added successfully!');
      setLeadFormData({
        restaurant_name: '',
        address: '',
        contact_number: '',
        status: 'New',
        assigned_kam: ''
      });
      setShowAddLeadModal(false);
      loadLeads();
    } catch (error) {
      alert('Error adding lead: ' + error.message);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!contactFormData.lead_id) {
        throw new Error('No lead selected');
      }

      const response = await fetch('http://localhost:3000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add contact');
      }

      alert('Contact added successfully!');
      setContactFormData({
        lead_id: '',
        name: '',
        role: 'Owner',
        phone_number: '',
        email: ''
      });
      setShowAddContactModal(false);
      loadLeadDetails(currentLeadId);
    } catch (error) {
      alert('Error adding contact: ' + error.message);
    }
  };

  const handleInteractionSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!interactionFormData.lead_id) {
        throw new Error('No lead selected');
      }

      const response = await fetch('http://localhost:3000/api/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interactionFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to log interaction');
      }

      alert('Interaction logged successfully!');
      setInteractionFormData({
        lead_id: '',
        interaction_date: '',
        interaction_type: 'Call',
        notes: '',
        follow_up_required: false
      });
      setShowAddInteractionModal(false);
      loadLeadDetails(currentLeadId);
    } catch (error) {
      alert('Error logging interaction: ' + error.message);
    }
  };

  const openAddContactModal = (leadId) => {
    setContactFormData({
      ...contactFormData,
      lead_id: leadId
    });
    setShowAddContactModal(true);
  };

  const openAddInteractionModal = (leadId) => {
    setInteractionFormData({
      ...interactionFormData,
      lead_id: leadId,
      interaction_date: new Date().toISOString().split('T')[0]
    });
    setShowAddInteractionModal(true);
  };

  const viewLeadDetails = async (leadId) => {
    setCurrentLeadId(leadId);
    await loadLeadDetails(leadId);
    setShowLeadDetailsModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'info';
      case 'Active': return 'success';
      case 'Inactive': return 'secondary';
      default: return 'primary';
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div>
      {/* Navigation Bar */}
      <Header />
      {/* Main Content */}
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Leads</h5>
                <Button variant="primary" onClick={() => setShowAddLeadModal(true)}>
                  Add New Lead
                </Button>
              </div>
              <div className="card-body">
                {leads.length === 0 ? (
                  <p className="text-muted">No leads found.</p>
                ) : (
                  leads.map(lead => (
                    <div className="card mb-3" key={lead.id}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="card-title">{lead.restaurant_name}</h5>
                            <p className="card-text">
                              <strong>Address:</strong> {lead.address}<br />
                              <strong>Contact:</strong> {lead.contact_number}<br />
                              <strong>Status:</strong> <Badge bg={getStatusColor(lead.status)}>{lead.status}</Badge><br />
                              <strong>KAM:</strong> {lead.assigned_kam}
                            </p>
                          </div>
                          <Button variant="primary" size="sm" onClick={() => viewLeadDetails(lead.id)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {/* Add Lead Modal */}
        <Modal show={showAddLeadModal} onHide={() => setShowAddLeadModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Lead</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleLeadSubmit}>
              {/* Lead form fields */}
              <Form.Group className="mb-3">
                <Form.Label>Restaurant Name</Form.Label>
                <Form.Control
                  type="text"
                  name="restaurant_name"
                  value={leadFormData.restaurant_name}
                  onChange={handleLeadFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  value={leadFormData.address}
                  onChange={handleLeadFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="contact_number"
                  value={leadFormData.contact_number}
                  onChange={handleLeadFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={leadFormData.status}
                  onChange={handleLeadFormChange}
                >
                  <option value="New">New</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Assigned KAM</Form.Label>
                <Form.Control
                  type="text"
                  name="assigned_kam"
                  value={leadFormData.assigned_kam}
                  onChange={handleLeadFormChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Lead Details Modal */}
        <Modal show={showLeadDetailsModal} onHide={() => setShowLeadDetailsModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {currentLeadDetails?.restaurant_name || 'Lead Details'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey="details" id="leadTabs">
              <Tab eventKey="details" title="Details">
                {currentLeadDetails && (
                  <div className="mt-3">
                    <p><strong>Address:</strong> {currentLeadDetails.address}</p>
                    <p><strong>Contact:</strong> {currentLeadDetails.contact_number}</p>
                    <p><strong>Status:</strong> <Badge bg={getStatusColor(currentLeadDetails.status)}>{currentLeadDetails.status}</Badge></p>
                    <p><strong>KAM:</strong> {currentLeadDetails.assigned_kam}</p>
                  </div>
                )}
              </Tab>
              <Tab eventKey="contacts" title="Contacts">
                <Button 
                  variant="primary" 
                  className="mb-3 mt-3" 
                  onClick={() => openAddContactModal(currentLeadId)}
                >
                  Add Contact
                </Button>
                <div>
                  {currentLeadDetails?.contacts?.map(contact => (
                    <div key={contact.id} className="card mb-2">
                      <div className="card-body">
                        <h6>{contact.name}</h6>
                        <p className="mb-1"><strong>Role:</strong> {contact.role}</p>
                        <p className="mb-1"><strong>Phone:</strong> {contact.phone_number}</p>
                        <p className="mb-1"><strong>Email:</strong> {contact.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab>
              <Tab eventKey="interactions" title="Interactions">
                <Button 
                  variant="primary" 
                  className="mb-3 mt-3" 
                  onClick={() => openAddInteractionModal(currentLeadId)}
                >
                  Add Interaction
                </Button>
                <div>
                  {currentLeadDetails?.interactions?.map(interaction => (
                    <div key={interaction.id} className="card mb-2">
                      <div className="card-body">
                        <h6>{new Date(interaction.interaction_date).toLocaleDateString()} - {interaction.interaction_type}</h6>
                        <p className="mb-1">{interaction.notes}</p>
                        {interaction.follow_up_required && (
                          <Badge bg="warning" text="dark">Follow-up Required</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>

        {/* Add Contact Modal */}
        <Modal show={showAddContactModal} onHide={() => setShowAddContactModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleContactSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={contactFormData.name}
                  onChange={handleContactFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={contactFormData.role}
                  onChange={handleContactFormChange}
                >
                  <option value="Owner">Owner</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone_number"
                  value={contactFormData.phone_number}
                  onChange={handleContactFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={contactFormData.email}
                  onChange={handleContactFormChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Add Interaction Modal */}
        <Modal show={showAddInteractionModal} onHide={() => setShowAddInteractionModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Interaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleInteractionSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="interaction_date"
                  value={interactionFormData.interaction_date}
                  onChange={handleInteractionFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  name="interaction_type"
                  value={interactionFormData.interaction_type}
                  onChange={handleInteractionFormChange}
                >
                  <option value="Call">Call</option>
                  <option value="Visit">Visit</option>
                  <option value="Order">Order</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  name="notes"
                  value={interactionFormData.notes}
                  onChange={handleInteractionFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Follow-up Required"
                  name="follow_up_required"
                  checked={interactionFormData.follow_up_required}
                  onChange={handleInteractionFormChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Leads;