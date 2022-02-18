const express = require("express");

const classesControllers = require("../controllers/class-controllers");

const router = express.Router();

router.get("/", classesControllers.getClasses);

router.get("/:classid", classesControllers.getClassById);

router.get("/trainer/:trainerid", classesControllers.getClassesByTrainerId);

router.post("/", classesControllers.createClass);

router.delete("/:classid", classesControllers.deleteClass);

module.exports = router;
