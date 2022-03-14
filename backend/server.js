// EXTERNAL DEPENDENIES
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const cors = require('cors');

// IMPORTS
const usersRouter = require('./routes/users.js');

// VARIABLES

const port = process.env.PORT || 8080;
const app =express();

// CONNECT TO DB

mongoose
    .connect('mongodb://localhost:27017/loginAndRegistration')
    .then(() =>
    {
        console.log('connected to db');
    })
    .catch(err => {console.log('db not connected', err.message);});

// REQUEST PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// STATIC FILES

// ROUTES
app.use('/users', usersRouter);

/** ERROR HANDLING */
app.use((req, res, next) => 
{
    const error = new Error('Looks like something broke...');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => 
{
    res.status(err.status || 500).send({ error:{ message: err.message, t: 'hamid' } });
});
//  LISTENER 
app.listen(port, () =>
{
    console.log(`server is listenig on ${port} ..`);
});
