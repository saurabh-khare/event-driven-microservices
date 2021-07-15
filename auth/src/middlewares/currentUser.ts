/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}
export const currentUser = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.session?.jwt) {
        next();
    }
    try {
        const payload = jwt.verify(req.session?.jwt, process.env.AUTH_KEY!) as UserPayload;
        req.currentUser = payload;
    } catch (error) {
        console.error('error while getting payload');
    }
    next();
};
