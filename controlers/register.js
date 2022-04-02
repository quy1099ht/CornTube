const User = require('../models/user')

exports.get = function (request, response) {
  response.render('signup')
}
function comparePassword(pass1, pass2) {
  if (pass1 == pass2) {
    return true
  }
  return false
}
exports.post = async function (request, response) {
  
}

function getDate() {
  var datetime = new Date();
  return datetime.toISOString().slice(0, 10).replace('-', '/').replace('-', '/');
}
