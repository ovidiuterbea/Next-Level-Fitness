const express = require("express");
const { check } = require("express-validator");

const trainerController = require("../controllers/trainer-controllers");

const router = express.Router();

router.get("/", trainerController.getTrainers);

router.get("/:trainerid", trainerController.getTrainerById);

router.get("/client/:clientid", trainerController.getTrainerByClientId);

router.post("/create", trainerController.createTrainer);

router.post("/login", trainerController.login);

router.delete("/:trainerid", trainerController.deleteTrainer);

module.exports = router;
