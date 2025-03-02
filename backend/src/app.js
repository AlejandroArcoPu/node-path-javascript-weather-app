import { getDateTimeZone } from "./utils/dateTime";
import { fetchTimeZone } from "./utils/fetchTimezone";

async function routes(fastify, options) {
  fastify.get("/health", function (request, reply) {
    reply.send({ hello: "world" });
  });

  fastify.get("/api/weather/:city", async function (request, reply) {
    try {
      const { city } = request.params;
      const placeTimezone = await fetchTimeZone(city);
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${getDateTimeZone(
          placeTimezone
        )}/${getDateTimeZone(placeTimezone, 4)}/?key=${
          process.env.VISUAL_CROSSING_API_KEY
        }&unitGroup=uk`
      );
      if (!response.ok) {
        const error = new Error("HTTP visual crossing error!");
        error.code = response.status;
        throw error;
      }
      const data = await response.json();
      reply.code(response.status).send(data);
    } catch (error) {
      reply.code(error.code).send(error);
    }
  });
}

export default routes;
