import "dotenv/config";
import express, { response, request } from "express";
import nunjucks from "nunjucks";
import sassMiddleware from "node-sass-middleware";
import {getAllBooks, getAllAuthors, getAllTitles, addNewBook} from "./database"

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

app.get("/all-books", async (request, response) => {
    const bookRequest = await getAllBooks();
    const model = {
        books: bookRequest
    }
    response.render('books.html', model);
});

app.get("/all-titles", async (request, response) => {
    const titleRequest = await getAllTitles();
    const model = {
        titles: titleRequest
    }
    response.render('titles.html', model);
})

app.get("/all-authors", async (request, response) => {
    const authorRequest = await getAllAuthors();
    const model = {
        authors: authorRequest
    }
    response.render('authors.html', model);
})

app.get("/add-book", async (request, response) => {
    response.render('addBook.html')
}) 

app.post("/add-book", async (request, response) => {
    const book = request.body
    console.log(book)
    await addNewBook(book)
    response.redirect("/all-books");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});
