//@ts-nocheck

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../components/Header';

const CreateLead = () => {
  const [formData, setFormData] = useState({
    restaurant_name: '',
    address: '',
    contact_number: '',
    status: 'New',
    assigned_kam: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Lead added successfully!');
        setFormData({
          restaurant_name: '',
          address: '',
          contact_number: '',
          status: 'New',
          assigned_kam: ''
        });
      } else {
        throw new Error('Failed to add lead');
      }
    } catch (error) {
      alert('Error adding lead: ' + error.message);
    }
  };

  return (
    <div>
      <Header />

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header">
                <h4>Add New Lead</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Restaurant Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="restaurant_name"
                      value={formData.restaurant_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contact Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="contact_number"
                      value={formData.contact_number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="New">New</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Assigned KAM</label>
                    <input
                      type="text"
                      className="form-control"
                      name="assigned_kam"
                      value={formData.assigned_kam}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLead;