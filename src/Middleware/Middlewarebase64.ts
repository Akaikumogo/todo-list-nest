// auth.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const decodedToken = atob(token);
      const payload = JSON.parse(decodedToken);
      if (payload.expDate) {
        const expDate = new Date(payload.expDate);
        const currentDate = new Date();

        if (currentDate > expDate) {
          throw new UnauthorizedException('Token has expired');
        }
      } else {
        throw new UnauthorizedException(
          'Token does not have an expiration date',
        );
      }
      req['user'] = payload;

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
