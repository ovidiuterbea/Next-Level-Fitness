const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const hiringSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  birthdate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false, minlength: 6 },
  image: { type: String, required: true },
  experience: { type: String, required: true },
});

hiringSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Hiring", hiringSchema);
