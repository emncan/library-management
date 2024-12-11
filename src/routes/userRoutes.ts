import { Router } from "express";
import { validateCreateUser, validateBookScore } from "../utils/validations";
import {
    createUser,
    getUsers,
    getUserWithBooks,
    borrowBook,
    returnBook,
} from "../controllers/userController";

const router = Router();

router.post("/", validateCreateUser, createUser);
router.get("/", getUsers);
router.route("/:id").get(getUserWithBooks);
router.route("/:userId/borrow/:bookId").post(borrowBook);
router.route("/:userId/return/:bookId").post(validateBookScore, returnBook);

export default router;
