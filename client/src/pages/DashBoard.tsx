//@ts-nocheck

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [pendingCalls, setPendingCalls] = useState([]);
  const [recentInteractions, setRecentInteractions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchResultsMessage, setSearchResultsMessage] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoadingMessage('Loading dashboard data...');
      const [leadsData, pendingCallsData, recentInteractionsData] = await Promise.all([
        fetch('http://localhost:3000/api/leads').then(res => res.json()),
        fetch('http://localhost:3000/api/interactions/pending').then(res => res.json()).catch(() => []),
        fetch('http://localhost:3000/api/interactions/recent').then(res => res.json()).catch(() => [])
      ]);
      setLeads(leadsData);
      setPendingCalls(pendingCallsData);
      setRecentInteractions(recentInteractionsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setErrorMessage('Failed to load dashboard data. Please refresh the page.');
    } finally {
      setLoadingMessage('');
    }
  };

  const performSearch = async (term) => {
    try {
      setLoadingMessage('Searching...');
      const response = await fetch(`http://localhost:3000/api/leads/search?query=${encodeURIComponent(term.trim())}`);
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }
      const results = await response.json();
      setLeads(results);
      setSearchResultsMessage(`Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${term}"`);
    } catch (error) {
      console.error('Search error:', error);
      setErrorMessage('Failed to perform search. Please try again.');
    } finally {
      setLoadingMessage('');
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      performSearch(e.target.value);
    }
  };

  const handleSearchButtonClick = () => {
    performSearch(searchTerm);
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch(searchTerm);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'New': 'info',
      'Active': 'success',
      'Inactive': 'secondary'
    };
    return colors[status] || 'primary';
  };

  const getInteractionTypeColor = (type) => {
    const colors = {
      'Call': 'primary',
      'Visit': 'success',
      'Order': 'info'
    };
    return colors[type] || 'secondary';
  };

  return (
    <div className="container mt-4">
      <Header />

      {loadingMessage && <div className="alert alert-info">{loadingMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {searchResultsMessage && <div className="alert alert-info">{searchResultsMessage}</div>}

      <div className="row mb-4">
        <div className="col">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchInputKeyPress}
            />
            <button className="btn btn-primary" onClick={handleSearchButtonClick}>Search</button>
          </div>
        </div>
      </div>

      <div className="row mb-4" id="dashboardStats">
        <div className="col-md-3">
          <div className="card bg-primary text-white mb-3">
            <div className="card-body">
              <h6 className="card-title">Total Leads</h6>
              <h2 className="card-text">{leads.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white mb-3">
            <div className="card-body">
              <h6 className="card-title">Active Leads</h6>
              <h2 className="card-text">{leads.filter(lead => lead.status === 'Active').length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white mb-3">
            <div className="card-body">
              <h6 className="card-title">New Leads</h6>
              <h2 className="card-text">{leads.filter(lead => lead.status === 'New').length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white mb-3">
            <div className="card-body">
              <h6 className="card-title">Inactive Leads</h6>
              <h2 className="card-text">{leads.filter(lead => lead.status === 'Inactive').length}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <div id="leadsContainer">
            {leads.length === 0 ? (
              <div className="alert alert-info">No leads found.</div>
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
                          <strong>Status:</strong>
                          <span className={`badge bg-${getStatusColor(lead.status)}`}>{lead.status}</span><br />
                          <strong>KAM:</strong> {lead.assigned_kam}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Today's Pending Calls</h5>
            </div>
            <div className="card-body">
              <div id="pendingCallsList">
                {pendingCalls.length === 0 ? (
                  <p className="text-muted">No pending calls for today.</p>
                ) : (
                  pendingCalls.map(call => (
                    <div className="card mb-2" key={call.id}>
                      <div className="card-body">
                        <h6 className="mb-1">{call.restaurant_name}</h6>
                        <p className="mb-0 text-muted">
                          Scheduled: {new Date(call.interaction_date).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recent Interactions</h5>
            </div>
            <div className="card-body">
              <div id="recentInteractionsList">
                {recentInteractions.length === 0 ? (
                  <p className="text-muted">No recent interactions.</p>
                ) : (
                  recentInteractions.map(interaction => (
                    <div className="card mb-2" key={interaction.id}>
                      <div className="card-body">
                        <h6 className="mb-1">{interaction.restaurant_name}</h6>
                        <p className="mb-1">
                          <span className={`badge bg-${getInteractionTypeColor(interaction.interaction_type)}`}>
                            {interaction.interaction_type}
                          </span>
                          {interaction.notes}
                        </p>
                        <small className="text-muted">
                          {new Date(interaction.created_at).toLocaleString()}
                        </small>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
