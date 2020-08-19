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

/* ========= LIST OF BOOKS ====== */
export const getAllBooks = () => {
    return client('book')
    .select()
};

/* ========= GET BOOK WITH ID (DOESNT WORK YET) ====== */
export const getBookById = (id: number) => {
    return client.select('*')
    .from<Book>('book')
    .where('id', id).first();
};

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

/* ========= ADD/DELETE BOOK ====== */

interface Book {
    id: number;
    title: string;
    author: string;
}

export const addNewBook = (book: Book) => {
   return client.insert({title: book.title, author: book.author})
   .into('book')
}

export const deleteBook = (id: number) => {
    return client('book')
   .delete()
   .where('id', id)
}

/* ========= LIST OF USERS ====== */
export const getAllUsers = () => {
    return client ('member')
    .select()
}

// interface Member {
//     id: number;
//     name: string;
//     email: string;
// }

/* ========= WHICH USER HAS BOOK ====== */
export const getUserBookList = (id: number) => {
    return client('member')
    .select('member.name', 'member.email', 'book.title', 'checked_out_book.check_out_date', 'checked_out_book.return_date')
    .join('checked_out_book', 'member.id', 'checked_out_book.member_id')
    .join('book_copy', 'checked_out_book.copy_id', 'book_copy.id')
    .join('book', 'book_copy.book_id', 'book.id')
    .where('member.id', id)
}