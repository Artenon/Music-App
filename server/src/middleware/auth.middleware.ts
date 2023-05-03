import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Request } from "../../types";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {

    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      };

      const decoded = <jwt.UserIdJwtPayload>jwt.verify(token, process.env.SECRET_KEY!);
      req.user = decoded;
      return next();
    };

    return res.status(401).json({ message: 'Unauthorized' });

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}