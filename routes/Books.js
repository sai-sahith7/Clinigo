const express = require('express');
const router = express.Router();
const Books = require('../models/Books');

router.get('/', async (req, res) => {
    if (Object.keys(req.query).length != 0) {
        if (req.query.genre) {
            try {
                const books = await Books.find({ genre: req.query.genre });
                if (books.length == 0) return res.status(404).json({ message: "No books found" });
                return res.status(200).json(books);
            } catch (err) {
                return res.status(500).json({ message: err.message });
            }
        }
        else if (req.query.year) {
            try {
                const books = await Books.find({ year: req.query.year });
                if (books.length == 0) return res.status(404).json({ message: "No books found" });
                return res.status(200).json(books);
            } catch (err) {
                return res.status(500).json({ message: err.message });
            }
        }
        else if (req.query.rating) {
            try {
                const books = await Books.find({ rating: req.query.rating });
                if (books.length == 0) return res.status(404).json({ message: "No books found" });
                return res.status(200).json(books);
            } catch (err) {
                return res.status(500).json({ message: err.message });
            }
        }
        else {
            return res.status(500).json({ message: "Invalid query parameter" });
        }
    }
    try {
        const books = await Books.find();
        if (books.length == 0) return res.status(404).json({ message: "No books found" });
        return res.status(200).json(books);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        try {
            const book = await Books.findById(req.params.id);
            if (book == null) return res.status(404).json({ message: "Book not found" });
            return res.status(200).json(book);
        } catch (err) {
            if (err.message.includes("Cast to ObjectId failed for value"))
                return res.status(404).json({ message: "Invalid ID length" });
            return res.status(500).json({ message: err.message });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const book = new Books({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            year: req.body.year,
            rating: req.body.rating
        });
        const savedBook = await book.save();
        res.status(200).json(savedBook);
    } catch (err) {
        if (err.message.includes("Books validation failed:"))
            return res.status(404).json({ message: "New book doesn't contain all details" });
        return res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (await Books.findById(req.params.id) == null) return res.status(404).json({ message: "Book not found" });
        await Books.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        if (err.message.includes("Cast to ObjectId failed for value"))
            return res.status(404).json({ message: "Invalid ID length" });
        return res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (await Books.findById(req.params.id) == null) return res.status(404).json({ message: "Book not found" });
        await Books.updateOne(
            { _id: req.params.id },
            { $set: { title: req.body.title } },
            { $set: { author: req.body.author } },
            { $set: { genre: req.body.genre } },
            { $set: { year: req.body.year } },
            { $set: { rating: req.body.rating } }
        );
        const book = await Books.findById(req.params.id);
        res.status(200).json(book);
    } catch (err) {
        if (err.message.includes("Cast to ObjectId failed for value"))
            return res.status(404).json({ message: "Invalid ID length" });
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;