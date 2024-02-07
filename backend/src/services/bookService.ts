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

  async getBooks(page: number = 1, pageSize: number = 10) {
    try {
      const [books, total] = await this.bookRepository.getBooks(page, pageSize);
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

  async createBook(bookDetails: Partial<Book>): Promise<Book> {
    return this.bookRepository.createBook(bookDetails);
  }

  async updateBook(id: number, bookDetails: Partial<Book>): Promise<Book> {
    return this.bookRepository.updateBook(id, bookDetails);
  }

  async deleteBook(id: number): Promise<void> {
    return this.bookRepository.deleteBook(id);
  }
}
