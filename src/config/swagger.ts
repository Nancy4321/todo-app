import swaggerJsdoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 3000;

export const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo List API',
      version: '1.0.0',
      description: 'A simple RESTful API for managing todo items',
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
              description: 'The title of the todo',
            },
            description: {
              type: 'string',
              description: 'The description of the todo',
            },
            status: {
              type: 'string',
              description: 'The status of the todo (e.g., pending, completed)',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The timestamp when the todo was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The timestamp when the todo was last updated',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};