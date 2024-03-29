import swaggerJSDoc from 'swagger-jsdoc';
import { bookSchema, customerSchema, tagSchema, orderSchema } from './swaggerDefinitions';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Bookstore API with Swagger',
    version: '1.0.0',
    description: 'This is a bookstore API application made with Express and documented with Swagger',
  },
  components: {
    schemas: {
        ...bookSchema,
        ...customerSchema,
        ...tagSchema,
        ...orderSchema
      }
    },
  servers: [
    {
      url: 'https://bookstorebackend-ii1w.onrender.com/',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
