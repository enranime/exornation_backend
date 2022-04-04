const mongoose = require('mongoose');


const run = async() => {
    const uri = 'mongodb+srv://m001-student:m001@cluster0.h0fhf.mongodb.net/sample_training?retryWrites=true&w=majority'
   await mongoose.connect(uri);

  const userSchema = new mongoose.Schema({})
  const User = mongoose.model('User', userSchema, 'zips');
  const result = await User.find({})

  console.log(result);
}

run();