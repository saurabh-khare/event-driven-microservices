import request from 'supertest';
import { app } from '../../app';

describe('test user signup', () => {
    it('returns a 201 on successful signup', () => {
        request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password',
            })
            .expect(201);
    });
    it('should return status 400 for invalid email', () => {
        request(app).post('/api/users/signup').send({ email: 'test', password: 'password' }).expect(400);
    });
    it('should return 400 for invalid password', () => {
        request(app).post('/api/users/signup').send({ email: 'test@test.com', password: 'p' }).expect(400);
    });
    it('should return 400 for empty input', () => {
        request(app).post('/api/users/signup').expect(400);
    });
    it('should disallow duplicate emails', async () => {
        //Since we want to await the result of first post to create the record we use await here
        await global.signup();
        //Second time it should not allow to create signup with same user id
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password',
            })
            .expect(400);
    });

    it('should set a cookie after signup', async () => {
        const response = await request(app)
            .post('/api/users/signup')
            .send({ email: 'test@test.com', password: 'password' })
            .expect(201);
        expect(response.get('Set-Cookie')).toBeDefined();
    });
});
