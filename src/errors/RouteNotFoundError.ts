import { StatusCodes } from "http-status-codes";
import { CustomError } from "../utils/CustomError";

export class RouteNotFoundError extends CustomError {
    statusCode: number;

    constructor(message: string = "Route not found") {
        super(StatusCodes.NOT_FOUND, message);
        this.statusCode = StatusCodes.NOT_FOUND;

        Object.setPrototypeOf(this, RouteNotFoundError.prototype);
    }
}