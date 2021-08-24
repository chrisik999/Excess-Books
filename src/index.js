const express = require('express');
const config = require('./config/config');
const database = require('./database/dbSetup');
const Book = require('./models/book');
const bookRoutes = require('./routes/bookRoute');
const authRoutes = require('./routes/authRoute');
const {seedAdmin} = require('./seeders/admin');

database();

// console.log (seedAdmin());

const port = config.port;

const app = express();

app.use(express.json());

//Require Route
app.use(bookRoutes);
app.use(authRoutes);

app.listen(port, () =>{
    console.log('server created on port '+port);
})