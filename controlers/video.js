const Video = require('../models/video')
const User = require("../models/user")
const History = require('../models/history')

const InsertData = async (name, creatorID, callback) => {
    const vid1 = {
        name: `${name.replace('.mp4', '')}`,
        type: 'Anything',
        duration: 100000,
        dateCreated: getDate(),
        path: `/${name}`,
        likes: 0,
        dislikes: 0,
        views: 0,
        creatorID: creatorID,
        comments: [{
            pname: "Ha",
            comment: "This is suck!"
        },
        {
            pname: "Long",
            comment: "This is great!"
        }]
    }
    await Video.insertMany(vid1);
    callback();
}

function getDate() {
    var datetime = new Date();
    return datetime.toISOString().slice(0, 10).replace('-', '/').replace('-', '/');
}

function updateViews(id, views) {
    Video.updateOne({
        "_id": id
    }, {
        $set: { views: views }
    }, function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log("Video ID : " + id + " is Updated");
    }
    )
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function randomRecommendation(videos, callback) {

}

exports.get = function (request, response) {
    
}

function up_like(id, likes, response) {
    
}

exports.upload_like = function (request, response) {

}


function up_comment(id, pname, comment, response) {

}

exports.upload_comment = function (request, response) {
    
}
exports.upload_file = async function (request, response) {

}
exports.viewUp = function (request, response) {
    response.render("upfile")
}

exports.deleteVideo = function (request, response) {
    
    return response.redirect("/")
}