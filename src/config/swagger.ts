import swaggerJsdoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 3000;

export const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo List API',
      version: '1.0.0',
      description: 'A simple RESTful API for managing todo lists',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Todo: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated ID of the todo',
            },
            title: {
              type: 'string',
              description: 'The title of the todo (required)',
            },
            description: {
              type: 'string',
              description: 'The description of the todo (optional)',
            },
            status: {
              type: 'string',
              description: 'The status of the todo (i.e., pending, completed)',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The timestamp when the todo was created (auto-generated)',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The timestamp when the todo was last updated (auto-generated)',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};