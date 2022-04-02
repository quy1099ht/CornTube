var newDiv = document.createElement("div");
newDiv.id = "video-grid";
document.body.appendChild(newDiv)

const myVideo = document.createElement("video")
myVideo.muted = true
const partnerVideo = document.getElementById("stream")

const socket = io.connect("/");

var peerRef;
var userStream;

window.addEventListener('beforeunload', function (e) {
    socket.emit("discon", ROOM_ID)
});
navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
    myVideo.srcObject = stream;
    userStream = stream;
    myVideo.play()
    
    socket.emit("join room", ROOM_ID);
    socket.emit("joinChat", ROOM_ID)

    socket.on('other user', userID => {
        callUser(userID);
        otherUser = userID;
    });

    socket.on("user joined", userID => {
        otherUser = userID;
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
    partnerVideo.srcObject = e.streams[0];
    partnerVideo.muted = true
    partnerVideo.play()
};
