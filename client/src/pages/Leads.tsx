//@ts-nocheck

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Tab, Tabs } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showLeadDetailsModal, setShowLeadDetailsModal] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showAddInteractionModal, setShowAddInteractionModal] = useState(false);
  const [currentLeadId, setCurrentLeadId] = useState(null);
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
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Error loading leads:', error);
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
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadFormData),
      });

      if (response.ok) {
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
      } else {
        throw new Error('Failed to add lead');
      }
    } catch (error) {
      alert('Error adding lead: ' + error.message);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactFormData),
      });

      if (response.ok) {
        alert('Contact added successfully!');
        setContactFormData({
          lead_id: '',
          name: '',
          role: 'Owner',
          phone_number: '',
          email: ''
        });
        setShowAddContactModal(false);
        // Reload contacts for the current lead
      } else {
        throw new Error('Failed to add contact');
      }
    } catch (error) {
      alert('Error adding contact: ' + error.message);
    }
  };

  const handleInteractionSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interactionFormData),
      });

      if (response.ok) {
        alert('Interaction logged successfully!');
        setInteractionFormData({
          lead_id: '',
          interaction_date: '',
          interaction_type: 'Call',
          notes: '',
          follow_up_required: false
        });
        setShowAddInteractionModal(false);
        // Reload interactions for the current lead
      } else {
        throw new Error('Failed to log interaction');
      }
    } catch (error) {
      alert('Error logging interaction: ' + error.message);
    }
  };

  const viewLeadDetails = async (leadId) => {
    setCurrentLeadId(leadId);
    setShowLeadDetailsModal(true);
    // Fetch and display lead details, contacts, and interactions
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'info';
      case 'Active': return 'success';
      case 'Inactive': return 'secondary';
      default: return 'primary';
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Lead Management System</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard" activeClassName="active">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leads" activeClassName="active">
                  Leads
                </NavLink>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
          </div>
        </div>
      </nav>

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
                <div id="leadsContainer">
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
                                <strong>Status:</strong> <span className={`badge bg-${getStatusColor(lead.status)}`}>{lead.status}</span><br />
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
        </div>

        {/* Add Lead Modal */}
        <Modal show={showAddLeadModal} onHide={() => setShowAddLeadModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Lead</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleLeadSubmit}>
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
            <Modal.Title>Lead Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey="details" id="leadTabs">
              <Tab eventKey="details" title="Details">
                {/* Lead details will be populated here */}
              </Tab>
              <Tab eventKey="contacts" title="Contacts">
                <Button variant="primary" className="mb-3" onClick={() => setShowAddContactModal(true)}>
                  Add Contact
                </Button>
                <div id="contactsList">
                  {/* Contacts will be populated here */}
                </div>
              </Tab>
              <Tab eventKey="interactions" title="Interactions">
                <Button variant="primary" className="mb-3" onClick={() => setShowAddInteractionModal(true)}>
                  Add Interaction
                </Button>
                <div id="interactionsList">
                  {/* Interactions will be populated here */}
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
              <Form.Group className="mb-3" controlId="formFollowUp">
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
