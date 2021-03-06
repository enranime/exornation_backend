const express = require('express');
const Joi = require('joi');


const RecordModel = require('../models/record');

const createRequestSchema = Joi.object({
  activityName: Joi.string().required(),
  timestamp: Joi.date().required(),
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
     req.record = foundRecord;
     next();
});


router.get('/:recordId', (req, res, next) => {
  return res.status(200).send(req.record);
});

router.get('/', async(req, res, next) => {
  const records = await RecordModel.find({});
  res.send(records);
});

router.post('/',async (req, res, next) => {
 
  const body = req.body;
  console.log(body);
  const newRecord = new RecordModel(body);

  // const errors = newRecord.validateSync();
  // if (errors) {
  //   const errorFieldNames = Object.keys(errors.errors);
  //   if (errorFieldNames.length > 0) {
  //     return res.status(400).send(errors.errors[errorFieldNames[0]].message);
  //   }
  // }
  // // validate
  // const validateResult = createRequestSchema.validate(body);
  // if (validateResult.error) {
  //   // failed validation
  //   return res.status(400).send('Invalid request validation failed');
  // }

  await newRecord.save();
  return res.status(201).send(newRecord);
});


router.put('/:recordId', async (req, res, next) => {
  const body1 = req.body;
  console.log(body1);
  const body = req.record
  console.log(body);
  // // validate
  // const validateResult = updateRequestSchema.validate(body);
  // if (validateResult.error) {
  //   // failed validation
  //   return res.status(400).send('Invalid request');
  // }
  // const updatedRecord = {
  //   ...req.record,
  //   ...recordExampleUpdate
  // }


  body.activityName = body1.activityName;
  body.activityType = body1.activityType;
  body.activityDuration = body1.activityDuration;
  body.activityDate = body1.activityDate;
  body.activityDescription = body1.activityDescription;


  await body.save();  
  
  return res.status(201).send(body);
});


router.delete('/:recordId', async (req, res, next) => {
  await RecordModel.deleteOne({ _id: req.params.recordId });
  return res.status(204).send(); // 204 = No content which mean it successfully removed
  
});

module.exports = router;
