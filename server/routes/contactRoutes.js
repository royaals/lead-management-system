// routes/contactRoutes.js


/**
 * @swagger
 * /api/contacts/lead/{leadId}:
 *   get:
 *     tags: [Contacts]
 *     summary: Get contacts for a lead
 *     parameters:
 *       - in: path
 *         name: leadId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lead ID
 *     responses:
 *       200:
 *         description: List of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 * 
 * /api/contacts:
 *   post:
 *     tags: [Contacts]
 *     summary: Create new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
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