import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import jwt from 'jsonwebtoken';
import { JwtUser } from '../database/models';

export default function checkRoleMiddleware (role: 'USER' | 'ADMIN' | 'SUDO'){
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      return next();
    }
    console.log('check')
    try {
      if (!req.headers.authorization) {
        return next(ApiError.unauthorized());
      }
  
      const [tokenType, token] = req.headers.authorization.split(' ');
  
      if (tokenType !== 'Bearer' || !token) {
        return next(ApiError.unauthorized());
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
        return next(ApiError.unauthorized());
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
