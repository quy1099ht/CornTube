const express = require("express");
const router = express.Router();

function controller(name) {
    return require('../controlers/' + name + '')
}

router.get('/login', function(request,response){
    controller('login').get(request,response)
})

router.post('/login', function(request,response){
    controller('login').post(request,response)
})

router.get('/signup', function(request,response){
    controller('register').get(request,response)
})

router.post('/signup', function(request,response){
    controller('register').post(request,response)
})

router.get("/logout", function(request,response){
    controller('login').logout(request,response)
})
module.exports = router