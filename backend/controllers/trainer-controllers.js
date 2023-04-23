const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const nodeMailer = require("nodemailer");

const HttpError = require("../models/http-error");
const Trainer = require("../models/trainer");
const Client = require("../models/client");

//MERGE
const getTrainers = async (req, res, next) => {
  let trainers;
  try {
    trainers = await Trainer.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching trainers failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    trainers: trainers.map((trainer) => trainer.toObject({ getters: true })),
  });
};

// MERGE
const createTrainer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const {
    name,
    surname,
    email,
    password,
    address,
    birthdate,
    image,
    experience,
  } = req.body;

  let existingTrainer;
  try {
    existingTrainer = await Trainer.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Creating Trainer account failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingTrainer) {
    const error = new HttpError(
      "Trainer exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdTrainer = new Trainer({
    name,
    surname,
    email,
    image: "https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg",
    password,
    address,
    birthdate,
    experience,
    image,
  });

  try {
    await createdTrainer.save();
  } catch (err) {
    const error = new HttpError(
      "Creating trainer failed, please try again.",
      500
    );
    return next(error);
  }

  var transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "licentaovidiu@gmail.com",
      pass: "nhlpivlxncgmtfpu",
    },
  });

  var mailOptions = {
    from: "nextlevelfitness9000@gmail.com",
    to: email,
    subject: "Ati fost acceptat ca antrenor!",
    text: `Va puteti conecta la contul tau de antrenor folosind email-ul cererii de angajare cu parola ${password}.`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.status(201).json({ trainer: createdTrainer.toObject({ getters: true }) });
};

// MERGE
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingTrainer;

  try {
    existingTrainer = await Trainer.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingTrainer || existingTrainer.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  res.json({ trainerId: existingTrainer.id });
};

// MERGE
const getTrainerById = async (req, res, next) => {
  const trainerId = req.params.trainerid;

  let trainer;
  try {
    trainer = await Trainer.findById(trainerId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a trainer.",
      500
    );
    return next(error);
  }

  if (!trainer) {
    const error = new HttpError(
      "Could not find a trainer for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ trainer: trainer.toObject({ getters: true }) });
};

// MERGE
const deleteTrainer = async (req, res, next) => {
  const trainerId = req.params.trainerid;

  let trainer;
  try {
    trainer = await Trainer.findById(trainerId)
      .populate("classes")
      .populate("clients");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the trainer.",
      500
    );
    return next(error);
  }

  if (!trainer) {
    const error = new HttpError("Could not find a trainer for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await trainer.remove({ session: sess });
    for (let gymClass of trainer.classes) {
      gymClass.trainer = null;
      await gymClass.save({ session: sess });
    }
    for (let client of trainer.clients) {
      await client.personalTrainer.pull(trainer);
      await client.save({ session: sess });
    }
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the trainer.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted the trainer." });
};

// MERGE
const getTrainerByClientId = async (req, res, next) => {
  const clientId = req.params.clientid;

  let clientWithTrainer;
  try {
    clientWithTrainer = await Client.findById(clientId).populate(
      "personalTrainer"
    );
  } catch (err) {
    const error = new HttpError(
      "Fetching clients failed, please try again later",
      500
    );
    return next(error);
  }

  if (!clientWithTrainer || clientWithTrainer.personalTrainer.length === 0) {
    return next(
      new HttpError("Could not find trainer for the provided client id.", 404)
    );
  }

  res.json({
    personalTrainer: clientWithTrainer.personalTrainer.toObject({
      getters: true,
    }),
  });
};

exports.getTrainers = getTrainers;
exports.createTrainer = createTrainer;
exports.login = login;
exports.getTrainerById = getTrainerById;
exports.deleteTrainer = deleteTrainer;
exports.getTrainerByClientId = getTrainerByClientId;
