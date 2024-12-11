import { StatusCodes } from "http-status-codes";
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

interface CustomError extends Error {
    statusCode?: number;
}

export const errorHandler: ErrorRequestHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let customError: {
        message: string;
        statusCode: number;
    } = {
        message: err.message || "Something went wrong, try again later",
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    };

    res.status(customError.statusCode).json({
        message: customError.message,
    });
    return;
};
