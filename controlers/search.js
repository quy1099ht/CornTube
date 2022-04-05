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
    Video.find(function(err,result){
        var videos = result.filter((video) => similarity(video.name,request.body.search) > 0.20)
        if(request.session.User)
        {
           return response.render('search',{videos : videos,logged : true, searchQuery : request.body.search})
        }
        response.render('search',{videos : videos,logged : false, searchQuery : request.body.search})
    })
    
}



function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }