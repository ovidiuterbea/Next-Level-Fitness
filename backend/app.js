const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const clientsRoutes = require("./routes/client-routes");
const hiringRoutes = require("./routes/hiring-routes");
const trainerRoutes = require("./routes/trainer-routes");
const classesRoutes = require("./routes/classes-routes");
const HttpError = require("./models/http-error");

const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/clients", clientsRoutes);

app.use("/api/hiring", hiringRoutes);

app.use("/api/trainers", trainerRoutes);

app.use("/api/classes", classesRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://ovidiuterb:licenta@licenta.eqdsd.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8080);
    console.log("Connected to the gym database.");
  })
  .catch((err) => {
    console.log(err);
    console.log("Couldn't connect to the gym database.");
  });
