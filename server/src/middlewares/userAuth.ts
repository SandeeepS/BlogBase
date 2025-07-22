import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { CreateJWT } from "../utils/generateTokens";

// Extend Express Request interface to include 'user'
import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload;
  }
}

dotenv.config();

const jwt = new CreateJWT();

export const userAuth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Unauthorized: No token provided" });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verifyToken(token);

      req.user = decoded;

      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
  };
};
