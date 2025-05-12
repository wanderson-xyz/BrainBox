const express = require('express');
const mongoose = require('mongoose');
const BrainBox = require('./models/brainModel');
const cardsRouter = require('./routes/cards.routes');
const path = require('path');
const { deleteCard, updateCard, createCard, getCardById, getCards } = require('./controllers/card.controllers');
// Serve os arquivos estáticos do frontend

require('dotenv').config();
Urlmongo = process.env.MONGODB_URI;
const app = express();


//middleware
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/favicon.ico', (req, res) => res.status(204));
app.use("/api/braincards", cardsRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
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

