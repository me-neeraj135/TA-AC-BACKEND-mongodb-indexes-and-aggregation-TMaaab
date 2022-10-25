/** @format */

const { default: mongoose } = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: { type: String },
  username: { type: String },
  email: { type: String },
  address: {
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pin: { type: String },
  },
});

// 1. Define unique indexes on username and email.
userSchema.index({ username: 1, email: 1 }, { unique: true });

// 2. define compound indexes on state and country field inside address document. Each country must have states which are unique.
userSchema.index(
  { "address.country": 1 },
  { "address.state": 1, unique: true }
);

module.exports = mongoose.model(`User`, userSchema);
