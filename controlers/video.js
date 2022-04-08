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
    Video.findOne({ "_id": request.params.id.trim() }, function (err, video) {
        return up_like(request.params.id.trim(), parseInt(video.likes) + 1, response)
    })
}


function up_comment(id, pname, comment, response) {
    Video.updateOne({
        "_id": id
    }, {
        $push: {
            comments: { "pname": pname, "comment": comment }
        }
    }, function (err, res) {
        if (err) {
            console.log("Error!!");
            return response.status(500).json({
                message: "can't find the video"
            })
        }
        console.log("UpdatedComment");
        return response.status(200).json({
            message: "updatedcomment"
        })
    }
    )
}

exports.upload_comment = function (request, response) {
    Video.findById(request.params.id, function (err, video) {
        return up_comment(request.params.id, request.body.pname, request.body.comment, response)
    })
}
exports.upload_file = async function (request, response) {
    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).send('No files were uploaded.');
    }
    if (request.session.User) {
        userData = await User.findOne({
            email: request.session.User.user
        })
        let uploadedFile = request.files.uploadedFile;
        await uploadedFile.mv(`./public/videos/${uploadedFile.name}`, (err) => {
            console.log(uploadedFile.name);
            InsertData(uploadedFile.name, userData.id, function () {
                console.log("Successed");
            })
            response.redirect("/");
        })
    }
}
exports.viewUp = function (request, response) {
    response.render("upfile")
}

exports.deleteVideo = function (request, response) {
    var id = request.params.id;
    if (request.session.User) {
        Video.deleteOne({
            "_id": id
        }).then(() => {
            return response.redirect("/account")
        }).catch((err) => {
            return response.redirect("/")
        })
    }
    return response.redirect("/")
}