// const express = require("express");
// const app = express();
// const product = require("./api/product");

// app.use(express.json({extend: false}));

// app.use("/api/product", product);

// app.get("/",(req,res,next) => {
//     res.status(200).send("Hello World")
// });

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));


const mongoose = require('mongoose');
const config = require('./config');
const app = require('./api/index');
const product = require("./api/product");



app.use(express.json({extend: false}));

app.use("/api/product", product);

app.get("/",(req,res,next) => {
    res.status(200).send("Hello World")
});


const boot = async () => {
    // connect to mongodb
    await mongoose.connect(config.mongoUri, config.mongoOptions
        ).then(
            console.log('connect to mongodb')
        );
    // start express server 
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
};

boot();