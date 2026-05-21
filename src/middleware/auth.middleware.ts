import { Request, Response, NextFunction } from "express";

export const apiKeyAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.header("x-api-key");

  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

    return;
  }

  next();
};