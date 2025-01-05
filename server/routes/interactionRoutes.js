


/**
 * @swagger
 * /api/interactions/pending:
 *   get:
 *     tags: [Interactions]
 *     summary: Get pending interactions
 *     parameters:
 *       - in: query
 *         name: leads
 *         schema:
 *           type: string
 *         description: Comma-separated list of lead IDs
 *     responses:
 *       200:
 *         description: List of pending interactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Interaction'
 * 
 * /api/interactions/recent:
 *   get:
 *     tags: [Interactions]
 *     summary: Get recent interactions
 *     responses:
 *       200:
 *         description: List of recent interactions
 * 
 * /api/interactions:
 *   post:
 *     tags: [Interactions]
 *     summary: Create new interaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Interaction'
 *     responses:
 *       201:
 *         description: Interaction created successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();


router.get('/pending', async (req, res) => {
    try {
        const { leads } = req.query;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const interactions = await prisma.interaction.findMany({
            where: {
                interaction_type: 'CALL',
                interaction_date: {
                    equals: today
                },
                ...(leads && {
                    lead_id: {
                        in: leads.split(',').map(id => parseInt(id))
                    }
                })
            },
            include: {
                lead: {
                    select: {
                        restaurant_name: true
                    }
                }
            },
            orderBy: {
                interaction_date: 'asc'
            }
        });
        
        res.json(interactions);
    } catch (error) {
        console.error('Error fetching pending calls:', error);
        res.status(500).json({ error: 'Failed to fetch pending calls' });
    }
});


router.get('/recent', async (req, res) => {
    try {
        const { leads } = req.query;
        
        const interactions = await prisma.interaction.findMany({
            where: leads ? {
                lead_id: {
                    in: leads.split(',').map(id => parseInt(id))
                }
            } : undefined,
            include: {
                lead: {
                    select: {
                        restaurant_name: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            },
            take: 10
        });
        
        res.json(interactions);
    } catch (error) {
        console.error('Error fetching recent interactions:', error);
        res.status(500).json({ error: 'Failed to fetch recent interactions' });
    }
});


router.get('/lead/:leadId', async (req, res) => {
    try {
        const leadId = parseInt(req.params.leadId);
        
        const interactions = await prisma.interaction.findMany({
            where: {
                lead_id: leadId
            },
            orderBy: {
                created_at: 'desc'
            },
            include: {
                lead: {
                    select: {
                        restaurant_name: true
                    }
                }
            }
        });
        
        res.json(interactions);
    } catch (error) {
        console.error('Error fetching lead interactions:', error);
        res.status(500).json({ error: 'Failed to fetch lead interactions' });
    }
});


router.post('/', async (req, res) => {
    try {
        const { lead_id, interaction_date, interaction_type, notes, follow_up_required } = req.body;

        
        if (!lead_id || !interaction_date || !interaction_type) {
            return res.status(400).json({ 
                error: 'lead_id, interaction_date, and interaction_type are required' 
            });
        }

      
        const validInteractionTypes = ['CALL', 'VISIT', 'ORDER'];
        const normalizedType = interaction_type.toUpperCase();
        if (!validInteractionTypes.includes(normalizedType)) {
            return res.status(400).json({ 
                error: `Invalid interaction_type. Must be one of: ${validInteractionTypes.join(', ')}` 
            });
        }

        const newInteraction = await prisma.interaction.create({
            data: {
                lead_id: parseInt(lead_id),
                interaction_date: new Date(interaction_date),
                interaction_type: normalizedType,
                notes: notes || null,
                follow_up_required: follow_up_required || false
            },
            include: {
                lead: {
                    select: {
                        restaurant_name: true
                    }
                }
            }
        });

        res.status(201).json(newInteraction);
    } catch (error) {
        console.error('Error creating interaction:', error);
        res.status(500).json({ 
            error: 'Failed to create interaction',
            details: error.message 
        });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { interaction_date, interaction_type, notes, follow_up_required } = req.body;

      
        if (interaction_type) {
            const validInteractionTypes = ['CALL', 'VISIT', 'ORDER'];
            const normalizedType = interaction_type.toUpperCase();
            if (!validInteractionTypes.includes(normalizedType)) {
                return res.status(400).json({ 
                    error: `Invalid interaction_type. Must be one of: ${validInteractionTypes.join(', ')}` 
                });
            }
        }

        const updatedInteraction = await prisma.interaction.update({
            where: { id },
            data: {
                interaction_date: interaction_date ? new Date(interaction_date) : undefined,
                interaction_type: interaction_type ? interaction_type.toUpperCase() : undefined,
                notes: notes !== undefined ? notes : undefined,
                follow_up_required: follow_up_required !== undefined ? follow_up_required : undefined
            },
            include: {
                lead: {
                    select: {
                        restaurant_name: true
                    }
                }
            }
        });

        res.json(updatedInteraction);
    } catch (error) {
        console.error('Error updating interaction:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Interaction not found' });
        }
        res.status(500).json({ error: 'Failed to update interaction' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        await prisma.interaction.delete({
            where: { id }
        });

        res.json({ message: 'Interaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting interaction:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Interaction not found' });
        }
        res.status(500).json({ error: 'Failed to delete interaction' });
    }
});

export default router;