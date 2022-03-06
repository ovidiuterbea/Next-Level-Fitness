const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema({
  title: { type: String, required: true },
  difficultyLevel: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  trainer: { type: mongoose.Types.ObjectId, required: false, ref: "Trainer" },
  clients: [{ type: mongoose.Types.ObjectId, required: false, ref: "Client" }],
});

module.exports = mongoose.model("Class", classSchema);
