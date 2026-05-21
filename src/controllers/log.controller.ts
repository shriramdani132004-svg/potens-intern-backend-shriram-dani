import { Request, Response } from "express";
import prisma from "../config/prisma";
import { createLogSchema } from "../validations/log.validation";
import { generateHash } from "../services/hash.service";
import { verifyChain } from "../services/verify.service";
import { generateHash } from "../services/hash.service";

export const getLogById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const log = await prisma.auditLog.findUnique({
      where: {
        id,
      },
    });

    if (!log) {
      res.status(404).json({
        success: false,
        message: "Log not found",
      });

      return;
    }

    const recalculatedHash = generateHash({
      actor: log.actor,
      action: log.action,
      payload: log.payload,
      previousHash: log.previousHash,
      createdAt: log.createdAt,
    });

    const verified = recalculatedHash === log.currentHash;

    res.status(200).json({
      success: true,
      data: {
        log,
        verified,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyLogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await verifyChain();

    if (!result.valid) {
      res.status(400).json({
        success: false,
        message: "Audit chain verification failed",
        brokenEntryId: result.brokenEntryId,
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Audit chain verified successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = createLogSchema.parse(req.body);

    const lastLog = await prisma.auditLog.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const previousHash = lastLog?.currentHash || null;

    const createdAt = new Date();

    const currentHash = generateHash({
      actor: validatedData.actor,
      action: validatedData.action,
      payload: validatedData.payload,
      previousHash,
      createdAt,
    });

    const newLog = await prisma.auditLog.create({
      data: {
        actor: validatedData.actor,
        action: validatedData.action,
        payload: validatedData.payload,
        previousHash,
        currentHash,
        createdAt,
      },
    });

    res.status(201).json({
      success: true,
      message: "Log created successfully",
      data: newLog,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};