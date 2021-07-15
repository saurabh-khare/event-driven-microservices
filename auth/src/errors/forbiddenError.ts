import { CustomError } from './customError';

export class ForbiddenError extends CustomError {
    statusCode = 401;
    constructor() {
        super('Not logged in');
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
    serialize(): { message: string }[] {
        return [{ message: 'Not logged in' }];
    }
}
