const Video = require('../models/video')
const History = require('../models/history')
const User = require("../models/user")

exports.get = async function (request, response) {

    return response.redirect('/')
}

exports.deleteHistory = function(request,response){
    
    return response.redirect("/")
}