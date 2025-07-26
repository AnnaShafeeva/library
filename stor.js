const Book = require('./Book');

const bookTest = new Book('test', 'test', 'test', true, 'test', 'test');
const stor = {
    books: [bookTest]
};

module.exports = stor;
