var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const socket = require("socket.io");
const session = require('express-session');
const expressFileUpload = require('express-fileupload');

var server = require("http").Server(app);

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(expressFileUpload());

const io = socket(server);

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'somesecret',
  cookie: { maxAge: 60000000 }
}));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


require('./data/connectDB')

var router = express.Router()
router.use(express.static('public'))

var urlCodeParser = require('body-parser').urlencoded({ extended: false })

app.use('/', require('./routers/homeRouter'))

app.use(require('./routers/logRouter'))

app.use(require('./routers/accountRouter'))

app.use(require('./routers/videoRouter'))

app.use(require('./routers/streamingRouter'))

function controller(name) {
  return require('./controlers/' + name + '')
}

const rooms = {};
io.on("connection", socket => {
    socket.on("join room", roomID => {
        console.log("Someone joined")
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [socket.id];
        }
        console.log(rooms[roomID]);
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        console.log(otherUser);
        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id);

        }
    });

    socket.on("offer", payload => {
        console.log("offered");
        io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", payload => {
        console.log(payload.target);
        io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", incoming => {
        io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });

    socket.on("close", (roomID) => {
        rooms[roomID] = []
    });
    socket.on("joinRoom", roomID => {
      console.log("Joined");
      socket.join(roomID)
    })
    socket.on("chat", (roomID,contents) => {
      console.log("Joined");
      socket.broadcast.to(roomID).emit("new chat",contents)
    })
});

router.get('/api/:content', function (request, response) {
  controller('api').get(request, response)
})
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})



app.use(router)

server.listen(process.env.PORT || 8080, () => {
  console.log("Listening.... on http://localhost:8080/")
})
