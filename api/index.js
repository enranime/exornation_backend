const express = require('express');
const userRouter = require('../routes/user');
const bodyParser = require('body-parser');
const config = require('../config')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4001;
const mongoose = require('mongoose');

/*
When running on Vercel, Vercel will take express "app" exported from this file.
We do not have control over port and things that should be run before the app.listen()
eg. mongoose.connect(). So we should connect to mongodb before every request by adding middleware below
to ensure database is connected before our code trying to query the it.

Note: Create new connection to database before every request is not a good practice and can cause issues for some database.
 */

console.log('connect to vercel');

if (config.isVercel) {
  app.use(async (req, res, next) => {
    await mongoose.connect(config.mongoUri, config.mongoOptions);
    return next();
  });
}


app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
  }));

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(bodyParser.json());

app.get("/",(req,res,next) => {
  res.status(200).send("Hello World")
});


app.use('/users',userRouter);

module.exports = app;