import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import leadRoutes from '../routes/leadRoutes.js';
import { mockPrisma } from './setup.js';

const app = express();
app.use(express.json());
app.use('/api/leads', leadRoutes);

const mockLead = {
  id: 1,
  restaurant_name: "Test Restaurant",
  address: "123 Test St",
  contact_number: "1234567890",
  status: "NEW",
  assigned_kam: "John Doe",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

describe('Lead Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPrisma.lead.findMany.mockResolvedValue([mockLead]);
  });

  describe('GET /api/leads', () => {
    it('should fetch all leads', async () => {
      const response = await request(app).get('/api/leads');
      
      expect(response.status).toBe(200);
      expect(mockPrisma.lead.findMany).toHaveBeenCalled();
      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: mockLead.id,
          restaurant_name: mockLead.restaurant_name,
          address: mockLead.address,
          contact_number: mockLead.contact_number,
          status: mockLead.status,
          assigned_kam: mockLead.assigned_kam
        })
      ]));
    });
  });
});