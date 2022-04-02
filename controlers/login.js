const User = require('../models/user')

exports.get = function (request, response) {
    response.render('login', {errorMess : ""})
}

function comparePassword(cliPass,dbPass){

}

exports.post = async function (request, response) {
    
}

exports.logout = function (request, response) {
    
}