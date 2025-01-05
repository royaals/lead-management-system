
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lead Management System API',
      version: '1.0.0',
      description: 'API documentation for Lead Management System'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
  
    ],
    tags: [
      {
        name: 'Leads',
        description: 'Lead management endpoints'
      },
      {
        name: 'Contacts',
        description: 'Contact management endpoints'
      },
      {
        name: 'Interactions',
        description: 'Interaction management endpoints'
      }
    ],
    components: {
      schemas: {
        Lead: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier for the lead'
            },
            restaurant_name: {
              type: 'string',
              description: 'Name of the restaurant'
            },
            address: {
              type: 'string',
              description: 'Physical address of the restaurant'
            },
            contact_number: {
              type: 'string',
              description: 'Primary contact number'
            },
            status: {
              type: 'string',
              enum: ['NEW', 'ACTIVE', 'INACTIVE'],
              description: 'Current status of the lead'
            },
            assigned_kam: {
              type: 'string',
              description: 'Assigned Key Account Manager'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          },
          required: ['restaurant_name']
        },
        Contact: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier for the contact'
            },
            lead_id: {
              type: 'integer',
              description: 'Associated lead ID'
            },
            name: {
              type: 'string',
              description: 'Contact person name'
            },
            role: {
              type: 'string',
              description: 'Role in the organization'
            },
            phone_number: {
              type: 'string',
              description: 'Contact phone number'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Contact email address'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          },
          required: ['lead_id', 'name']
        },
        Interaction: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier for the interaction'
            },
            lead_id: {
              type: 'integer',
              description: 'Associated lead ID'
            },
            interaction_date: {
              type: 'string',
              format: 'date-time',
              description: 'Date of interaction'
            },
            interaction_type: {
              type: 'string',
              enum: ['CALL', 'VISIT', 'ORDER'],
              description: 'Type of interaction'
            },
            notes: {
              type: 'string',
              description: 'Additional notes about the interaction'
            },
            follow_up_required: {
              type: 'boolean',
              description: 'Whether follow-up is required'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          },
          required: ['lead_id', 'interaction_date', 'interaction_type']
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            },
            details: {
              type: 'string',
              description: 'Detailed error information'
            }
          }
        }
      },
      responses: {
        NotFound: {
          description: 'The specified resource was not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        ValidationError: {
          description: 'Invalid input parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };