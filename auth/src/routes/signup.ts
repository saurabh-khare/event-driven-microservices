import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/requestValidationError';
import { BadRequestError } from '../errors/badRequestError';
import { User } from '../models/users';

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
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError('User already exists');
        }
        const newUser = await User.build({ email, password });
        newUser.save();
        res.status(201).json(newUser);
    },
);

export { router as signupRouter };
