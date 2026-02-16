const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Error handling for invalid JSON
app.use((err, req, res, next) => {
    // Catch SyntaxError from body-parser
    if (err instanceof SyntaxError) {
        return res.status(400).json({ error: 'Invalid JSON format. Please check your request body.' });
    }
    next();
});

// In-memory data store for books
let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: '1984', author: 'George Orwell' }
];

// GET / - Welcome message
app.get('/', (req, res) => {
    res.send('Welcome to the Book API! Try visiting <a href="/books">/books</a> to see the list of books.');
});

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }
    const newBook = {
        id: books.length + 1, // Simple ID generation
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    if (!title && !author) {
        return res.status(400).json({ error: 'Title or author required for update' });
    }

    if (title) books[bookIndex].title = title;
    if (author) books[bookIndex].author = author;

    res.json(books[bookIndex]);
});

// DELETE /books/:id - Remove a book by ID
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook[0]);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
