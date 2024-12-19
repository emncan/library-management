import { Request, Response, NextFunction } from "express";
import { RouteNotFoundError } from "../errors/RouteNotFoundError";

export const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    next(new RouteNotFoundError());
};