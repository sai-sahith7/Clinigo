const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

const BooksRoute = require('./routes/Books');
app.use('/books', BooksRoute);

app.get('/', (req, res) => {
    res.send('API is up and running !!');
});

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to DB")).catch(err => console.log(err));

app.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT));