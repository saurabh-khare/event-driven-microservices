import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/badRequestError';
import { validateRequest } from '../middlewares/validateRequest';
import { PasswordManager } from '../services/password';
import { User } from '../models/users';

const router = express.Router();

router.post(
    '/api/users/signin',
    [
        body('email').isEmail().withMessage('Enter valid email'),
        body('password').trim().notEmpty().withMessage('Password cannot be empty'),
    ],
    validateRequest,

    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }
        const passwordMatch = await PasswordManager.compare(existingUser.password, password);
        if (!passwordMatch) {
            throw new BadRequestError('Invalid Credentials');
        }
        const userToken = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email,
            },
            process.env.AUTH_KEY!,
        );
        req.session = {
            jwt: userToken,
        };
        res.send(existingUser);
    },
);

export { router as signinRouter };
