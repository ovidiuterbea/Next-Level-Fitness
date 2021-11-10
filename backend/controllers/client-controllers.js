const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Client = require("../models/client");
const Trainer = require("../models/trainer");
const Class = require("../models/gym-class");

const getClients = async (req, res, next) => {
  let clients;
  try {
    clients = await Client.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    clients: clients.map((client) => client.toObject({ getters: true })),
  });
}; // FULLY DONE

const getClientById = async (req, res, next) => {
  const clientId = req.params.clientid;

  let client;
  try {
    client = await Client.findById(clientId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a client.",
      500
    );
    return next(error);
  }

  if (!client) {
    const error = new HttpError(
      "Could not find a client for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ client: client.toObject({ getters: true }) });
}; // FULLY DONE

//signup client
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, surname, email, password, birthdate, address } = req.body;

  let existingClient;
  try {
    existingClient = await Client.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingClient) {
    const error = new HttpError(
      "Client exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdClient = new Client({
    name,
    surname,
    email,
    image: "https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg",
    password,
    birthdate,
    address,
  });

  try {
    await createdClient.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    console.log(err);
    return next(error);
  }

  res.status(201).json({ client: createdClient.toObject({ getters: true }) });
}; // FULLY DONE

//login client
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingClient;

  try {
    existingClient = await Client.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Couldn't find this email address!", 500);
    console.log(err);
    return next(error);
  }

  if (!existingClient || existingClient.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  res.json({ message: "Logged in!" });
}; // FULLY DONE

//create subscription
const createSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const clientId = req.params.clientid;

  let client;
  try {
    client = await Client.findById(clientId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create subscription",
      500
    );
    return next(error);
  }

  client.subscription = subscription;

  try {
    await client.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create the subscription.",
      500
    );
    return next(error);
  }

  res.status(200).json({ client: client.toObject({ getters: true }) });
}; //FULLY DONE

const deleteSubscription = async (req, res, next) => {
  const clientId = req.params.clientid;

  let client;
  try {
    client = await Client.findById(clientId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create subscription",
      500
    );
    return next(error);
  }

  client.subscription = "";

  try {
    await client.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create the subscription.",
      500
    );
    return next(error);
  }

  res.status(200).json({ client: client.toObject({ getters: true }) });
}; // FULLY DONE

const givePersonalTrainerByClientId = async (req, res, next) => {
  const clientId = req.params.clientid;
  const trainerId = req.params.trainerid;

  let client;
  try {
    client = await Client.findById(clientId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create subscription",
      500
    );
    return next(error);
  }

  let trainer;
  try {
    trainer = await Trainer.findById(trainerId);
  } catch (err) {
    const error = new HttpError(
      "Getting trainers for you failed, please try again",
      500
    );
    return next(error);
  }

  if (!trainer) {
    const error = new HttpError("Could not find trainer for provided id", 404);
    return next(error);
  }

  if (client.personalTrainer.length === 0) {
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await client.personalTrainer.push(trainer);
      await client.save({ session: sess });
      await trainer.clients.push(client);
      await trainer.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not give personal trainer to the client.",
        500
      );
      return next(error);
    }
  } else {
    const error = new HttpError(
      "This client already has a personal trainer!",
      500
    );
    return next(error);
  }

  res.status(200).json({ client: client.toObject({ getters: true }) });
}; // DONE TESTED

const deleteTrainerByClientId = async (req, res, next) => {
  const clientId = req.params.clientid;
  const trainerId = req.params.trainerid;

  let client;
  try {
    client = await Client.findById(clientId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the client.",
      500
    );
    return next(error);
  }

  if (!client) {
    const error = new HttpError("Could not find client for provided id", 404);
    return next(error);
  }

  let trainer;
  try {
    trainer = await Trainer.findById(trainerId);
  } catch (err) {
    const error = new HttpError(
      "Getting trainers for you failed, please try again",
      500
    );
    return next(error);
  }

  if (!trainer) {
    const error = new HttpError("Could not find trainer for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await client.personalTrainer.pull(client.personalTrainer[0]);
    await client.save({ session: sess });
    await trainer.clients.pull(client);
    await trainer.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not remove the personal trainer.",
      500
    );
    return next(error);
  }

  res.status(200).json({ client: client.toObject({ getters: true }) });
}; // DONE TESTED

const giveClassByClientId = async (req, res, next) => {
  const clientId = req.params.clientid;
  const classId = req.params.classid;

  let client;
  try {
    client = await Client.findById(clientId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create subscription",
      500
    );
    return next(error);
  }

  let gymClass;
  try {
    gymClass = await Class.findById(classId);
  } catch (err) {
    const error = new HttpError(
      "Getting class for you failed, please try again",
      500
    );
    return next(error);
  }

  if (!gymClass) {
    const error = new HttpError("Could not find class for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await client.classes.push(gymClass);
    await client.save({ session: sess });
    await gymClass.clients.push(client);
    await gymClass.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not give gym class to the client.",
      500
    );
    return next(error);
  }

  res.status(200).json({ client: client.toObject({ getters: true }) });
}; // DONE TESTED

const deleteClassByClientId = async (req, res, next) => {
  const clientId = req.params.clientid;
  const classId = req.params.classid;

  let client;
  try {
    client = await Client.findById(clientId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the client.",
      500
    );
    return next(error);
  }

  if (!client) {
    const error = new HttpError("Could not find client for provided id", 404);
    return next(error);
  }

  let gymClass;
  try {
    gymClass = await Class.findById(classId);
  } catch (err) {
    const error = new HttpError(
      "Getting class for you failed, please try again",
      500
    );
    return next(error);
  }

  if (!gymClass) {
    const error = new HttpError("Could not find class for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await client.classes.pull(gymClass);
    await client.save({ session: sess });
    await gymClass.clients.pull(client);
    await gymClass.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not remove the class.",
      500
    );
    return next(error);
  }

  res.status(200).json({ client: client.toObject({ getters: true }) });
};

exports.signup = signup;
exports.login = login;
exports.getClients = getClients;
exports.createSubscription = createSubscription;
exports.deleteSubscription = deleteSubscription;
exports.getClientById = getClientById;
exports.givePersonalTrainerByClientId = givePersonalTrainerByClientId;
exports.deleteTrainerByClientId = deleteTrainerByClientId;
exports.giveClassByClientId = giveClassByClientId;
exports.deleteClassByClientId = deleteClassByClientId;
