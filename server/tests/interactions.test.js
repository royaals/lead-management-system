import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import interactionRoutes from '../routes/interactionRoutes.js';
import { mockPrisma } from './setup.js';

const app = express();
app.use(express.json());
app.use('/api/interactions', interactionRoutes);

const mockInteraction = {
  id: 1,
  lead_id: 1,
  interaction_date: new Date().toISOString(),
  interaction_type: "CALL",
  notes: "Test note",
  follow_up_required: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

describe('Interaction Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPrisma.interaction.findMany.mockResolvedValue([mockInteraction]);
  });

  describe('GET /api/interactions/pending', () => {
    it('should fetch pending interactions', async () => {
      const response = await request(app).get('/api/interactions/pending');
      
      expect(response.status).toBe(200);
      expect(mockPrisma.interaction.findMany).toHaveBeenCalled();
      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: mockInteraction.id,
          lead_id: mockInteraction.lead_id,
          interaction_type: mockInteraction.interaction_type,
          notes: mockInteraction.notes,
          follow_up_required: mockInteraction.follow_up_required
        })
      ]));
    });
  });
});