const express = require("express");
const router = express.Router();

function controller(name) {
    return require('../controlers/' + name + '')
}

router.get('/:id',function(request,response){
    controller('video').get(request,response)
})

router.post('/:id/like',function(request,response){
    controller('video').upload_like(request,response)
})

router.post('/:id/comments',function(request,response){
    controller('video').upload_comment(request,response)
})
router.post("/upload",function(request,response){
    controller('video').upload_file(request,response)
})

router.get("/video/upFile",function(request,response){
    controller('video').viewUp(request,response)
})

router.post('/delete/:id',function(request,response){
    controller('video').deleteVideo(request,response)
})
module.exports = router