const mongo = require('mongo')
const User = require('../models/user')
const Video = require('../models/video')

exports.get = function (request, response) {

    Video.find(function (err, result) {
        User.find(function (err, users) {
            users.forEach(user => {
                result.forEach(video => {
                    if (video.creatorID == user.id) {
                        video.creatorID = user.avatarURL
                    }
                })
            })
            if (request.session.User) {
                return response.render('home', { videos: result, logged: true })
            }
            response.render('home', { videos: result, logged: false })
        })
    })

}