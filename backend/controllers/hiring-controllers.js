const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Hiring = require("../models/hiring-request");

// MERGE
const createHiringRequest = async (req, res, next) => {
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
    address,
    birthdate,
    image,
    experience,
    password,
    description,
  } = req.body;

  let existingHiringRequest;
  try {
    existingHiringRequest = await Hiring.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Create hiring request failed, please try again later.",
      500
    );
    console.log(err);
    return next(error);
  }

  if (existingHiringRequest) {
    const error = new HttpError(
      "Hiring request exists already, please wait for the admin to confirm/ deny your request.",
      422
    );
    return next(error);
  }

  const createdHiringRequest = new Hiring({
    name,
    surname,
    email,
    image: "https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg",
    password,
    address,
    birthdate,
    experience,
    description,
  });

  try {
    await createdHiringRequest.save();
  } catch (err) {
    const error = new HttpError(
      "Creating hiring request failed, please try again.",
      500
    );
    console.log(err);
    return next(error);
  }

  res
    .status(201)
    .json({ hiring: createdHiringRequest.toObject({ getters: true }) });
};

// MERGE
const getHiringRequests = async (req, res, next) => {
  let hiringRequests;
  try {
    hiringRequests = await Hiring.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching hiring requests failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    hirings: hiringRequests.map((hiring) => hiring.toObject({ getters: true })),
  });
};

// MERGE
const getHiringRequestById = async (req, res, next) => {
  const hiringId = req.params.hiringid;

  let hiringRequest;
  try {
    hiringRequest = await Hiring.findById(hiringId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find such a hiring request.",
      500
    );
    return next(error);
  }

  if (!hiringRequest) {
    const error = new HttpError(
      "Could not find a hiring request for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ hiringRequest: hiringRequest.toObject({ getters: true }) });
};

// MERGE
const deleteHiringRequest = async (req, res, next) => {
  const hiringId = req.params.hiringid;

  let hiringRequest;
  try {
    hiringRequest = await Hiring.findById(hiringId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the hiring request.",
      500
    );
    return next(error);
  }

  if (!hiringRequest) {
    const error = new HttpError(
      "Could not find a hiring request for this id.",
      404
    );
    return next(error);
  }

  try {
    await hiringRequest.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the hiring request.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted the hiring request." });
};

exports.createHiringRequest = createHiringRequest;
exports.getHiringRequests = getHiringRequests;
exports.getHiringRequestById = getHiringRequestById;
exports.deleteHiringRequest = deleteHiringRequest;
