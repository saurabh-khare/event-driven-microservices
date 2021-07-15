import request from 'supertest';
import { app } from '../../app';

describe('test signin functionality', () => {
    it('should fail when email does not exist', () => {
        request(app).post('/api/users/signin').send({ email: 'test@test.com', password: 'password' }).expect(400);
    });
    it('should fail when incorrect password is supplied', async () => {
        //First signup the user
        await global.signup();
        //Check for bad password
        await request(app).post('/api/users/signin').send({ email: 'test@test.com', password: 'pass' }).expect(400);
    });
    it('should respond with cookie when given correct credentials', async () => {
        //First signup the user
        await global.signup();
        //Check with correct password
        const response = await request(app)
            .post('/api/users/signin')
            .send({ email: 'test@test.com', password: 'password' })
            .expect(200);
        expect(response.get('Set-Cookie')).toBeDefined();
    });
});
