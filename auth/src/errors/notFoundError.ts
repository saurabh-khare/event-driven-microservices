import { CustomError } from './customError';

export class NotFoundError extends CustomError {
    statusCode = 404;
    constructor() {
        super('Not Found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serialize(): { message: string }[] {
        return [{ message: 'Not Found' }];
    }
}
