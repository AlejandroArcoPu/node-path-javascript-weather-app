// Require the framework
import Fastify from "fastify";
import cors from "@fastify/cors";

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: "*",
  methods: ["GET"],
});

// Register your application as a normal plugin.
app.register(import("../src/app.js"));

export default async (req, res) => {
  await app.ready();
  app.server.emit("request", req, res);
};
