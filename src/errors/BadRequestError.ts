import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../utils/CustomError';

export class BadRequestError extends CustomError {
    statusCode: number;

    constructor(message: string) {
        super(StatusCodes.BAD_REQUEST, message);
        this.statusCode = StatusCodes.BAD_REQUEST;

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}