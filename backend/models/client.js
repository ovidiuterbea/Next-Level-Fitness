const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  birthdate: { type: Date, required: true },
  address: { type: String, required: true },
  subscription: { type: String, required: false },
  subscriptionDate: { type: Date, required: false },
  mustPay: { type: Boolean, required: false },
  personalTrainer: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "Trainer",
  },

  classes: [{ type: mongoose.Types.ObjectId, required: false, ref: "Class" }],
});

module.exports = mongoose.model("Client", clientSchema);
