// routes/contactRoutes.js
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all contacts for a lead
router.get('/lead/:leadId', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      where: {
        lead_id: parseInt(req.params.leadId),
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Add a new contact
router.post('/', async (req, res) => {
  try {
    const { lead_id, name, role, phone_number, email } = req.body;

    // Validate required fields
    if (!lead_id || !name) {
      return res.status(400).json({ 
        error: 'Lead ID and name are required' 
      });
    }

    const newContact = await prisma.contact.create({
      data: {
        lead_id: parseInt(lead_id),
        name,
        role,
        phone_number,
        email,
      },
    });

    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ 
      error: 'Failed to create contact',
      details: error.message 
    });
  }
});

export default router;