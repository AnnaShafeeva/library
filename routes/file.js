const express = require('express')
const fileRouter = express.Router()
const fileMulter = require('../middleware/file')

fileRouter.post('/books/:id/download',
    fileMulter.single('fileBook'),
    (req, res) => {
        const { id } = req.params
        const { books } = stor
        const idx = books.findIndex(el => el.id === id)

        if (idx !== -1 && req.file) {
            books[idx].fileBook = req.file.path
            res.json(books[idx])
        } else {
            res.status(404).json('404 | книга не найдена')
        }
    })

fileRouter.get('/books/:id/download', (req, res) => {
    const { id } = req.params
    const { books } = stor
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1 && books[idx].fileBook) {
        res.download(books[idx].fileBook)
    } else {
        res.status(404).json('404 | файл не найден')
    }
})

module.exports = fileRouter