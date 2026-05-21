import express from "express";
import helmet from "helmet";
import cors from "cors";
import { apiRateLimiter } from "./middleware/rateLimit.middleware";
import pinoHttp from "pino-http";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./config/swagger";
import logRoutes from "./routes/log.routes";

import logger from "./utils/logger";

const app = express();

app.use(
  pinoHttp({
    logger,
  })
);

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(apiRateLimiter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", logRoutes);

export default app;