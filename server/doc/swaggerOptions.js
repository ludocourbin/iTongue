const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "iTongue API",
    description: "Serves datas for iTongue client",
    version: "1.0.0",
  },
  host: `localhost:3000`, // Host (optional)
  basePath: "/", // Pass to v1 in production
  produces: ["application/json"],
  consumes: ["application/json"],
  schemes: ["http"],
  securityDefinitions: {},
};

const options = {
  swaggerDefinition,
  apis: ["./app/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
