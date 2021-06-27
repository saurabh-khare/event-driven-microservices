import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/badRequestError';
import { User } from '../models/users';
import { validateRequest } from '../middlewares/validateRequest';

const router = express.Router();
router.post(
    '/api/users/signup',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError('User already exists');
        }
        const newUser = await User.build({ email, password });
        await newUser.save();

        const userToken = jwt.sign(
            {
                id: newUser.id,
                email: newUser.email,
            },
            process.env.AUTH_KEY!,
        );
        req.session = {
            jwt: userToken,
        };
        res.status(201).json(newUser);
    },
);

export { router as signupRouter };
