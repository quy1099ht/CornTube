const mongoose = require("mongoose");
const { Schema } = mongoose;

const historySchema = new Schema({
  userID : String,
  videoID : String
});
const History = mongoose.model('History', historySchema);
module.exports = History;