import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import jwt from 'jsonwebtoken';
import { JwtUser } from '../database/models';

export default function checkRoleMiddleware (role: 'USER' | 'ADMIN' | 'SUDO'){
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      return next();
    }

    try {
      if (!req.headers.authorization) {
        return next(ApiError.forbidden());
      }
  
      const [tokenType, token] = req.headers.authorization.split(' ');
  
      if (tokenType !== 'Bearer' || !token) {
        return next(ApiError.forbidden());
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
      
      if (! (
        typeof decoded === 'object' &&
        decoded.id &&
        decoded.username &&
        decoded.authorizationType &&
        decoded.TelegramUserId &&
        decoded.role
      )) {
        return next(ApiError.forbidden());
      }

      if (! decoded.role.includes(role) ) {
        console.log(decoded.role)
        return next(ApiError.forbidden())
      }

      req.currentUser = decoded as JwtUser;
      next();
    } catch (e) {
      console.error(e)
      return next(ApiError.unauthorized());
    }
  }
} 
