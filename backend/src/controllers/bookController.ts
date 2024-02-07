import { Request, Response, Router } from "express";
import { BookService } from "../services/bookService";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateBookDto } from "../dtos/CreateBookDto";

const router = Router();
const bookService = new BookService();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get a list of books
 *     description: Retrieve a list of books with optional pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 page:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 total:
 *                   type: integer
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const books = await bookService.getBooks(page, pageSize);
    res.json(books);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).send(error.message);
    } else {
      // Handle cases where the error is not an instance of Error
      res.status(500).send("An unknown error occurred");
    }
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await bookService.getBookById(Number(id));
    res.json(book);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).send(error.message);
    } else {
      // Handle cases where the error is not an instance of Error
      res.status(500).send("An unknown error occurred");
    }
  }
});

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     description: Adds a new book to the bookstore.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.post("/", async (req: Request, res: Response) => {
  // Transform the request body into an instance of CreateBookDto
  const bookDetails = plainToInstance(CreateBookDto, req.body);

  // Perform validation
  const errors = await validate(bookDetails);

  if (errors.length > 0) {
    // If validation errors exist, return them
    return res.status(400).json(errors);
  }

  try {
    const book = await bookService.createBook(bookDetails);
    res.status(201).json(book);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).send(error.message);
    } else {
      // Handle cases where the error is not an instance of Error
      res.status(500).send("An unknown error occurred");
    }
  }
});


router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await bookService.updateBook(Number(id), req.body);
    res.json(book);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).send(error.message);
    } else {
      // Handle cases where the error is not an instance of Error
      res.status(500).send("An unknown error occurred");
    }
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await bookService.deleteBook(Number(id));
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).send(error.message);
    } else {
      // Handle cases where the error is not an instance of Error
      res.status(500).send("An unknown error occurred");
    }
  }
});

export default router;
