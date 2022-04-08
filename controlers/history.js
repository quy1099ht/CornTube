const Video = require('../models/video')
const History = require('../models/history')
const User = require("../models/user")

exports.get = async function (request, response) {
    if (request.session.User) {
        const videoss = []
        await User.findOne({
            email: request.session.User.user
        }).then(async userData => {
            await Video.find(async function (err, videos) {
                await History.find( async function (err, histories) {
                    if (err) {
                        await console.log("Error2!!!");
                    }
                    for (let index = 0; index < histories.length; index++) {
                        const element = await histories[index];
                        if (element.userID == userData.id) {
                            for (let index2 = 0; index2 < videos.length; index2++) {
                                const element2 = await histories[index];
                                if (element2.videoID == videos[index2].id) {
                                    await videoss.push(videos[index2])
                                }
                            }
                        }
                    }
                    return await response.render('history', { logged: true, videos: videoss.reverse() })
                })
                
            })

        })
    }
    return response.redirect('/')
}

exports.deleteHistory = function(request,response){
    console.log("Something");
    if(request.session.User){
        User.findOne({
            email: request.session.User.user
        }).then(userData => {
            History.deleteMany({
                userID : userData.id
            }).then(() => {
                return response.redirect("/account")
            })
        })
    }
    return response.redirect("/")
}