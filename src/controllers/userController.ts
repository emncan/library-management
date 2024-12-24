import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import sequelize from "../utils/database";
import User from "../models/User";
import Book from "../models/Book";
import Borrow from "../models/Borrow";
import Rating from "../models/Rating";

export const createUser = async (req: Request, res: Response) => {
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
        const user = await User.create({ name });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "User creation failed." });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users." });
    }
};

export const getUserWithBooks = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByPk(id, {
        include: [
            {
                model: Borrow,
                as: "borrows",
                include: [
                    {
                        model: Book,
                        as: "book",
                        attributes: ["name"],
                    },
                    {
                        model: Rating,
                        as: "rating",
                        attributes: ["score"],
                    },
                ],
            },
        ],
    });

    if (!user) {
        throw new NotFoundError("User not found.");
    }
    try {
        const pastBooks: { name: string; userScore: number }[] = [];
        const presentBooks: { name: string }[] = [];

        user?.borrows.forEach((borrow: any) => {
            const book = borrow.book;
            const rating = borrow.rating;
            const isReturned = borrow.returnDate !== null;

            if (isReturned) {
                pastBooks.push({
                    name: book.name,
                    userScore: rating?.score || 0,
                });
            } else {
                presentBooks.push({
                    name: book.name,
                });
            }
        });

        const response = {
            id: user?.id,
            name: user?.name,
            books: {
                past: pastBooks,
                present: presentBooks,
            },
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch user." });
    }
};

export const borrowBook = async (req: Request, res: Response) => {
    const { userId, bookId } = req.params;

    const transaction = await sequelize.transaction();

    try {
        const user = await User.findByPk(userId, { transaction });
        if (!user) {
            throw new NotFoundError("User not found.");
        }

        const book = await Book.findByPk(bookId, { transaction });
        if (!book) {
            throw new NotFoundError("Book not found.");
        }

        if (!book.status) {
            throw new NotFoundError("Book is already borrowed by another user.");
        }

        await Borrow.create(
            {
                userId: Number(userId),
                bookId: Number(bookId),
                borrowDate: new Date(),
                returnDate: null,
            },
            { transaction }
        );

        book.status = false;
        await book.save({ transaction });

        await transaction.commit();

        res.status(201).json({
            message: "Book borrowed successfully.",
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: "Failed to borrow book." });
    }
};

export const returnBook = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors
            .array()
            .map((err) => `${err.msg}`)
            .join(", ");
        throw new BadRequestError(errorMessages);
    }

    const { userId, bookId } = req.params;
    const { score } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const borrow = await Borrow.findOne({
            where: {
                userId,
                bookId,
                returnDate: null,
            },
            transaction,
        });

        if (!borrow) {
            throw new NotFoundError("Borrow record not found or already returned.");
        }

        borrow.returnDate = new Date();
        await borrow.save({ transaction });

        if (score !== undefined) {
            await Rating.create(
                {
                    userId: Number(userId),
                    bookId: Number(bookId),
                    borrowId: borrow.id,
                    score,
                },
                { transaction }
            );
        }

        const ratings = await Rating.findAll({
            where: { bookId },
            attributes: ["score"],
            transaction,
        });

        const totalScore = ratings.reduce((acc, rating) => acc + rating.score, 0);
        const averageScore = ratings.length > 0 ? totalScore / ratings.length : 0;

        const book = await Book.findByPk(bookId, { transaction });
        if (book) {
            book.status = true;
            book.score = averageScore;
            await book.save({ transaction });
        }

        await transaction.commit();

        res.status(200).json({
            message: "Book returned successfully.",
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: "Failed to return book." });
    }
};
