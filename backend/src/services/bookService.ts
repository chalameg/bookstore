import { CreateBookDto } from "../dtos/CreateBookDto";
import { Book } from "../entities/Book";
import { Tag } from "../entities/Tag";
import { BookRepository } from "../repositories/bookRepository";
import { TagRepository } from "../repositories/tagRepository";

export class BookService {
  private bookRepository: BookRepository;
  private tagRepository: TagRepository;

  constructor() {
    this.bookRepository = new BookRepository();
    this.tagRepository = new TagRepository();
  }

  async getBooks(page: number = 1, pageSize: number = 10, tagIds?: number[]) {
    try {
      const [books, total] = await this.bookRepository.getBooks(page, pageSize, tagIds);
      return {
        data: books,
        total,
        page,
        lastPage: Math.ceil(total / pageSize),
      };
    } catch (error) {
      throw new Error("Unable to fetch books");
    }
  }

  async getBookById(id: number): Promise<Book | null> {
    return this.bookRepository.findById(id);
  }

  async createBook(bookDetails: CreateBookDto): Promise<Book> {
    // Extract tag IDs from the bookDetails DTO
    const tagIds = bookDetails.tags;

    // Attempt to find each specified Tag entity by its ID
    const tags = await Promise.all(
      tagIds.map(tagId => this.tagRepository.findById(tagId))
    );

    // Filter out any undefined values in case some tag IDs were invalid
    const validTags = tags.filter((tag): tag is Tag => tag !== null);

    // Prepare the book entity, excluding the tags property to avoid issues
    const { tags: _, ...bookData } = bookDetails;

    // Create the book entity
    const book = this.bookRepository.createBook({
      ...bookData,
      tags: validTags,
    });

    return book;
  }

  async updateBook(id: number, bookDetails: Partial<Book>): Promise<Book> {
    return this.bookRepository.updateBook(id, bookDetails);
  }

  async deleteBook(id: number): Promise<void> {
    return this.bookRepository.deleteBook(id);
  }
}
