import Fastify from "fastify";
import cors from "@fastify/cors";

const app = Fastify({
  logger: true,
});

//try cors
app.register(cors, {
  origin: "*",
  methods: ["GET"],
});

app.get("/health", function (request, reply) {
  reply.send({ hello: "world" });
});

const paramsJsonSchema = {
  type: "string",
  properties: {
    city: { type: "string" },
  },
  required: ["city"],
};

const schema = {
  params: paramsJsonSchema,
};

const fetchTimeZone = async (place) => {
  const responseWeather = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/2025-01-01?key=${process.env.VISUAL_CROSSING_API_KEY}&unitGroup=uk&timezone`
  );
  if (!responseWeather.ok) {
    throw new Error("HTTP visual crossing error!");
  }
  const { timezone } = await responseWeather.json();
  return timezone;
};

const getDateTimeZone = (timezone, offset = 0) => {
  let dt = new Date();
  dt.setDate(dt.getDate() + offset);
  const today = dt.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: timezone,
  });
  return today;
};

app.get("/api/timezone/:city", async function (request, reply) {
  try {
    const { city } = request.params;
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/2025-01-01?key=${process.env.VISUAL_CROSSING_API_KEY}&unitGroup=uk&timezone`
    );
    if (!response.ok) {
      const error = new Error("HTTP visual crossing error!");
      error.code = response.status;
      throw error;
    }
    const { timezone } = await response.json();
    reply.code(response.status).send(timezone);
  } catch (error) {
    reply.code(error.code).send(error);
  }
});
app.get("/api/weather/:city", schema, async function (request, reply) {
  try {
    const { city } = request.params;
    const placeTimezone = await fetch(
      `http://127.0.0.1:3000/api/timezone/${city}`
    );
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

app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
