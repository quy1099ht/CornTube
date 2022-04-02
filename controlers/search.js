const mongo = require('mongo')
const Video = require('../models/video')

exports.get = function(request,response){
    Video.find(function(err,result){
        videoss = []
        if(request.session.User)
        {
           return response.render('search',{videos : videoss,logged : true})
        }
        response.render('search',{videos : videoss,logged : false})
    })
    
}
exports.post = function(request,response){
    return response.redirect('/')
}
