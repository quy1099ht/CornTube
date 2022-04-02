const mongoose = require("mongoose");
const { Schema } = mongoose;
const reqString = {
  type: String,
  required: true
}

const videoSchema = new Schema({
  name:  reqString,
  type:  reqString,
  duration: Number,
  dateCreated: Date,
  path: String,
  likes : Number,
  dislike : Number,
  views : Number,
  creatorID : String,
  comments : [{
    pname : String,
    comment : String
  }]
});

const Video = mongoose.model('Video',videoSchema);
module.exports = Video;