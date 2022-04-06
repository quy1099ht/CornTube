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
    var n = videos.length
    var videoss = []
    for (let index = 0; index < 4; index++) {
        videoss.push(videos[getRandomInt(n)])
    }
    callback(videoss)
}

exports.get = function (request, response) {
    Video.findById(request.params.id, function (err, video) {
        if (err) {
            return response.redirect('/')
        }

        updateViews(request.params.id, parseInt(video.views) + 1)
        Video.find(function (err, result) {
            randomRecommendation(result, async function (videos) {
                if (request.session.User) {
                    var userData = await User.findOne({
                        email: request.session.User.user
                    })
                    History.insertMany({
                        userID: userData.id,
                        videoID: video.id
                    })
                    var user = await User.findOne({
                        "_id": video.creatorID
                    })
                    
                    return response.render('playvideo', { video: video, logged: true, videos: videos, userName: user.name })
                }
                await User.findOne({
                    "_id": video.creatorID
                }).then(userData => {
                    return response.render('playvideo', { video: video, logged: false, videos: videos, userName: userData.name })
                })

            })
        })

    })
}

function up_like(id, likes, response) {
    Video.updateOne({
        "_id": id
    }, {
        $set: { likes: likes }
    }, function (err, res) {
        if (err) {
            console.log("Error!!");
            return response.status(500).json({
                message: "Can't find the video"
            })
        }
        console.log("UpdatedLike");
        return response.status(200).json({
            message: "Updated"
        })
    })
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