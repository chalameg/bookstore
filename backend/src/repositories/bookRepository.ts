import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";

export class BookRepository {
  async getBooks(page: number, pageSize: number, tagIds?: number[]): Promise<[Book[], number]> {
    const bookRepository = AppDataSource.getRepository(Book);
    const queryBuilder = bookRepository.createQueryBuilder("book");
  
    queryBuilder.leftJoinAndSelect("book.tags", "tag");
  
    if (tagIds && tagIds.length > 0) {
      queryBuilder.where("tag.id IN (:...tagIds)", { tagIds });
    }
  
    queryBuilder.take(pageSize);
    queryBuilder.skip((page - 1) * pageSize);
  
    const books = await queryBuilder.getManyAndCount();
  
    return books;
  }

  async findById(id: number): Promise<Book | null> {
    const bookRepository = AppDataSource.getRepository(Book);
    return bookRepository.findOne({
      where: {
        id,
      },
      relations: {
        tags: true, // Include the tags relation
      },
    });
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
