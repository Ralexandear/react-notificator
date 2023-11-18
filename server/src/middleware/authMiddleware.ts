import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwtUser } from '../database/models';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    return next();
  }

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
      decoded.password &&
      decoded.authorizationType &&
      decoded.TelegramUserId &&
      decoded.role
    )) {
      return next(ApiError.unauthorized());
    }

    req.currentUser = decoded as JwtUser;
    next();
  } catch (e) {
    return next(ApiError.unauthorized());
  }
}
