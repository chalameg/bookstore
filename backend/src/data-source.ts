import { DataSource } from 'typeorm';
import { Book } from './entities/Book';
import { Customer } from './entities/Customer';
import { Tag } from './entities/Tag';
import { Order } from './entities/Order';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1313",
    database: "bookstore",
    entities: [Book, Customer, Order, Tag],
    synchronize: true,
    logging: false,
});

