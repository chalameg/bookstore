import express, { Express } from 'express';
import bookRouter from './controllers/bookController';
import tagRouter from './controllers/tagController';
import customerRouter from './controllers/customerController';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

//database
import { AppDataSource } from './data-source';
import swaggerSpec from './swagger';

const app: Express = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3001', 'https://bookstore-taupe-nine.vercel.app']
}));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Setup routes
app.use('/api/books', bookRouter);
app.use('/api/tags', tagRouter);
app.use('/api/customers', customerRouter);

// Example route to test if the server is working
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Initialize database connection then start the server
const PORT = process.env.PORT || 3000;
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.log("Error during Data Source initialization:", error));

export default app;
