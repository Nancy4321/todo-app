import express from 'express';
import todoRoutes from './routes/todoRoutes';
import { errorHandler } from './middleware/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { options } from './config/swagger';

const app = express();
const swaggerSpec = swaggerJsdoc(options);
// Middleware
app.use(express.json());

// Routes
app.use('/api', todoRoutes);

// Error handling middleware
app.use(errorHandler);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


export default app;