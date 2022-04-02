const express = require("express");
const router = express.Router();

function controller(name) {
    return require('../controlers/' + name + '')
}

router.get('/', function(request,response){
    controller('home').get(request,response)
})
router.get('/history', function(request,response){
    controller('history').get(request,response)
})

router.get('/search', function(request,response){
    controller('search').get(request,response)
})

router.post('/search', function(request,response){
    controller('search').post(request,response)
})

module.exports = router