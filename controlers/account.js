const User = require('../models/user')
const Video = require('../models/video')

exports.get = async function (request, response) {
    if (request.session.User) {
        console.log(request.session.User);
        userData = await User.findOne({
            email: request.session.User.user
        })
        await Video.find(async function (err, result) {
            await User.find(async function (err, users) {
                result.filter(video => {
                    users.forEach(user => {
                        if(user.id == video.creatorID){
                            return true
                        }
                    })
                })
                users.forEach(user => {
                    result.forEach(video => {
                        if (video.creatorID == user.id) {
                            video.creatorID = user.name
                        }
                    })
                })
                return await response.render('profile', { logged: true, user: userData, videos: result })
            })
        })
    }

    return response.redirect("/")
}

function updateProfie(request, response) {
    var dateOfBirth = request.body.dob.replace("/", "-");
    User.updateOne({
        "email": request.session.User.user
    }, {
        $set: {
            name: request.body.name,
            dateOfBirth: dateOfBirth,
            country: request.body.country,
            password: request.body.password
        }
    }, function (err, res) {
        if (err) {
            console.log("Error!!");
            return response.status(500).json({
                message: "Can't find the video"
            })
        }
        console.log(res);
        return response.redirect("/account")
    })
}

exports.post = (request, response) => {
    if(request.session.User){
        return updateProfie(request, response)
    }
    else{
        return response.redirect("/")
    }
};