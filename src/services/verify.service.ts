import prisma from "../config/prisma";
import { generateHash } from "./hash.service";

export const verifyChain = async () => {
  const logs = await prisma.auditLog.findMany({
    orderBy: {
      id: "asc",
    },
  });

  for (let i = 0; i < logs.length; i++) {
    const currentLog = logs[i];

    const recalculatedHash = generateHash({
      actor: currentLog.actor,
      action: currentLog.action,
      payload: currentLog.payload,
      previousHash: currentLog.previousHash,
      createdAt: currentLog.createdAt,
    });

    if (recalculatedHash !== currentLog.currentHash) {
      return {
        valid: false,
        brokenEntryId: currentLog.id,
      };
    }

    if (i > 0) {
      const previousLog = logs[i - 1];

      if (currentLog.previousHash !== previousLog.currentHash) {
        return {
          valid: false,
          brokenEntryId: currentLog.id,
        };
      }
    }
  }

  return {
    valid: true,
    brokenEntryId: null,
  };
};