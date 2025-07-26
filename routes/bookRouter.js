const express = require('express');
const stor = require('../stor');
const bookFile = require('../middleware/bookFile');
const Book = require('../Book');

const router = express.Router();
router.use(express.json());

router.get('/books', (req, res) => {
    const { books } = stor;
    res.json(books);
});

router.get('/books/:id', (req, res) => {
    const { books } = stor;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

router.post('/books', bookFile.single('fileBook'), (req, res) => {
    const { books } = stor;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const fileBook = req.file ? req.file.originalname : '';
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

router.put('/books/:id', (req, res) => {
    const { books } = stor;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title, description, authors, favorite, fileCover, fileName
        }
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

router.delete('/books/:id', (req, res) => {
    const { books } = stor;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json('ok');
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

router.post('/books/upload', bookFile.single('book'), (req, res) => {
    if (req.file) {
        const { path } = req.file;
        res.json({ path });
    } else {
        res.status(404);
        res.json('404 | файл не загружен');
    }
});

router.get('/books/:id/download', (req, res) => {
    const { books } = stor;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1 && books[idx].fileBook) {
        res.download(__dirname + '/../public/books-file/' + books[idx].fileBook);
    } else {
        res.status(404);
        res.json('404 | файл не найден');
    }
});

module.exports = router;