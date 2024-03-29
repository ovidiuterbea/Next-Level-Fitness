const express = require("express");

const clientController = require("../controllers/client-controllers");

const router = express.Router();

router.get("/", clientController.getClients);

router.get("/:clientid", clientController.getClientById);

router.get("/trainer/:trainerid", clientController.getClientsByTrainerId);

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

router.patch("/:clientid/class", clientController.giveClassByClientId);

router.patch("/:clientid/classDel", clientController.deleteClassByClientId);

router.patch("/:clientid/payment", clientController.deletePayment);

module.exports = router;
