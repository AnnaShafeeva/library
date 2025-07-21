const express = require('express')
const router = express.Router()
const { Book, stor } = require('../book')

router.post('/user/login', (req, res) => {
    res.status(201)
    res.json({ id: 1, mail: "test@mail.ru" })
})

router.get('/books', (req, res) => {
    const { books } = stor
    res.json(books)
})

router.get('/books/:id', (req, res) => {
    const { books } = stor
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

router.post('/books', (req, res) => {
    const { books } = stor
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
    books.push(newBook)

    res.status(201)
    res.json(newBook)
})

router.put('/books/:id', (req, res) => {
    const { books } = stor
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)
    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title, description, authors, favorite, fileCover, fileName, fileBook
        }

        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }

})

router.delete('/books/:id', (req, res) => {
    const { books } = stor
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)
    if (idx !== -1) {
        books.splice(idx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

module.exports = router