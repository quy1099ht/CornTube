
const myVideo = document.getElementById("stream")
myVideo.muted = true
const partnerVideo = document.createElement("video")
const socket = io.connect("/");

var peerRef;
var userStream;
var id = ROOM_ID
var viewsCount = 0;
const views = document.getElementById("views")
views.innerText = viewsCount + " views"
window.addEventListener('beforeunload', function (e) {
    socket.emit("close", ROOM_ID)
});

navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
    myVideo.srcObject = stream;
    userStream = stream;
    myVideo.play()

    socket.emit("joinChat", ROOM_ID)
    socket.emit("join room", ROOM_ID);

    socket.on('other user', userID => {
        callUser(userID);
        otherUser = userID;
    });

    socket.on("user joined", userID => {
        otherUser = userID;
        viewsCount++;
        views.innerText = viewsCount + " views"
    });

    socket.on("offer", handleRecieveCall);

    socket.on("answer", handleAnswer);

    socket.on("ice-candidate", handleNewICECandidateMsg);
});

function callUser(userID) {
    peerRef = createPeer(userID);
    userStream.getTracks().forEach(track => peerRef.addTrack(track, userStream));
}

function createPeer(userID) {
    const peer = new RTCPeerConnection({
        iceServers: [
            {
                urls: "stun:stun.stunprotocol.org"
            },
            {
                urls: 'turn:numb.viagenie.ca',
                credential: 'muazkh',
                username: 'webrtc@live.com'
            },
        ]
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    return peer;
}

function handleNegotiationNeededEvent(userID) {
    peerRef.createOffer().then(offer => {
        return peerRef.setLocalDescription(offer);
    }).then(() => {
        const payload = {
            target: userID,
            caller: socket.id,
            sdp: peerRef.localDescription
        };
        socket.emit("offer", payload);
    }).catch(e => console.log(e));
}

function handleRecieveCall(incoming) {
    peerRef = createPeer();
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.setRemoteDescription(desc).then(() => {
        userStream.getTracks().forEach(track => peerRef.addTrack(track, userStream));
    }).then(() => {
        return peerRef.createAnswer();
    }).then(answer => {
        return peerRef.setLocalDescription(answer);
    }).then(() => {
        const payload = {
            target: incoming.caller,
            caller: socket.id,
            sdp: peerRef.localDescription
        }
        socket.emit("answer", payload);
    })
}

function handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.setRemoteDescription(desc).catch(e => console.log(e));
}

function handleICECandidateEvent(e) {
    if (e.candidate) {
        const payload = {
            target: otherUser,
            candidate: e.candidate,
        }
        socket.emit("ice-candidate", payload);
    }
}

function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.addIceCandidate(candidate)
        .catch(e => console.log(e));
}
function handleTrackEvent(e) {
};
