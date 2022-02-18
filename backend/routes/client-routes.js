const express = require("express");

const clientController = require("../controllers/client-controllers");

const router = express.Router();

router.get("/", clientController.getClients);

router.get("/:clientid", clientController.getClientById);

router.post("/signup", clientController.signup);

router.post("/login", clientController.login);

router.patch("/subscription/:clientid", clientController.createSubscription);

router.patch("/subscriptiondel/:clientid", clientController.deleteSubscription);

router.patch(
  "/:clientid/trainer/:trainerid",
  clientController.givePersonalTrainerByClientId
);

router.patch(
  "/:clientid/trainerDel/:trainerid",
  clientController.deleteTrainerByClientId
);

router.patch("/:clientid/class/:classid", clientController.giveClassByClientId);

router.patch(
  "/:clientid/classDel/:classid",
  clientController.deleteClassByClientId
);

module.exports = router;
