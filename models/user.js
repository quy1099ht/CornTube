const mongoose = require("mongoose");
const { Schema } = mongoose;
const reqString = {
  type: String,
  required: true
}

const userSchema = new Schema({
  name:  reqString,
  email: reqString,
  password: reqString,
  dateOfBirth: Date,
  avatarURL : String,
  country: String,
  date_create: { type: Date, default: Date.now },
  videos: [{
    videoID : String
  }],
  history: [{
    historyID : String
  }]
});

const User = mongoose.model('User',userSchema);
module.exports = User;