const express = require('express');
const userRouter = require('./routes/user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
  }));

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/users',userRouter);

module.exports =app;