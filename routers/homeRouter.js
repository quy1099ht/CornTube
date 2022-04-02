const express = require("express");
const router = express.Router();

function controller(name) {
    return require('../controlers/' + name + '')
}

router.get('/', function(request,response){
    controller('home').get(request,response)
})

module.exports = router