const { render } = require('express/lib/response')
const mongo = require('mongo')
const User = require('../models/user')
const Video = require('../models/video')

exports.get = function (request, response) {

    return render("home",{
        videos : [],
        logged : false
    })

}
