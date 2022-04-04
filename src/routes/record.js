const express = require('express');
const Joi = require('joi');


const recordModel = require('../models/record');

const createRequestSchema = Joi.object({
  activityName: Joi.string().required(),
  timestamp: Joi.string().required(),
  duration: Joi.number().min(0).required(),
  calories: Joi.number().min(0).required(),
  description: Joi.string().allow('').required(),
});

const updateRequestSchema = Joi.object({
  activityName: Joi.string(),
  timestamp: Joi.string(),
  duration: Joi.number().min(0),
  calories: Joi.number().min(0),
  description: Joi.string().allow(''),
});

const router = express.Router();

router.use('/:recordId', async (req, res, next) => {
  const foundRecord = await RecordModel.findById(req.params.recordId);
  if (!foundRecord) {
    return res.status(404).send('Record not found');
  }
    router.get('/:recordId', (req, res, next) => {
    return res.send(req.record);
    });
});


router.get('/:recordId', (req, res, next) => {
  return res.send(req.record);
});

router.get('/', async(req, res, next) => {
  const records = await RecordModel.find({});
  res.send(records);
});

router.post('/', (req, res, next) => {
  const body = req.body;

  const newRecord = new RecordModel(body);

  const errors = newRecord.validateSync();
  if (errors) {
    const errorFieldNames = Object.keys(errors.errors);
    if (errorFieldNames.length > 0) {
      return res.status(400).send(errors.errors[errorFieldNames[0]].message);
    }
  }
  // validate
  const validateResult = createRequestSchema.validate(body);
  if (validateResult.error) {
    // failed validation
    return res.status(400).send('Invalid request');
  }
  await newRecord.save();
  return res.status(201).send(newRecord);
});


router.put('/:recordId', (req, res, next) => {
  const body = req.body;

  // validate
  const validateResult = updateRequestSchema.validate(body);
  if (validateResult.error) {
    // failed validation
    return res.status(400).send('Invalid request');
  }

  const updatedRecord = {
    ...req.record,
    ...body,
  };
  records[req.recordIndex] = updatedRecord;
  return res.status(201).send(updatedRecord);
});

// router.delete('/:recordId', (req, res, next) => {
//   records.splice(req.recordIndex, 1);
//   return res.status(204).send(); // 204 = No content which mean it successfully removed
// });

router.delete('/:recordId', async (req, res, next) => {
  await RecordModel.deleteOne({ _id: req.params.recordId });
  return res.status(204).send(); // 204 = No content which mean it successfully removed
});

module.exports = router;
