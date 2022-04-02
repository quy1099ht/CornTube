exports.getStreaming = function (request, response) {
    if (request.session.User) {
        return response.render('room', {roomID : request.params.id, logged: true })
    }
    return response.render('room', { roomID : request.params.id,logged: false })
}
exports.getWatch = function (request, response) {
    if (request.session.User) {
        return response.render('watch', {roomID : request.params.id, logged: true })
    }
    return response.render('watch', { roomID : request.params.id,logged: false })
}