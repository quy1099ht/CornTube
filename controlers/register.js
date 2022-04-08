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
  fullname = request.body.fname + " " + request.body.lname
  console.log(fullname)
  if (!comparePassword(request.body.password, request.body.password2)) {
    return res.status(500).send({ message: "Wrong" });
  }
  try {
    const user = await User.create({
      name: fullname,
      email: request.body.email,
      password: request.body.password,
      dateOfBirth: getDate(),
      avatarURL : "/images/avatars/default_avt.png",
      country : ""
    });
  } catch (error) {
    request.redirect("/signup")
    res.status(500).send({ message: error.message });
  }
  response.redirect("/login")
}

function getDate() {
  var datetime = new Date();
  return datetime.toISOString().slice(0, 10).replace('-', '/').replace('-', '/');
}