import { DataSource } from 'typeorm';
import { Book } from './entities/Book';
import { Customer } from './entities/Customer';
import { Tag } from './entities/Tag';
import { Order } from './entities/Order';

// localhost
// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "1313",
//     database: "bookstore",
//     entities: [Book, Customer, Order, Tag],
//     synchronize: true,
//     logging: false,
// });

// render db
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "dpg-cn2ak4ud3nmc739bs810-a.oregon-postgres.render.com",
    port: 5432, 
    username: "chala",
    password: "r16wZCqXQr1AEIlMEsPjiqWFYGy0WOFJ",
    database: "bookstore_evts",
    entities: [Book, Customer, Order, Tag],
    synchronize: true,
    logging: false,
    ssl: {
        rejectUnauthorized: false
    },
});


