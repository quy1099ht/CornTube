const express = require("express");
const router = express.Router();

function controller(name) {
    return require('../controlers/' + name + '')
}

router.get('/account', function(request,response){
    controller('account').get(request,response)
})

router.post('/account', function(request,response){
    controller('account').post(request,response)
})

router.get('/deleteHistory', function(request,response){
    controller('history').deleteHistory(request,response)
})
module.exports = router