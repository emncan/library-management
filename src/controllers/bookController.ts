import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import Book from "../models/Book";

export const createBook = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors
            .array()
            .map((err) => `${err.msg}`)
            .join(", ");
        throw new BadRequestError(errorMessages);
    }

    try {
        const { name } = req.body;
        const user = await Book.create({ name });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Book creation failed." });
    }
};

export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.findAll({
            attributes: ["id", "name"],
        });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books." });
    }
};

export const getBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const book = await Book.findByPk(id, {
        attributes: ["id", "name", "score"],
    });

    if (!book) {
        throw new NotFoundError("Book not found.");
    }

    res.status(200).json(book);
};
