
const mongoose = require('mongoose');
const config = require('./config');
const app = require('./api/index');




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