const express = require("express");
const { check } = require("express-validator");

const hiringController = require("../controllers/hiring-controllers");

const router = express.Router();

router.get("/", hiringController.getHiringRequests);

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("surname").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("address").not().isEmpty(),
    check("birthdate").isDate(),
    check("experience").not().isEmpty(),
  ],
  hiringController.createHiringRequest
);

router.get("/:hiringid", hiringController.getHiringRequestById);

router.delete("/:hiringid", hiringController.deleteHiringRequest);

module.exports = router;
