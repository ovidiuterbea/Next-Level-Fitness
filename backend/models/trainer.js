const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trainerSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  address: { type: String, required: true },
  birthdate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  experience: { type: String, required: true },
  classes: [{ type: mongoose.Types.ObjectId, required: false, ref: "Class" }],
  clients: [{ type: mongoose.Types.ObjectId, required: false, ref: "Client" }],
});

module.exports = mongoose.model("Trainer", trainerSchema);
