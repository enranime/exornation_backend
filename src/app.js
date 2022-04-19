const express = require('express');
const userRouter = require('./routes/user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const app = express();

app.use(cors({
    credentials: true,
  }));

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/users',userRouter)

const boot = async () => {
    // connect to mongodb
    await mongoose.connect(config.mongoUri, config.mongoOptions
        ).then(
            console.log('connect to mongodb')
        );
    // start express server 
    app.listen(4000, () => {
        console.log('Server is running');
    });
};

boot();