const express = require("express");

const hiringController = require("../controllers/hiring-controllers");

const router = express.Router();

router.get("/", hiringController.getHiringRequests);

router.post("/", hiringController.createHiringRequest);

router.get("/:hiringid", hiringController.getHiringRequestById);

router.delete("/:hiringid", hiringController.deleteHiringRequest);

module.exports = router;
