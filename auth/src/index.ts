import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: true,
    }),
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
    throw new NotFoundError();
});
app.use(errorHandler);
const start = async () => {
    if (!process.env.AUTH_KEY) {
        throw new Error('Auth token not configured');
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-service:27017/auth', {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
        });
        console.log('Connection successful');
    } catch (error) {
        console.error(error);
    }
    app.listen(3000, () => {
        console.log('Auth service started on port 3000');
    });
};

start();
