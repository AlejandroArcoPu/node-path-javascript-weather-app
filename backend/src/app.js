async function routes(fastify, options) {
  fastify.get("/", function (request, reply) {
    reply.send({ hello: "world" });
  });
}

export default routes;
