import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { failresponse } from './responseWrapper';
import { JWT_SECRET } from './config';

export type AuthenticatedRequest = Request & { user?: string | JwtPayload };

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return failresponse(res, 401, '인증 토큰이 없습니다.');
  if (!JWT_SECRET) return failresponse(res, 500, 'JWT_SECRET 설정이 없습니다.');
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    failresponse(res, 403, '유효하지 않거나 만료된 토큰입니다.');
  }
};
