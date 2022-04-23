const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Client = require("../models/client");
const Trainer = require("../models/trainer");
const Class = require("../models/gym-class");

// MERGE
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

// MERGE
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

// MERGE
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
    mustPay: false,
    subscription: null,
    personalTrainer: null,
  });

  try {
    await createdClient.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({
    client: createdClient.toObject({ getters: true }),
    clientId: createdClient.id,
  });
}; // FULLY DONE

// MERGE
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingClient;

  try {
    existingClient = await Client.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Couldn't find this email address!", 500);
    return next(error);
  }

  if (!existingClient || existingClient.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  res.json({
    clientId: existingClient.id,
    subscription: existingClient.subscription,
  });
}; // FULLY DONE

// MERGE
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
  client.mustPay = true;

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

// MERGE
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

  client.subscription = null;

  try {
    await client.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create the subscription.",
      500
    );
    return next(error);
  }

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

  for (let gymClass of classes) {
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await gymClass.clients.pull(client);
      await gymClass.save({ session: sess });
      await client.classes.pull(gymClass);
      await client.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not remove the client from the classes.",
        500
      );
      return next(error);
    }
  }

  if (client.personalTrainer !== null) {
    let trainer;
    try {
      trainer = await Trainer.findById(client.personalTrainer);
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

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await trainer.clients.pull(client);
      await trainer.save({ session: sess });
      client.personalTrainer = null;
      await client.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not remove the client from the trainer.",
        500
      );
      return next(error);
    }
  }

  res.status(200).json({ client: client.toObject({ getters: true }) });
}; // FULLY DONE

// MERGE
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

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    client.personalTrainer = trainer.id;
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

  res.status(200).json({ client: client.toObject({ getters: true }) });
}; // DONE TESTED

// MERGE
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
    client.personalTrainer = null;
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

// MERGE
const giveClassByClientId = async (req, res, next) => {
  const clientId = req.params.clientid;
  // const classId = req.params.classid;
  const { classId } = req.body;

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

  if (gymClass.clients.length > 15) {
    const error = new HttpError(
      "Too many people in this fitness class, try another time.",
      404
    );
    return next(error);
  }

  if (gymClass.clients.includes(client.id)) {
    const error = new HttpError("You are already asigned to this class.", 404);
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

// MERGE
const deleteClassByClientId = async (req, res, next) => {
  const clientId = req.params.clientid;
  // const classId = req.params.classid;
  const { classId } = req.body;

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

  if (!gymClass.clients.includes(client.id)) {
    const error = new HttpError("You are not asigned to this class.", 404);
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

const deletePayment = async (req, res, next) => {
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

  client.mustPay = false;

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
};

const getClientsByTrainerId = async (req, res, next) => {
  const trainerId = req.params.trainerid;

  let trainerWithClients;
  try {
    trainerWithClients = await Trainer.findById(trainerId).populate("clients");
  } catch (err) {
    const error = new HttpError(
      "Fetching classes failed, please try again later",
      500
    );
    return next(error);
  }

  res.json({
    clients: trainerWithClients.clients.map((client) =>
      client.toObject({ getters: true })
    ),
  });
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
exports.deletePayment = deletePayment;
exports.getClientsByTrainerId = getClientsByTrainerId;
