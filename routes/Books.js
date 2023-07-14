const express = require('express');
const router = express.Router();
const Books = require('../models/Books');

router.get('/', async (req, res) => {
    try {
        const books = await Books.find();
        res.json(books);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await Books.findById(req.params.id);
        res.json(book);
    } catch (err) {
        res.json({ message: err });
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
        res.json(savedBook);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const removedBook = await Books.remove({ _id: req.params.id });
        res.json(removedBook);
    } catch (err) {
        res.json({ message: err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Books.updateOne(
            { _id: req.params.id },
            { $set: { title: req.body.title } },
            { $set: { author: req.body.author } },
            { $set: { genre: req.body.genre } },
            { $set: { year: req.body.year } },
            { $set: { rating: req.body.rating } }
        );
        res.json(updatedBook);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;