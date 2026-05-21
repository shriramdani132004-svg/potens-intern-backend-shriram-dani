import crypto from "crypto";

interface GenerateHashInput {
  actor: string;
  action: string;
  payload: unknown;
  previousHash: string | null;
  createdAt: Date;
}

export const generateHash = ({
  actor,
  action,
  payload,
  previousHash,
  createdAt,
}: GenerateHashInput): string => {
  const data = JSON.stringify({
    actor,
    action,
    payload,
    previousHash,
    createdAt,
  });

  return crypto
    .createHash("sha256")
    .update(data)
    .digest("hex");
};