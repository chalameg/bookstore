import express, { Express } from 'express';
import bookRouter from './controllers/bookController';
import tagRouter from './controllers/tagController';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import cors from 'cors';

//database
import { AppDataSource } from './data-source';
import { bookSchema } from './swaggerDefinitions';

const app: Express = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3001' // Adjust this to match the origin of your frontend app
}));


app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookstore API',
      version: '1.0.0',
      description: 'A simple API for a bookstore application',
    },
    components: {
      schemas: bookSchema
    },
    // Specify server if needed, e.g., for local development
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  // Path to the API docs
  apis: ['${__dirname}/src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

console.log(swaggerSpec);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Setup routes
app.use('/api/books', bookRouter);
app.use('/api/tags', tagRouter);

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
