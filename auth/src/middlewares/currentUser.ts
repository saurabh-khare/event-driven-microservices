import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        next();
    }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.AUTH_KEY);
    } catch (error) {}
};
