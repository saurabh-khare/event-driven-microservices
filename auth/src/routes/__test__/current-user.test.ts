import request from 'supertest';
import { app } from '../../app';

describe('test current user route', () => {
    it('should respond with current user', async () => {
        const cookie = await global.signup();
        const response = await request(app).get('/api/users/currentuser').set('Cookie', cookie).expect(200);
        expect(response.body.currentUser).toMatchObject({ email: 'test@test.com' });
    });
});
