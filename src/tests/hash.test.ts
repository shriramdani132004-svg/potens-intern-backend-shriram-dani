import { describe, it, expect } from "vitest";

import { generateHash } from "../services/hash.service";

describe("generateHash", () => {
  it("should generate same hash for same input", () => {
    const data = {
      actor: "admin",
      action: "CREATE_USER",
      payload: {
        userId: 1,
      },
      previousHash: null,
      createdAt: new Date("2026-01-01"),
    };

    const hash1 = generateHash(data);

    const hash2 = generateHash(data);

    expect(hash1).toBe(hash2);
  });

  it("should generate different hash for modified input", () => {
    const data1 = {
      actor: "admin",
      action: "CREATE_USER",
      payload: {
        userId: 1,
      },
      previousHash: null,
      createdAt: new Date("2026-01-01"),
    };

    const data2 = {
      actor: "admin",
      action: "DELETE_USER",
      payload: {
        userId: 1,
      },
      previousHash: null,
      createdAt: new Date("2026-01-01"),
    };

    const hash1 = generateHash(data1);

    const hash2 = generateHash(data2);

    expect(hash1).not.toBe(hash2);
  });
});