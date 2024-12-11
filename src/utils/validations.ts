import { body } from "express-validator";

export const validateCreateUser = [
    body("name")
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("Name is required"),
];

export const validateCreateBook = [
    body("name")
        .isString()
        .withMessage("Name must be a string.")
        .notEmpty()
        .withMessage("Name is required."),
];

export const validateBookScore = [
    body("score")
        .isFloat({ min: 0, max: 10 })
        .withMessage("Score must be a number between 0 and 10.")
        .notEmpty()
        .withMessage("Score is required."),
];
