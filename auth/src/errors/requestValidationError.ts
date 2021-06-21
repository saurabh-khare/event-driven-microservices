import { ValidationError } from 'express-validator';
import { CustomError } from './customError';

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        super('invalid request');
        //Since we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serialize(): { message: string; field: string }[] {
        return this.errors.map((error) => {
            return { message: error.msg, field: error.param };
        });
    }
}
