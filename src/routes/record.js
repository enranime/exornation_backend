const express = require('express');
const Joi = require('joi');

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

const records = [
  {
    _id: 'record-1',
    activityName: 'Running',
    timestamp: new Date(),
    duration: 4000,
    calories: 200,
    description: '',
  },
  {
    _id: 'record-2',
    activityName: 'Running',
    timestamp: new Date(),
    duration: 4000,
    calories: 200,
    description: '',
  },
  {
    _id: 'record-3',
    activityName: 'Running',
    timestamp: new Date(),
    duration: 4000,
    calories: 200,
    description: '',
  },
];

router.use('/:recordId', (req, res, next) => {
  const index = records.findIndex((r) => r._id === req.params.recordId);
  const foundRecord = records[index];
  if (!foundRecord) {
    return res.status(404).send('Record not found');
  }
  req.record = foundRecord;
  req.recordIndex = index;
  return next();
});

router.get('/:recordId', (req, res, next) => {
  return res.send(req.record);
});
router.get('/', (req, res, next) => {
  res.send(records);
});
router.post('/', (req, res, next) => {
  const body = req.body;

  // validate
  const validateResult = createRequestSchema.validate(body);
  if (validateResult.error) {
    // failed validation
    return res.status(400).send('Invalid request');
  }

  const newRecord = {
    _id: Math.floor(Math.random() * 100000).toString(),
    ...body,
  };
  records.push(newRecord);
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

router.delete('/:recordId', (req, res, next) => {
  records.splice(req.recordIndex, 1);
  return res.status(204).send(); // 204 = No content which mean it successfully removed
});

module.exports = router;
