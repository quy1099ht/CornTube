const express = require("express");
const router = express.Router();

function controller(name) {
    return require('../controlers/' + name + '')
}

router.get('/room/:id',function(request,response){
    controller('streaming').getStreaming(request,response)
})

router.get('/watch/:id',function(request,response){
    controller('streaming').getWatch(request,response)
})

module.exports = router