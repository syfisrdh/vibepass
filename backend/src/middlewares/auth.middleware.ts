import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export enum Role {
  USER = 1,
  ORGANIZER = 2,
  ADMIN = 3,
}

const requireAuth = (role: Role) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
        id: number;
        role: number;
      };

      const user = await User.findByPk(decoded.id);

      if (!user || user.role < role) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden',
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
  };
};

export default requireAuth;
