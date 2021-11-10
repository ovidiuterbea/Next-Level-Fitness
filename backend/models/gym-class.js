const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: { type: String, required: true },
  difficultyLevel: { type: String, required: true },
  startingDate: { type: Date, required: true },
  endingDate: { type: Date, required: true },
  trainer: [{ type: mongoose.Types.ObjectId, required: true, ref: "Trainer" }],
  clients: [{ type: mongoose.Types.ObjectId, required: false, ref: "Client" }],
});

classSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Class", classSchema);
