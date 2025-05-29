require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const BrainBox = require('./models/brainModel');
const cardsRouter = require('./routes/cards.routes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const PORT = process.env.PORT || 3000;



// Serve os arquivos estáticos do frontend


Urlmongo = process.env.MONGODB_URI
const app = express();

app.use(express.static(path.join(__dirname, 'frontend')));


//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Routes
app.get('/favicon.ico', (req, res) => res.status(204));
app.use("/api/braincards", cardsRouter);
app.use('/api/users', userRoutes);

app.get('/login', (req, res) => {
    // res.sendFile(path.resolve('frontend/loginCadastro/index.html'));
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));

})

app.get('/TelaPrincipal', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});






// Connect to MongoDB and start the server

mongoose.connect(Urlmongo)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

