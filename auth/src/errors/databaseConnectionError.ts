import { CustomError } from './customError';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database';
    constructor() {
        super('database connection error');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serialize(): { message: string }[] {
        return [{ message: this.reason }];
    }
}
