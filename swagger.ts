import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import basicAuth from 'express-basic-auth';

const spec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'setup21portfolio API', version: '1.0.0' },
    servers: [{ url: process.env.PUBLIC_BASE_URL || '/' }],
    components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } } }
  },
  apis: ['./main.ts', './src/**/*.ts']
});

export default (app: Express): void => {
  const user = process.env.SWAGGER_USER;
  const password = process.env.SWAGGER_PASSWORD;
  if (user && password) {
    app.use('/docs', basicAuth({ users: { [user]: password }, challenge: true }), swaggerUi.serve, swaggerUi.setup(spec));
  } else {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
  }
};

