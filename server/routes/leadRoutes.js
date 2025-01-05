/**
 * @swagger
 * /api/leads:
 *   get:
 *     tags: [Leads]
 *     summary: Get all leads
 *     description: Retrieve a list of all leads with optional search functionality
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering leads
 *     responses:
 *       200:
 *         description: List of leads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lead'
 *       500:
 *         $ref: '#/components/responses/ValidationError'
 *
 *   post:
 *     tags: [Leads]
 *     summary: Create a new lead
 *     description: Add a new lead to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lead'
 *     responses:
 *       201:
 *         description: Lead created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lead'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *
 * /api/leads/{id}:
 *   get:
 *     tags: [Leads]
 *     summary: Get lead by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lead ID
 *     responses:
 *       200:
 *         description: Lead details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lead'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 *   put:
 *     tags: [Leads]
 *     summary: Update lead
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lead ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lead'
 *     responses:
 *       200:
 *         description: Lead updated successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     tags: [Leads]
 *     summary: Delete lead
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lead ID
 *     responses:
 *       200:
 *         description: Lead deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

const validateStatus = (status) => {
  const VALID_STATUSES = ["NEW", "ACTIVE", "INACTIVE"];
  if (!status) return "NEW";
  const normalizedStatus = status.toUpperCase();
  if (!VALID_STATUSES.includes(normalizedStatus)) {
    throw new Error(
      `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`
    );
  }
  return normalizedStatus;
};

router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    const leads = await prisma.lead.findMany({
      where: search
        ? {
            OR: [
              { restaurant_name: { contains: search, mode: "insensitive" } },
              { address: { contains: search, mode: "insensitive" } },
              { contact_number: { contains: search, mode: "insensitive" } },
              { assigned_kam: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: {
        created_at: "desc",
      },
      include: {
        _count: {
          select: {
            contacts: true,
            interactions: true,
          },
        },
      },
    });

    res.json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim().length === 0) {
      return res.json([]);
    }

    const leads = await prisma.lead.findMany({
      where: {
        OR: [
          { restaurant_name: { contains: query, mode: "insensitive" } },
          { address: { contains: query, mode: "insensitive" } },
          { contact_number: { contains: query, mode: "insensitive" } },
          { assigned_kam: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        _count: {
          select: {
            contacts: true,
            interactions: true,
          },
        },
        interactions: {
          orderBy: {
            created_at: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res.json(leads);
  } catch (error) {
    console.error("Error searching leads:", error);
    res.status(500).json({ error: "Failed to search leads" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const leadId = parseInt(req.params.id);

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        contacts: true,
        interactions: {
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    console.error("Error fetching lead details:", error);
    res.status(500).json({ error: "Failed to fetch lead details" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { restaurant_name, address, contact_number, status, assigned_kam } =
      req.body;

    if (!restaurant_name) {
      return res.status(400).json({ error: "Restaurant name is required" });
    }

    let validatedStatus;
    try {
      validatedStatus = validateStatus(status);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    const newLead = await prisma.lead.create({
      data: {
        restaurant_name,
        address: address || null,
        contact_number: contact_number || null,
        status: validatedStatus,
        assigned_kam: assigned_kam || null,
      },
    });

    res.status(201).json(newLead);
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({
      error: "Failed to create lead",
      details: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const leadId = parseInt(req.params.id);
    const { restaurant_name, address, contact_number, status, assigned_kam } =
      req.body;

    if (!restaurant_name) {
      return res.status(400).json({ error: "Restaurant name is required" });
    }

    let validatedStatus;
    try {
      validatedStatus = validateStatus(status);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: {
        restaurant_name,
        address: address || null,
        contact_number: contact_number || null,
        status: validatedStatus,
        assigned_kam: assigned_kam || null,
      },
    });

    res.json(updatedLead);
  } catch (error) {
    console.error("Error updating lead:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.status(500).json({ error: "Failed to update lead" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const leadId = parseInt(req.params.id);

    await prisma.lead.delete({
      where: { id: leadId },
    });

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.status(500).json({ error: "Failed to delete lead" });
  }
});

export default router;
