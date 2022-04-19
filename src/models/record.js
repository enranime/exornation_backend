const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  activityName: { type: String, minlength: [3, 'Activity name should contains at least 3 char'] },
  activityDate: { type: String },
  activityDuration: { type: Number, min: [0, 'Duration must be at least 0'] },
  activityType: {type: String},
  activityDescription: { type: String, minlength: [3,'Description should contains at least 3 char'] },
});

const RecordModel = mongoose.model('Record', recordSchema, 'records');

module.exports = RecordModel;