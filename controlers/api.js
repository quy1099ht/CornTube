const mongo = require('mongo')
const Video = require('../models/video')

const InsertData = async () => {
    const vid1 = {
        name: 'Test1',
        type: 'Life',
        duration: 1000,
        dateCreated: getDate(),
        path: '/video.mp4',
        likes: 0,
        dislikes: 0,
        views: 0,
        comments: [{
            pname: "Long",
            comment: "This is suck!"
        },
        {
            pname: "Long",
            comment: "This is great!"
        }]
    }

    Video.insertMany(vid1);
}

function getDate() {
    var datetime = new Date();
    return datetime.toISOString().slice(0, 10).replace('-', '/').replace('-', '/');
}

exports.get = function (request, response) {
    InsertData()
    response.render('history')
}