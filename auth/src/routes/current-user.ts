import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    if (!req.session?.jwt) {
        res.status(400).json({ currentUser: null });
    }
    try {
        const payload = jwt.verify(req.session?.jwt, process.env.AUTH_KEY!);
        res.send({ currentUser: payload });
    } catch (error) {
        res.status(400).json({ currentUser: null });
    }
});

export { router as currentUserRouter };
