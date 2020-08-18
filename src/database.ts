import Knex from "knex";

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

/* ========= LIST OF BOOKS ====== */

export const getAllBooks = () => {
    return client('book')
    .select()
}

/* ========= LIST OF TITLES ====== */

export const getAllTitles = () => {
    return client('book')
    .select('title')
}

/* ========= LIST OF AUTHORS ====== */

export const getAllAuthors = () => {
    return client('book')
    .select('author')
}

/* ========= ADD BOOK ====== */

interface Book {
    title: string;
    author: string;
}

export const addNewBook = (book: Book) => {
   return client.insert({title: book.title, author: book.author})
   .into('book')
}
