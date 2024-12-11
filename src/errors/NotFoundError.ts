import { StatusCodes } from "http-status-codes";
import { CustomError } from "../utils/CustomError";

export class NotFoundError extends CustomError {
    statusCode: number;

    constructor(message: string) {
        super(StatusCodes.NOT_FOUND, message);
        this.statusCode = StatusCodes.NOT_FOUND;

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
