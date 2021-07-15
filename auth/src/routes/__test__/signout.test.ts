import request from 'supertest';
import { app } from '../../app';

describe('test user signout', () => {
    it('should clear cookie after signout', async () => {
        await global.signup();
        const response = await request(app).post('/api/users/signout').send({}).expect(200);
        expect(response.get('Set-Cookie')).toEqual(
            expect.arrayContaining(['express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly']),
        );
    });
});
