async function routes(fastify, options) {
  fastify.get("/health", function (request, reply) {
    reply.send({ hello: "world" });
  });
}

export default routes;
