const express = require('express');
const mongoose = require('mongoose');
const BrainBox = require('./models/brainModel');
const cardsRouter = require('./routes/cards.routes');
const { deleteCard, updateCard, createCard, getCardById, getCards } = require('./controllers/card.controllers');
require('dotenv').config();
Urlmongo = process.env.MONGODB_URI;
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/braincards", cardsRouter);

app.get('/', (req, res) => {
    res.send('hello, world');
})
app.get("/:id", getCardById)
app.get("/", getCards)
app.post("/", createCard)
app.put("/:id", updateCard)
app.delete("/:id", deleteCard)





// Connect to MongoDB and start the server

mongoose.connect(Urlmongo)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

