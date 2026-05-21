import { Router } from "express";

import {
  createLog,
  verifyLogs,
  getLogById,
  exportLogs,
} from "../controllers/log.controller";

import { apiKeyAuth } from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/log:
 *   post:
 *     summary: Create audit log
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       201:
 *         description: Log created successfully
 */
router.post("/log", apiKeyAuth, createLog);

/**
 * @swagger
 * /api/verify:
 *   get:
 *     summary: Verify audit chain integrity
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Audit chain verified
 */
router.get("/verify", apiKeyAuth, verifyLogs);

/**
 * @swagger
 * /api/log/{id}:
 *   get:
 *     summary: Get single audit log
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Single log fetched
 */
router.get("/log/:id", apiKeyAuth, getLogById);

/**
 * @swagger
 * /api/export:
 *   get:
 *     summary: Export logs with filters
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: actor
 *         schema:
 *           type: string
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Logs exported successfully
 */
router.get("/export", apiKeyAuth, exportLogs);

export default router;