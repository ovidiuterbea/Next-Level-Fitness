const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const nodeMailer = require("nodemailer");

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

  const email = req.body.email;

  let existingHiringRequest;
  try {
    existingHiringRequest = await Hiring.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Create hiring request failed, please try again later.",
      500
    );
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
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    image: req.file.path,
    password: null,
    address: req.body.address,
    birthdate: req.body.birthdate,
    experience: req.body.experience,
    description: req.body.description,
    phone: req.body.phone,
  });

  try {
    await createdHiringRequest.save();
  } catch (err) {
    const error = new HttpError(
      "Creating hiring request failed, please try again.",
      500
    );
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

  var transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "licentaovidiu@gmail.com",
      pass: "nhlpivlxncgmtfpu",
    },
  });

  var mailOptions = {
    from: "licentaovidiu@gmail.com",
    to: hiringRequest.email,
    subject: "Detalii cerere angajare",
    text: `Din pacate profilul tau nu ne-a surprins. Iti uram succes in cariera ta fiindca arati mult potential!`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.status(200).json({ message: "Deleted the hiring request." });
};

exports.createHiringRequest = createHiringRequest;
exports.getHiringRequests = getHiringRequests;
exports.getHiringRequestById = getHiringRequestById;
exports.deleteHiringRequest = deleteHiringRequest;
