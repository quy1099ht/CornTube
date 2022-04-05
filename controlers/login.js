const User = require('../models/user')

exports.get = function (request, response) {
    response.render('login', {errorMess : ""})
}

function comparePassword(cliPass,dbPass){
    if(cliPass == dbPass)
    {
        return true
    }
    else{
        return false
    }
}

exports.post = async function (request, response) {
    try {
        const user = await User.findOne({
                email: request.body.username,
            }
        );
        if (!user) {
            return response.render('login', {errorMess : "User not found"})
        }
        const passwordIsValid = comparePassword(
            request.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return response.render('login', {errorMess : "Invalid Password"})
        }
        else {
            request.session.User = {
                user : user.email
            }
            response.redirect("/")
        }
    } catch (error) {
        console.log("\n\nError\n\n");
        return response.status(500).send({ message: error.message });
    }
}

exports.logout = function (request, response) {
    request.session.destroy(function(err){
        if(err){

        }
        response.redirect("/")
    })
}