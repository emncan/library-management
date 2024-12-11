import { Router } from "express";
import { createBook, getBooks, getBook } from "../controllers/bookController";
import { validateCreateBook } from "../utils/validations";

const router = Router();

router.post("/", validateCreateBook, createBook);
router.get("/", getBooks);
router.route("/:id").get(getBook);

export default router;
