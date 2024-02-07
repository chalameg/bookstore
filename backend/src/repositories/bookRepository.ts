import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";

export class BookRepository {
  async getBooks(page: number, pageSize: number): Promise<[Book[], number]> {
    const bookRepository = AppDataSource.getRepository(Book);
    return bookRepository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  async findById(id: number): Promise<Book | null> {
    const bookRepository = AppDataSource.getRepository(Book);
    return bookRepository.findOneBy({id});;
  }

  async createBook(bookDetails: Partial<Book>): Promise<Book> {
    const bookRepository = AppDataSource.getRepository(Book);
    const book = bookRepository.create(bookDetails);
    return bookRepository.save(book);
  }

  async updateBook(id: number, bookDetails: Partial<Book>): Promise<Book> {
    const bookRepository = AppDataSource.getRepository(Book);
    await bookRepository.update(id, bookDetails);
    return this.getBookById(id);
  }

  async deleteBook(id: number): Promise<void> {
    const bookRepository = AppDataSource.getRepository(Book);
    await bookRepository.delete(id);
  }

  async getBookById(id: number): Promise<Book> {
    const bookRepository = AppDataSource.getRepository(Book);
    return bookRepository.findOneByOrFail({ id });
  }
}
