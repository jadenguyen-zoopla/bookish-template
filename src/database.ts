import Knex from "knex";
import { title } from "process";

const client = Knex ({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: process.env.POSTGRES_PASSWORD,
        database: 'book_database',
        port: 5432
    }
});


export const getAllBooks = () => {
    return client('book')
    .select()
}

export const getAllTitles = () => {
    return client('book')
    .select()
    // .where('title', 'like', `%${title}`)
}

export const getAllAuthors = () => {
    return client('book')
    .select('author')
    // .where('last_name', 'like', `%${name}`)
}

// interface Book {
//     title: string;
//     author: string;
// }

// export const addNewBook = (book: Book) => {
//     client.insert({title: addNewBook.title, author: addNewBook.author})
// }
