import mongoose from 'mongoose';
import { app } from './app';

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
