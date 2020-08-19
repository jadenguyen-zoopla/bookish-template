import "dotenv/config";
import express, { response, request } from "express";
import nunjucks from "nunjucks";
import sassMiddleware from "node-sass-middleware";
import {getAllBooks, getAllAuthors, getAllTitles, addNewBook, deleteBook, getBookById, getAllUsers, getUserBookList} from "./database"

const app = express();
const port = process.env['PORT'] || 3000;

const srcPath = __dirname + "/../stylesheets";
const destPath = __dirname + "/../public";
app.use(
    sassMiddleware({
        src: srcPath,
        dest: destPath,
        debug: true,
        outputStyle: 'compressed',
        prefix: '',
    }),
    express.static('public')
);

app.use(
    express.urlencoded({extended:true})
)

const PATH_TO_TEMPLATES = "./templates/";
nunjucks.configure(PATH_TO_TEMPLATES, { 
    autoescape: true,
    express: app
});

app.get("/", (req, res) => {
    const model = {
        message: "World"
    }
    res.render('index.html', model);
})

/* ========= LIST OF BOOKS ====== */
app.get("/all-books", async (request, response) => {
    const bookRequest = await getAllBooks();
    const model = {
        books: bookRequest
    }
    response.render('books.html', model);
});

/* ========= GET BOOK INFO WITH ID ====== */
app.get("/book-id", async (request, response) => {
    response.render('bookInfo.html')
}) 

app.post("/book-id", async (request, response) => {
    const bookID = parseInt(request.params.id);
    const model = {
        book: await getBookById(bookID)
    };
    response.render('bookInfo.html', model)
    
})

/* ========= LIST OF TITLES ====== */
app.get("/all-titles", async (request, response) => {
    const titleRequest = await getAllTitles();
    const model = {
        titles: titleRequest
    }
    response.render('titles.html', model);
})

/* ========= LIST OF AUTHORS ====== */
app.get("/all-authors", async (request, response) => {
    const authorRequest = await getAllAuthors();
    const model = {
        authors: authorRequest
    }
    response.render('authors.html', model);
})

/* ========= ADD/DELETE BOOK ====== */
app.get("/add-book", async (request, response) => {
    response.render('addBook.html')
}) 

app.post("/add-book", async (request, response) => {
    const book = request.body
    console.log(book)
    await addNewBook(book)
    response.redirect("/all-books");
});

app.get("/delete-book", async (request, response) => {
    response.render('deleteBook.html')
}) 

app.post("/delete-book", async (request, response) => {
    const delete_book = request.body.id
    await deleteBook(delete_book)
    response.redirect("/all-books");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});

/* ========= LIST OF MEMBERS ====== */
app.get("/all-users", async (request, response) => {
    const userRequest = await getAllUsers();
    const model = {
        users: userRequest
    }
    response.render('users.html', model);
})

/* ========= GET MEMBER INFO WITH ID ====== */
app.get("/user-id", async (request, response) => {
    response.render('userWithBook.html')
}) 

app.post("/user-id", async (request, response) => {
    const userID = request.body.id
    const model = {
        user: await getUserBookList(userID)
    };
    response.render('userWithBook.html', model)
})
