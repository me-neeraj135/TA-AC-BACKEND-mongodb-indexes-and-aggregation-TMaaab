/** @format */

let mongoose = require(`mongoose`);
let Schema = mongoose.Schema;
// let jsonData = require(`/users.json`);

let userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  identity: {
    eye: { type: String },
    phone: { type: Number },
    location: { type: String },
  },
});

// mongoimport --db sample-import --collection users --file /home/neeraj/Altcampus/Indexes-and-aggregation-mongodb/TA-AC-BACKEND-mongodb-indexes-and-aggregation-TMaaab/block-BMaaam/users.json  --jsonArray


module.exports = mongoose.model(`User`, userSchema);
