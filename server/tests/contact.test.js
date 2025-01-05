import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import contactRoutes from '../routes/contactRoutes.js';
import { mockPrisma } from './setup.js';

const app = express();
app.use(express.json());
app.use('/api/contacts', contactRoutes);

const mockContact = {
  id: 1,
  lead_id: 1,
  name: "Test Contact",
  role: "Manager",
  phone_number: "1234567890",
  email: "test@test.com",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

describe('Contact Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPrisma.contact.findMany.mockResolvedValue([mockContact]);
  });

  describe('GET /api/contacts/lead/:leadId', () => {
    it('should fetch contacts for a lead', async () => {
      const response = await request(app).get('/api/contacts/lead/1');
      
      expect(response.status).toBe(200);
      expect(mockPrisma.contact.findMany).toHaveBeenCalled();
      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: mockContact.id,
          lead_id: mockContact.lead_id,
          name: mockContact.name,
          role: mockContact.role,
          phone_number: mockContact.phone_number,
          email: mockContact.email
        })
      ]));
    });
  });
});