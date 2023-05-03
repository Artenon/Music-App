import { Request } from "express";
import jwt from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface UserIdJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
};

interface Request extends Request {
  user?: jwt.UserIdJwtPayload;
};
