const fastify = require("fastify").default();
const fastifyOAS = require("fastify-oas");

const name = "test";
const description = "test project";
const version = "1.0.0";

fastify.register(fastifyOAS, {
  routePrefix: "/api/documentation",
  addModels: true,
  hideUntagged: true,
  exposeRoute: true,
  openapi: "3.0.2",
  swagger: {
    info: {
      title: name,
      description,
      version,
    },
    tags: [{ name: "users", description: "users" }],
    consumes: ["application/json"],
    produces: ["application/json"],
    servers: [
      {
        url: "/",
        description: "Default server",
      },
    ],
    components: {
      securitySchemes: {
        userAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});

fastify.addSchema({
  $id: "queryUsers",
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "user id",
    },
  },
});

fastify.addSchema({
  $id: "resultUsers",
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "string", description: "user id" },
    },
  },
});

fastify.addSchema({
  $id: "user",
  type: "object",
  properties: {
    id: { type: "string", description: "user id" },
  },
});

fastify.get(
  `/api/users`,
  {
    schema: {
      description: `find users`,
      tags: ["users"],
      summary: "find users",
      querystring: { $ref: "queryUsers#" },
      security: [{ userAuth: [] }],
      response: {
        200: { 
            type: 'object',
            description: 'list of users',
            properties: {
                data: {
                    type: 'array',
                    description: 'list of users',
                    items: { $ref: 'user#'}
                }
            },
        },
        default: {
          type: "object",
          properties: {
            message: { type: "string", description: "error message" },
            code: { type: "number", description: "error code" },
          },
        },
      },
    },
  },
  async (request) => {
    const users = [{ id: "foo" }, { id: "bar" }, { id: "baz" }];
    const { id } = request.query;
    if (id) {
      return users.filter((u) => u.id === id);
    }
    return users;
  }
);

(async () => {
  await fastify.ready();
  await fastify.oas();
  await fastify.listen(3000);
})();
