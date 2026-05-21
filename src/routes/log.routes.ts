import { apiKeyAuth } from "../middleware/auth.middleware";

import { Router } from "express";

import {
  createLog,
  verifyLogs,
  getLogById,
} from "../controllers/log.controller";

import { apiKeyAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/log", apiKeyAuth, createLog);

router.get("/verify", apiKeyAuth, verifyLogs);

router.get("/log/:id", apiKeyAuth, getLogById);

export default router;