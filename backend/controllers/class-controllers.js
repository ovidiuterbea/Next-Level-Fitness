const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Class = require("../models/gym-class");
const Trainer = require("../models/trainer");
const Client = require("../models/client");
const mongoose = require("mongoose");
const moment = require("moment");

// MERGE
const getClasses = async (req, res, next) => {
  let classes;
  try {
    classes = await Class.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching classes failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    classes: classes.map((gymClass) => gymClass.toObject({ getters: true })),
  });
}; // FULLY DONE

// MERGE
const createClass = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, difficultyLevel, startDate, endDate, trainer } = req.body;

  let now = moment();

  if (startDate < now || startDate > endDate) {
    const error = new HttpError("Invalid date, please try again.", 404);
    return next(error);
  }

  const sDate = new Date(startDate);
  const eDate = new Date(endDate);

  const hours = Math.abs(eDate - sDate) / 36e5;

  if (hours > 2) {
    const error = new HttpError("Duration too long!", 404);
    return next(error);
  }

  const gymClass = new Class({
    title,
    difficultyLevel,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    trainer,
  });

  let searchedTrainer;
  try {
    searchedTrainer = await Trainer.findById(trainer);
  } catch (err) {
    const error = new HttpError(
      "Getting trainer for you failed, please try again",
      500
    );
    return next(error);
  }

  if (!searchedTrainer) {
    const error = new HttpError("Could not find trainer for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await gymClass.save({ session: sess });
    await searchedTrainer.classes.push(gymClass);
    await searchedTrainer.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating gym class failed, please try again.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json({
    class: gymClass.toObject({ getters: true }),
    hours: hours,
  });
};

// MERGE
const getClassById = async (req, res, next) => {
  const classId = req.params.classid;

  let gymClass;
  try {
    gymClass = await Class.findById(classId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a class.",
      500
    );
    return next(error);
  }

  if (!gymClass) {
    const error = new HttpError(
      "Could not find a class for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ class: gymClass.toObject({ getters: true }) });
}; // FULLY DONE

// MERGE
const getClassesByTrainerId = async (req, res, next) => {
  const trainerId = req.params.trainerid;

  let trainerWithClasses;
  try {
    trainerWithClasses = await Trainer.findById(trainerId).populate("classes");
  } catch (err) {
    const error = new HttpError(
      "Fetching classes failed, please try again later",
      500
    );
    return next(error);
  }

  if (!trainerWithClasses || trainerWithClasses.classes.length === 0) {
    return next(
      new HttpError("Could not find classes for the provided trainer id.", 404)
    );
  }

  res.json({
    classes: trainerWithClasses.classes.map((gymClass) =>
      gymClass.toObject({ getters: true })
    ),
  });
};

// MERGE
const getClassesByClientId = async (req, res, next) => {
  const clientId = req.params.clientid;

  let clientWithClasses;
  try {
    clientWithClasses = await Client.findById(clientId).populate("classes");
  } catch (err) {
    const error = new HttpError(
      "Fetching classes failed, please try again later",
      500
    );
    return next(error);
  }

  res.json({
    classes: clientWithClasses.classes.map((gymClass) =>
      gymClass.toObject({ getters: true })
    ),
  });
};

// MERGE
const deleteClass = async (req, res, next) => {
  const classId = req.params.classid;

  let gymClass;
  try {
    gymClass = await Class.findById(classId)
      .populate("trainer")
      .populate("clients");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the class.",
      500
    );
    return next(error);
  }

  if (!gymClass) {
    const error = new HttpError("Could not find class for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await gymClass.remove({ session: sess });
    await gymClass.trainer.classes.pull(gymClass);
    await gymClass.trainer.save({ session: sess });
    for (let client of gymClass.clients) {
      await client.classes.pull(gymClass);
      await client.save({ session: sess });
    }
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not delete the class.",
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: "Deleted class.",
    clients: gymClass.clients.map((client) =>
      client.toObject({ getters: true })
    ),
  });
};

exports.createClass = createClass;
exports.getClasses = getClasses;
exports.getClassById = getClassById;
exports.getClassesByClientId = getClassesByClientId;
exports.getClassesByTrainerId = getClassesByTrainerId;
exports.deleteClass = deleteClass;
