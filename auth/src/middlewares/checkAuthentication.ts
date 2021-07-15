import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../errors/forbiddenError';

export const checkAuthentication = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.currentUser) {
        throw new ForbiddenError();
    }
    next();
};
