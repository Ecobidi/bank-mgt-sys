let mongoose = require("mongoose");

let customerSchema = mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: 'test',
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  phone: Number,
});

module.exports = mongoose.model("customer", customerSchema);